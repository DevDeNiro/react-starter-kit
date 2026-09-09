import styled from "styled-components";

export interface SpinnerProps {
    label?: string;
    size?: "sm" | "md" | "lg";
}

const sizeMap = {
    sm: "1rem",
    md: "1.5rem",
    lg: "2.5rem",
} as const;

const SpinnerIcon = styled.span<{ $size: SpinnerProps["size"] }>`
    width: ${({$size}) => sizeMap[$size ?? "md"]};
    height: ${({$size}) => sizeMap[$size ?? "md"]};
    display: inline-block;
    border: 3px solid ${({theme}) => theme.colors.border};
    border-top-color: ${({theme}) => theme.colors.primary};
    border-radius: ${({theme}) => theme.radii.pill};
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

export function Spinner({label = "Chargement", size = "md"}: SpinnerProps) {
    return (
        <span role="status" aria-label={label}>
            <SpinnerIcon $size={size} aria-hidden="true" />
        </span>
    );
}
