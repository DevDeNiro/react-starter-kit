import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductDetailsQuery } from "./src/redux/exSlice.tsx";
import {
    ProductDetailWrapper,
    ProductImageWrapper,
    VariantSelector,
    ColorButton,
    VariantDetails,
} from "./ProductStyledComponents"; // Import des Styled Components

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetProductDetailsQuery(id!);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    if (isLoading) return <p>Chargement...</p>;
    if (error || !data || !Array.isArray(data.product)) return <p>Erreur lors du chargement</p>;

    const product = data.product[0]; // Supposons qu'un seul produit est retourné

    // Récupérer toutes les variantes disponibles
    const variants = product.variants || [];

    // Extraire les couleurs uniques pour affichage dans les boutons
    const uniqueColors = Array.from(new Set(variants.map(v => v.color_name)));

    // Trouver la variante sélectionnée en fonction de la couleur choisie
    const selectedVariant = variants.find(v => v.color_name === selectedColor) || variants[0];

    return (
        <ProductDetailWrapper>
            {/* Image de la variante sélectionnée */}
            <ProductImageWrapper>
                <img
                    src={selectedVariant?.images[0]?.url || product.thumbnail_url}
                    alt={selectedVariant?.color_name || product.name}
                />
            </ProductImageWrapper>

            {/* Sélecteur de couleur */}
            <VariantSelector>
                {uniqueColors.map((color) => (
                    <ColorButton
                        key={color}
                        isSelected={color === selectedColor}
                        onClick={() => setSelectedColor(color)}
                    >
                        {color}
                    </ColorButton>
                ))}
            </VariantSelector>

            {/* Détails de la variante sélectionnée */}
            <VariantDetails>
                <h2>{product.name} - {selectedVariant.color_name}</h2>
                <p><strong>Prix:</strong> {selectedVariant.price_value} {selectedVariant.currency_code}</p>
                <p><strong>Stockage:</strong> {selectedVariant.other_attributes.storage}</p>
                <p><strong>Batterie:</strong> {selectedVariant.other_attributes.battery}</p>
                <p><strong>RAM:</strong> {selectedVariant.other_attributes.ram}</p>
                <p><strong>Dimensions:</strong> {selectedVariant.width} x {selectedVariant.height} x {selectedVariant.depth} {selectedVariant.size_unit}</p>
                <p><strong>Poids:</strong> {selectedVariant.weight_value} kg</p>
            </VariantDetails>
        </ProductDetailWrapper>
    );
};

export default ProductDetailPage;


import styled from "styled-components";

// Conteneur des boutons de sélection de couleur
export const VariantSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  align-items: center;
`;

// Bouton pour sélectionner une couleur
export const ColorButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 15px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: ${(props) =>
    props.isSelected ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none"};

  &:hover {
    background-color: #3498db;
    color: white;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    border: 2px solid #2980b9;
  }
`;