public class ProductEntity {

    private UUID productId;
    private String name;
    private String description;
    private String brand;
    private String thumbnail_url

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "product_id");
    private Set<ProductVariantEntity> variants = new HashSet<>();

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinTable(
        name = "_product_category",
        JoinColumns= @JoinColumn(name = "product_id");
        inverteJoinColumns= @JoinColumn(name = "category_id")
    )
    private Set<CategoryEntity> categories = new HashSet<>();
}


@PostMapping
@Operation(summary = "Recherche avec filtres et pagination",
    description = "Permet de rechercher des éléments en fonction de filtres et d'une pagination")
@ApiResponse(responseCode = "200", description = "Résultat de la recherche")
public ResponseEntity<String> search(
    @RequestBody(description = "Objet de recherche avec filtres et pagination",
        required = true,
        content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = PageSearchDto.class),
            examples = @ExampleObject(value = """
{
    "filters": [
    {
        "name": "name",
        "type": "TEXT",
        "value": "Galaxy"
    }
],
    "pagination": {
    "size": 10,
        "page": 0,
        "sort": "name",
        "direction": "asc"
}
}
""")))



export const exempleApi = createApi({
    reducerPath: "exempleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ma-ressource-externe/products-svc/api/"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductResponse, void>({
            query: () => `products`
        }),
        searchProducts: builder.mutation<IProductResponse, { search?: string; brand?: string }>({
            query: ({ search, brand }) => ({
                url: `products/search`,
                method: "POST",
                body: {
                    filters: [
                        search ? { name: "name", type: "TEXT", value: search } : null,
                        brand ? { name: "brand", type: "TEXT", value: brand } : null
                    ].filter(Boolean), // Supprime les valeurs null
                    pagination: { size: 10, page: 0, sort: "name", direction: "asc" }
                }
            })
        })
    })
});

export const { useGetProductsQuery, useSearchProductsMutation } = exempleApi;


const HomeTemplate = () => {
    const { data: allProducts, error, isLoading } = useGetProductsQuery();
    const [searchProducts, { data: searchResults }] = useSearchProductsMutation();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    // Extraction des marques disponibles dynamiquement
    const availableBrands = Array.from(new Set(allProducts?.data.map(p => p.brand)));

    // Produits à afficher : résultats de la recherche OU tous les produits
    const displayedProducts = searchResults?.data ?? allProducts?.data ?? [];

    // Fonction pour déclencher une recherche
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        searchProducts({ search: value, brand: selectedBrand });
    };

    const handleFilter = (brand: string | null) => {
        setSelectedBrand(brand);
        searchProducts({ search: searchTerm, brand });
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            <FilterSection brands={availableBrands} onFilter={handleFilter} />
            <ProductSection products={displayedProducts} />
        </>
    );
};


const SearchBar: FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={handleSearch}
        />
    );
};

const FilterSection: FC<{ brands: string[]; onFilter: (brand: string | null) => void }> = ({ brands, onFilter }) => {
    return (
        <div>
            <h3>Filtres</h3>
            {brands.map((brand) => (
                <button key={brand} onClick={() => onFilter(brand)}>
                    {brand}
                </button>
            ))}
            <button onClick={() => onFilter(null)}>Réinitialiser</button>
        </div>
    );
};

const PaginationControls: FC<{ page: number; totalPages: number; onPageChange: (page: number) => void }> = ({ page, totalPages, onPageChange }) => {
    return (
        <div>
            <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>
                Précédent
            </button>
            <span> Page {page + 1} sur {totalPages} </span>
            <button disabled={page >= totalPages - 1} onClick={() => onPageChange(page + 1)}>
                Suivant
            </button>
        </div>
    );
};