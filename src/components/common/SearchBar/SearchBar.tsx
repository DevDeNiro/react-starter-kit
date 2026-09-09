import {FormEvent, useId} from "react";
import styled from "styled-components";

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
}

const SearchForm = styled.form`
    display: flex;
    gap: ${({theme}) => theme.spacing.sm};
    width: 100%;
`;

const SearchInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: ${({theme}) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: ${({theme}) => theme.radii.md};
    background: ${({theme}) => theme.colors.surface};
    color: ${({theme}) => theme.colors.text};
    font: inherit;

    &:focus {
        outline: 3px solid ${({theme}) => theme.colors.focus}66;
        border-color: ${({theme}) => theme.colors.focus};
    }
`;

const SearchButton = styled.button`
    border: 0;
    border-radius: ${({theme}) => theme.radii.md};
    padding: ${({theme}) => `0 ${theme.spacing.lg}`};
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.primaryText};
    font: inherit;
    font-weight: ${({theme}) => theme.typography.fontWeight.medium};
    cursor: pointer;

    &:hover {
        background: ${({theme}) => theme.colors.primaryHover};
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.focus}66;
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export function SearchBar({
    value,
    onChange,
    onSubmit,
    placeholder = "Rechercher",
    label = "Rechercher",
    disabled = false,
}: SearchBarProps) {
    const inputId = useId();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(value);
    };

    return (
        <SearchForm onSubmit={handleSubmit} role="search">
            <label htmlFor={inputId} className="visually-hidden">{label}</label>
            <SearchInput
                id={inputId}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            <SearchButton type="submit" disabled={disabled} aria-label={label}>
                Rechercher
            </SearchButton>
        </SearchForm>
    );
}
