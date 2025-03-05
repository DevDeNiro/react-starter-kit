import {useLocation, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useGetProductQuery, useGetProductsQuery} from "@redux/exSlice.tsx";
import {useState} from "react";
import {
    ColorButton,
    ProductDetailWrapper,
    ProductImageWrapper,
    VariantDetails,
    VariantSelector,
} from "./ProductStyledComponents"; // Import des Styled Components

const ProductDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("location : ", location.pathname)
    // location : /products/12345678
    const {data, error, isLoading} = useGetProductsQuery;

...


}


const ProductDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const {data: product, error, isLoading} = useGetProductQuery(id!);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    if (isLoading) return <p>Chargement...</p>;
    if (error || !product) return <p>Erreur lors du chargement du produit</p>;

    // Récupérer les variantes
    const variants = product.variants || [];

    // Trouver les couleurs uniques pour le sélecteur
    const uniqueColors = Array.from(new Set(variants.map(v => v.color_name)));

    // Sélectionner une variante en fonction de la couleur choisie
    const selectedVariant = variants.find(v => v.color_name === selectedColor) || variants[0];

    return (
        <ProductDetailWrapper>
            {/* Image du produit */}
            <ProductImageWrapper>
                <img src={selectedVariant?.images[0]?.url || product.thumbnail_url} alt={product.name}/>
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
                <p>
                    <strong>Dimensions:</strong> {selectedVariant.width} x {selectedVariant.height} x {selectedVariant.depth} {selectedVariant.size_unit}
                </p>
                <p><strong>Poids:</strong> {selectedVariant.weight_value} kg</p>
            </VariantDetails>
        </ProductDetailWrapper>
    );
};

export default ProductDetailPage;

export default ProductDetailPage;
