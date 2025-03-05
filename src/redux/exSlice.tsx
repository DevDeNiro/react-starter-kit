import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {useEffect, useState} from "react";

export const exempleApi = createApi({
    reducerPath: "exempleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ma-ressource-externe/products-svc/api/"
    }),
    endpoints: (builder) => ({
        getProduct: builder.query<IProductResponse[], void>({
            query: () => ``;
        })
    })
})

export const {useGetProductsQuery} = catalogApi;

const fakeProduct = {
    "id": "123",
    "name": "Galaxy S99",
    "description": "a desc",
    "brand": "Samsung",
    "thumbnail_url": "picsum",
    "variants": [
        {
            "variant_id": "123",
            "sku": "123_SKU",
            "price_value": 999.12,
            "currency_code": "EUR",
            "depth": 0.80,
            "width": 12,
            "height": 14.0,
            "size_unit": "cm",
            "weight_value": 0.18,
            "color_name": "BLACK",
            "other_attributes": {
                "storage": "123GB",
                "battery": "4000mAh",
                "ram": "8GB"
            },
            "images": [
                {
                    "image_id": "123",
                    "url": "picsum",
                    "alt_text": "AZERTY"
                }
            ]
        }
    ]
}

const enrichMapWithDetails = () => {
    if (!products) return null;

    // Trouver le produit correspondant
    const product = products.find((p) => p.id === id);
    if (!product) return null;

    // Sélection de la première variante par défaut
    const variant = product.variants?.[0] || null;

    // Vérifier si la variante a des attributs dynamiques
    const dynamicAttributes = variant?.other_attributes
        ? Object.entries(variant.other_attributes) // Convertir en tableau de paires [clé, valeur]
        : [];

    return {
        product: {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            thumbnail_url: product.thumbnail_url,
        },
        variant: variant
            ? {
                variant_id: variant.variant_id,
                sku: variant.sku,
                price: `${variant.price_value} ${variant.currency_code}`,
                dimensions: `${variant.width}x${variant.height}x${variant.depth} ${variant.size_unit}`,
                weight: `${variant.weight_value} kg`,
                color: variant.color_name,
                images: variant.images,
                dynamicAttributes, // Tableau des attributs dynamiques
            }
            : null,
    };
};

- - -


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedVariant } from "../slices/variantSlice";
import { RootState } from "../store";
import { IProduct, IVariant } from "../types";

const useProductVariant = (product: IProduct | null) => {
    const dispatch = useDispatch();
    const selectedVariant = useSelector((state: RootState) => state.variant.selectedVariant);

    useEffect(() => {
        if (product && !selectedVariant) {
            dispatch(setSelectedVariant(product.variants?.[0] || null)); // Sélection initiale
        }
    }, [product, dispatch, selectedVariant]);

    const selectVariant = (color: string) => {
        if (product) {
            const newVariant = product.variants.find(v => v.color_name === color);
            if (newVariant) {
                dispatch(setSelectedVariant(newVariant));
            }
        }
    };

    return { selectedVariant, selectVariant };
};

export default useProductVariant;


const ColorSelector = ({variants, selectedVariant, onSelect}: {
    variants: IVariant[],
    selectedVariant: IVariant | null,
    onSelect: (color: string) => void
}) => {
    return (
        <div className="variant-selector">
            <h3>Choisir une couleur :</h3>
            <div className="color-options">
                {variants.map((variant) => (
                    <button
                        key={variant.variant_id}
                        className={`color-btn ${selectedVariant?.color_name === variant.color_name ? 'selected' : ''}`}
                        style={{backgroundColor: variant.color_name.toLowerCase()}}
                        onClick={() => onSelect(variant.color_name)}
                    >
                        {variant.color_name}
                    </button>
                ))}
            </div>
        </div>
    );
};

const VariantDetails = ({ variant }: { variant: IVariant | null }) => {
    if (!variant) return <p>Aucune variante disponible</p>;

    return (
        <div className="variant-details">
            <h3>Variante - {variant.color_name}</h3>
            <p>SKU: {variant.sku}</p>
            <p>Prix: {variant.price_value} {variant.currency_code}</p>
            <p>Dimensions: {variant.width}x{variant.height}x{variant.depth} {variant.size_unit}</p>
            <p>Poids: {variant.weight_value} kg</p>

            {/* Affichage dynamique des autres attributs */}
            {variant.other_attributes && (
                <div>
                    <h4>Caractéristiques supplémentaires :</h4>
                    <ul>
                        {Object.entries(variant.other_attributes).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Image de la variante */}
            {variant.images.length > 0 && (
                <img src={variant.images[0].url} alt="Variante" className="w-48 h-48 object-cover mt-4" />
            )}
        </div>
    );
};


import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../services/api";
import useProductVariant from "../hooks/useProductVariant"; // Import du hook
import ColorSelector from "./ColorSelector";
import VariantDetails from "./VariantDetails";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetProductQuery(id!);

    if (isLoading) return <p>Chargement...</p>;
    if (error || !data || !Array.isArray(data.product)) return <p>Erreur lors du chargement</p>;

    const product = data.product.find((p) => p.id === id);
    if (!product) return <p>Produit non trouvé</p>;

    const { selectedVariant, selectVariant } = useProductVariant(product);
    const enrichedProduct = enrichMapWithDetails();

    if (!enrichedProduct) return <p>Produit non trouvé</p>;

    return (
        <ProductDetailWrapper>
            {/* Image principale */}
            <ProductImageWrapper>
                <img src={enrichedProduct.product.thumbnail_url} alt={enrichedProduct.product.name} />
            </ProductImageWrapper>

            {/* Infos produit */}
            <h2>{enrichedProduct.product.name}</h2>
            <p>{enrichedProduct.product.description}</p>
            <p>Marque: {enrichedProduct.product.brand}</p>

            {/* Sélection de couleur */}
            <ColorSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={selectVariant}
            />

            {/* Détails de la variante */}
            <VariantDetails variant={selectedVariant} />
        </ProductDetailWrapper>
    );
};

export default ProductDetailPage;


.color-options {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.color-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.color-btn:hover {
    transform: scale(1.1);
}

.color-btn.selected {
    border: 3px solid black;
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVariant } from "../types"; // Assure-toi que l'import de IVariant est correct

interface VariantState {
    selectedVariant: IVariant | null;
}

const initialState: VariantState = {
    selectedVariant: null,
};

export const variantSlice = createSlice({
    name: "variant",
    initialState,
    reducers: {
        setSelectedVariant: (state, action: PayloadAction<IVariant | null>) => {
            state.selectedVariant = action.payload;
        },
    },
});

export const { setSelectedVariant } = variantSlice.actions;
export default variantSlice.reducer;

import { useSelector } from "react-redux";
import { RootState } from "../store";

const enrichMapWithDetails = () => {
    const selectedVariant = useSelector((state: RootState) => state.variant.selectedVariant);

    if (!products) return null;

    // Trouver le produit correspondant
    const product = products.find((p) => p.id === id);
    if (!product) return null;

    // Utiliser la variante sélectionnée ou la première
    const variant = selectedVariant || product.variants?.[0] || null;

    // Vérifier si la variante a des attributs dynamiques
    const dynamicAttributes = variant?.other_attributes
        ? Object.entries(variant.other_attributes)
        : [];

    return {
        product: {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            thumbnail_url: product.thumbnail_url,
        },
        variant: variant
            ? {
                variant_id: variant.variant_id,
                sku: variant.sku,
                price: `${variant.price_value} ${variant.currency_code}`,
                dimensions: `${variant.width}x${variant.height}x${variant.depth} ${variant.size_unit}`,
                weight: `${variant.weight_value} kg`,
                color: variant.color_name,
                images: variant.images,
                dynamicAttributes, // Tableau des attributs dynamiques
            }
            : null,
    };
};



import { useState, useEffect } from "react";

const useProductVariant = (product: IProduct | null) => {
    const [variant, setVariant] = useState<IVariant | null>(product?.variants?.[0] || null);

    useEffect(() => {
        selectedVariant = variant; // Met à jour la variable globale
        enrichMapWithDetails(); // Rafraîchit les données enrichies
    }, [variant]);

    const selectVariant = (color: string) => {
        if (product) {
            const newVariant = product.variants.find(v => v.color_name === color);
            if (newVariant) {
                setVariant(newVariant);
            }
        }
    };

    return { selectedVariant: variant, selectVariant };
};