// Interface pour une image
interface IImage {
    image_id: string;
    url: string;
    alt_text: string;
}

// Interface pour les variantes du produit
interface IVariant {
    variant_id: string;
    sku: string;
    price_value: number;
    currency_code: string;
    depth: number;
    width: number;
    height: number;
    size_unit: string;
    weight_value: number;
    color_name: string;
    other_attributes: Record<string, string>; // Infère dynamiquement les clés
    images: IImage[];
}

// Interface pour un produit
interface IProduct {
    id: string;
    name: string;
    description: string;
    brand: string;
    thumbnail_url: string;
    variants: IVariant[];
}

// Interface pour la réponse API (tableau de produits)
interface IProductResponse {
    product: IProduct[];
}

// Interface pour l'objet enrichi retourné par enrichMapWithDetails()
interface IEnrichedProduct {
    product: {
        id: string;
        name: string;
        description: string;
        brand: string;
        thumbnail_url: string;
    };
    variant: {
        variant_id: string;
        sku: string;
        price: string;
        dimensions: string;
        weight: string;
        color: string;
        images: IImage[];
        dynamicAttributes: [string, string][]; // Tableau de tuples [clé, valeur]
    } | null;
}

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetProductQuery(id!);

    if (isLoading) return <p>Chargement...</p>;
    if (error || !data || !Array.isArray(data.product)) return <p>Erreur lors du chargement</p>;

    const enrichedProduct = enrichMapWithDetails(); // Récupère l'objet enrichi

    if (!enrichedProduct) return <p>Produit non trouvé</p>;

    return (
        <ProductDetailWrapper>
            {/* Image */}
            <ProductImageWrapper>
                <img src={enrichedProduct.product.thumbnail_url} alt={enrichedProduct.product.name} />
            </ProductImageWrapper>

            {/* Détails du produit */}
            <h2>{enrichedProduct.product.name}</h2>
            <p>{enrichedProduct.product.description}</p>
            <p>Marque: {enrichedProduct.product.brand}</p>

            {/* Détails de la variante */}
            {enrichedProduct.variant && (
                <VariantDetails>
                    <h3>Variante - {enrichedProduct.variant.color}</h3>
                    <p>SKU: {enrichedProduct.variant.sku}</p>
                    <p>Prix: {enrichedProduct.variant.price}</p>
                    <p>Dimensions: {enrichedProduct.variant.dimensions}</p>
                    <p>Poids: {enrichedProduct.variant.weight}</p>

                    {/* Affichage dynamique des autres attributs */}
                    <h4>Caractéristiques supplémentaires :</h4>
                    <ul>
                        {enrichedProduct.variant.dynamicAttributes.map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>

                    {/* Image de la variante */}
                    {enrichedProduct.variant.images.length > 0 && (
                        <img src={enrichedProduct.variant.images[0].url} alt="Variante" className="w-48 h-48 object-cover mt-4" />
                    )}
                </VariantDetails>
            )}
        </ProductDetailWrapper>
    );
};

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