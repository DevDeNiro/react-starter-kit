import {ReactNode} from "react";
import styled from "styled-components";

export interface CardProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

const StyledCard = styled.section`
    display: grid;
    gap: ${({theme}) => theme.spacing.lg};
    padding: ${({theme}) => theme.spacing.xl};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: ${({theme}) => theme.radii.lg};
    background: ${({theme}) => theme.colors.surface};
    box-shadow: ${({theme}) => theme.shadows.sm};
`;

const Header = styled.header`
    display: grid;
    gap: ${({theme}) => theme.spacing.xs};
`;

const Title = styled.h2`
    margin: 0;
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.lg};
    font-weight: ${({theme}) => theme.typography.fontWeight.semibold};
`;

const Description = styled.p`
    margin: 0;
    color: ${({theme}) => theme.colors.textMuted};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
`;

export function Card({children, title, description}: CardProps) {
    return (
        <StyledCard>
            {(title || description) && (
                <Header>
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                </Header>
            )}
            {children}
        </StyledCard>
    );
}
