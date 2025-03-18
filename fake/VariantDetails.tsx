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