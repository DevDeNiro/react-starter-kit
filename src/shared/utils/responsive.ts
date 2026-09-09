// utils/responsive.ts
import {css} from 'styled-components';
import {Theme} from '../theme';

// Helper pour créer des styles responsifs basés sur des objets
export const responsive = <T>(
    values: Partial<Record<keyof Theme['breakpoints'], T>>,
    property: string
) => {
    return (theme: Theme) => css`
        /* Mobile first approach */
        ${values.mobile && css`${property}: ${values.mobile};`}

        ${values.tablet && css`
            ${theme.mediaQueries.aboveTablet} {
                ${property}: ${values.tablet};
            }
        `}

        ${values.laptop && css`
            ${theme.mediaQueries.aboveLaptop} {
                ${property}: ${values.laptop};
            }
        `}

        ${values.desktop && css`
            ${theme.mediaQueries.desktop} {
                ${property}: ${values.desktop};
            }
        `}
    `;
};

// Helper pour les tailles de police responsives
export const responsiveFontSize = (sizes: Partial<Record<keyof Theme['breakpoints'], string>>) =>
    responsive(sizes, 'font-size');

// Helper pour les largeurs responsives
export const responsiveWidth = (widths: Partial<Record<keyof Theme['breakpoints'], string>>) =>
    responsive(widths, 'width');

// Helper pour les hauteurs responsives
export const responsiveHeight = (heights: Partial<Record<keyof Theme['breakpoints'], string>>) =>
    responsive(heights, 'height');

// Helper pour les paddings responsifs
export const responsivePadding = (paddings: Partial<Record<keyof Theme['breakpoints'], string>>) =>
    responsive(paddings, 'padding');

// Helper pour les gaps responsifs
export const responsiveGap = (gaps: Partial<Record<keyof Theme['breakpoints'], string>>) =>
    responsive(gaps, 'gap');

// Helper pour masquer/afficher des éléments selon l'écran
export const hideBelow = (breakpoint: keyof Theme['breakpoints']) => (theme: Theme) => css`
    @media (max-width: ${theme.breakpoints[breakpoint]}) {
        display: none;
    }
`;

export const hideAbove = (breakpoint: keyof Theme['breakpoints']) => (theme: Theme) => css`
    @media (min-width: ${theme.breakpoints[breakpoint]}) {
        display: none;
    }
`;

export const showOnlyOn = (breakpoint: keyof Theme['breakpoints']) => (theme: Theme) => {
    const breakpoints = Object.keys(theme.breakpoints) as Array<keyof Theme['breakpoints']>;
    const currentIndex = breakpoints.indexOf(breakpoint);

    return css`
        display: none;

        ${currentIndex > 0 && css`
            @media (min-width: ${theme.breakpoints[breakpoints[currentIndex - 1]]}) {
                display: none;
            }
        `} @media (
        min-width: ${theme.breakpoints[breakpoint]}) {
        display: block;
    } ${currentIndex < breakpoints.length - 1 && css`
        @media (min-width: ${theme.breakpoints[breakpoints[currentIndex + 1]]}) {
            display: none;
        }
    `}
    `;
};

// Helper pour les grilles responsives
export const responsiveGrid = (theme: Theme) => css`
    display: grid;

    ${responsiveWidth({
        mobile: '100%',
        tablet: '100%',
        laptop: '100%',
        desktop: '100%'
    })(theme)}

    grid-template-columns: repeat(${theme.grid.mobile.columns}, 1fr);
    gap: ${theme.grid.mobile.gap};
    padding: ${theme.grid.mobile.padding};

    ${theme.mediaQueries.aboveTablet} {
        grid-template-columns: repeat(${theme.grid.tablet.columns}, 1fr);
        gap: ${theme.grid.tablet.gap};
        padding: ${theme.grid.tablet.padding};
    }

    ${theme.mediaQueries.aboveLaptop} {
        grid-template-columns: repeat(${theme.grid.laptop.columns}, 1fr);
        gap: ${theme.grid.laptop.gap};
        padding: ${theme.grid.laptop.padding};
    }

    ${theme.mediaQueries.desktop} {
        grid-template-columns: repeat(${theme.grid.desktop.columns}, 1fr);
        gap: ${theme.grid.desktop.gap};
        padding: ${theme.grid.desktop.padding};
    }
`;