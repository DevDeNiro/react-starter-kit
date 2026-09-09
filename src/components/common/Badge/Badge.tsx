import {ReactNode} from "react";
import styled from "styled-components";

export interface BadgeProps {
    children: ReactNode;
    tone?: "neutral" | "success" | "warning" | "danger";
}

const StyledBadge = styled.span<{ $tone: BadgeProps["tone"] }>`
    display: inline-flex;
    align-items: center;
    padding: ${({theme}) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({theme}) => theme.radii.pill};
    background: ${({theme, $tone}) => {
        if ($tone === "success") return `${theme.colors.success}22`;
        if ($tone === "warning") return `${theme.colors.warning}22`;
        if ($tone === "danger") return `${theme.colors.danger}22`;
        return theme.colors.surfaceMuted;
    }};
    color: ${({theme, $tone}) => {
        if ($tone === "success") return theme.colors.success;
        if ($tone === "warning") return theme.colors.warning;
        if ($tone === "danger") return theme.colors.danger;
        return theme.colors.textMuted;
    }};
    font-size: ${({theme}) => theme.typography.fontSize.xs};
    font-weight: ${({theme}) => theme.typography.fontWeight.medium};
`;

export function Badge({children, tone = "neutral"}: BadgeProps) {
    return <StyledBadge $tone={tone}>{children}</StyledBadge>;
}
