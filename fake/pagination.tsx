// Pagination.tsx
import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Génère un tableau de numéros de pages.
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <PaginationContainer>
            <PaginationButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Précédent
            </PaginationButton>
            {pages.map((page) => (
                <PaginationButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PaginationButton>
            ))}
            <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Suivant
            </PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;


// ProductSection.tsx
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

export interface IProduct {
    id: string;
    name: string;
    description: string;
    brand: string;
    thumbnail_url: string;
    // ... autres propriétés
}

interface ProductSectionProps {
    products: IProduct[];
    onSearch: (searchTerm: string) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    error?: any;
}

// Ces styled-components doivent être définis dans votre projet
const SearchBarWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductSection: FC<ProductSectionProps> = ({
                                                     products,
                                                     onSearch,
                                                     currentPage,
                                                     totalPages,
                                                     onPageChange,
                                                     isLoading,
                                                     error,
                                                 }) => {
    return (
        <>
            <SearchBarWrapper>
                <SearchBar onSearch={onSearch} />
            </SearchBarWrapper>

            {isLoading && <p>Chargement des produits...</p>}
            {error && <p>Une erreur est survenue</p>}

            <ProductCardWrapper>
                {Array.isArray(products)
                    ? products.map((p) => (
                        <Link to={`/products/${p.id}`} key={p.id} state={{ products }}>
                            <ProductCard products={{ ...p }} />
                        </Link>
                    ))
                    : "Is not an array"}
            </ProductCardWrapper>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </>
    );
};

export default ProductSection;