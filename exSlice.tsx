import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {useMemo, useState} from "react";
import {IProduct, IVariant} from "../types";
import {Link, useParams} from "react-router-dom";
import {useGetProductQuery} from "../services/api";
import ColorSelector from "./ColorSelector";
import VariantDetails from "./VariantDetails";
import ProductImageWrapper from "./ProductImageWrapper"; // Import du composant

export const exempleApi = createApi({
    reducerPath: "exempleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ma-ressource-externe/products-svc/api/"
    }),
    endpoints: (builder) => ({
        getProduct: builder.query<IProductResponse[], void>({
            query: () => `products`
        })
    })
})

export const {useGetProductsQuery} = catalogApi;

export interface IProductResponse {
    data: IProduct[],
    current_page: number,
    size: number,
    total_elements: number,
    total_pages: number

}

export interface IProduct {
    id: string,
    name: string,
    description: string,
    brand: string,
    thumbnail_url: string,
    variants?: IVariant[]
    categories?: ICategory[]
}

type ICategory = {
    uuid: string,
    name: string,
    description: string
}

export type IVariant = {
    variant_id: string,
    sku: string,
    price_value: number,
    currency_code: string,
    depth: number,
    width: number,
    height: number,
    weigth_value: number,
    weight_unit: string,
    color_name: string,
    other_attributes: record<string, string>
    images: IImage[]
}

type IImage = {
    image_id: string,
    alt_text: string
    url: string
}

const HomeTemplate = () => {

    const {data, error, isLoading} = useGetProductQuery();

    // Op on error & loading

    return (
        <FilterSection/>
        <ProductSection products={data}></ProductSection>
    )

}

type ProductSectionProps = {
    products: IProduct[];
}

const ProductSection: FC<ProductSectionProps> = ({products}) => {
    return (
        <SearchBarWrapper>
            <SearchBar onSearch={handleSearch} />
        </SearchBarWrapper>
        <ProductCardWrapper>
            {Array.isArray(products) ? products?.map((p) =>
                <Link to={`/products/${p.id}`}
                      key={p.id}
                      state={{products}}
                >
                    <ProductCard
                        products={{...p}}
                        /ProductCard>
                </Link>
                ) : "Is not a array"}
        </ProductCardWrapper>
    )


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


    const enrichMapWithDetails = (product: IProduct, variant: IVariant | null) => {
        if (!product) return null;

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

    export default enrichMapWithDetails;

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

    export default ColorSelector;

    const VariantDetails = ({variant}: { variant: IVariant | null }) => {
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
                    <img src={variant.images[0].url} alt="Variante" className="w-48 h-48 object-cover mt-4"/>
                )}
            </div>
        );
    };

    export default VariantDetails;


    const ProductDetailPage = () => {
        const {id} = useParams<{ id: string }>();
        const {data, error, isLoading} = useGetProductQuery(id!);

        if (isLoading) return <p>Chargement...</p>;
        if (error || !data || !Array.isArray(data.product)) return <p>Erreur lors du chargement</p>;

        const product = data.product.find((p) => p.id === id);
        if (!product) return <p>Produit non trouvé</p>;

        // État local pour gérer la variante sélectionnée
        const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

        // État pour gérer l’image principale affichée
        const [selectedImage, setSelectedImage] = useState<string>(
            selectedVariant?.images?.[0]?.url || product.thumbnail_url
        );

        // Fonction pour changer de variante et mettre à jour l’image
        const handleVariantChange = (color: string) => {
            const newVariant = product.variants.find(v => v.color_name === color);
            if (newVariant) {
                setSelectedVariant(newVariant);
                setSelectedImage(newVariant.images?.[0]?.url || product.thumbnail_url); // Prend la première image de la variante
            }
        };

        // Mémorisation de l'objet enrichi pour éviter des recalculs inutiles
        const enrichedProduct = useMemo(() => enrichMapWithDetails(product, selectedVariant), [product, selectedVariant]);

        if (!enrichedProduct) return <p>Produit non trouvé</p>;

        return (
            <ProductDetailWrapper>
                {/* Image principale */}
                <ProductImageWrapper
                    images={selectedVariant?.images || []}
                    selectedImage={selectedImage}
                    onImageSelect={setSelectedImage}
                />

                {/* Infos produit */}
                <h2>{enrichedProduct.product.name}</h2>
                <p>{enrichedProduct.product.description}</p>
                <p>Marque: {enrichedProduct.product.brand}</p>

                {/* Sélecteur de couleur */}
                <ColorSelector
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onSelect={handleVariantChange}
                />

                {/* Détails de la variante */}
                <VariantDetails variant={selectedVariant}/>
            </ProductDetailWrapper>
        );
    };

    export default ProductDetailPage;


    interface ProductImageWrapperProps {
        images: { url: string }[];
        selectedImage: string;
        onImageSelect: (url: string) => void;
    }

    const ProductImageWrapper = ({images, selectedImage, onImageSelect}: ProductImageWrapperProps) => {
        return (
            <div className="product-image-wrapper">
                {/* Image principale */}
                <div className="main-image">
                    <img src={selectedImage} alt="Produit" className="w-full h-auto object-cover"/>
                </div>

                {/* Miniatures */}
                {images.length > 1 && (
                    <div className="thumbnail-gallery">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Variante ${index}`}
                                className={`thumbnail ${selectedImage === image.url ? "selected" : ""}`}
                                onClick={() => onImageSelect(image.url)}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    export default ProductImageWrapper;
