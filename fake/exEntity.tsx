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
        searchProducts: builder.mutation<IProductResponse, { search?: string}>({
            query: ({ search, brand }) => ({
                url: `products/search`,
                method: "POST",

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
            <FilterSection />
            <ProductSection products={productData} />
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

const FilterSection: FC = () => {
    return (
        <div>
            <FilterGroup title="Marque" options={["Marque 1","Marque 2" ]}> />
        </div>
    );
};

    interface FilterGroupProps {
            title: string;
            options: string[];
}
const FilterGroup: FC<FilterGroupProps> = ({title, options}) => {
    return (
        <div>
        <ul>
    {options.map((option, index) => (
        <li key={index}>
        <Checkbox label={option}
    </li>
        )}
    </ul>
    </div>
        )
}

interface checkoxProps {
            label: string;
            checked?: boolean:
}

const Checkbox: React.FC<checkoxProps> = ({label}) => {
    return (
        <label>
        <input type="checkbox" checked={label} />
    {label}
        </label>
        )
    }

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

// Chacune de ces opération est porté par l'ID du client.

POST /items

{
    "product_sku": string,
    "quantity": number,
    "unit_price": number
}

POST {cartId}/checkout
[
    {
        "product_sku": string,
        "quantity": number,
        "unit_price": number
    }
]

POST migrate-cart
[
    {
        "product_sku": string,
        "quantity": number,
        "unit_price": number
    }
]