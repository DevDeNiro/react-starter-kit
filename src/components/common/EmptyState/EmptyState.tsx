import {ReactNode} from "react";
import styled from "styled-components";

export interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

const Container = styled.section`
    display: grid;
    justify-items: center;
    gap: ${({theme}) => theme.spacing.sm};
    padding: ${({theme}) => theme.spacing.xxxl};
    text-align: center;
    border: 1px dashed ${({theme}) => theme.colors.border};
    border-radius: ${({theme}) => theme.radii.lg};
    background: ${({theme}) => theme.colors.surfaceMuted};
`;

const Title = styled.h2`
    margin: 0;
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.lg};
`;

const Description = styled.p`
    margin: 0;
    max-width: 36rem;
    color: ${({theme}) => theme.colors.textMuted};
`;

export function EmptyState({title, description, action}: EmptyStateProps) {
    return (
        <Container>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
            {action}
        </Container>
    );
}
