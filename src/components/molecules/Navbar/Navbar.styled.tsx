import styled from "styled-components";
import StyledBurgerButton from "@atoms/BurgerButton/BurgerButton.styled.tsx";
import {hideAbove, hideBelow, responsiveFontSize, responsiveHeight} from "@shared/utils/responsive.ts";

const NavbarStyled = styled.div`
    width: 100%;
    ${props => responsiveHeight({
        mobile: props.theme.navbar.height.mobile,
        tablet: props.theme.navbar.height.tablet,
        desktop: props.theme.navbar.height.desktop,
    })(props.theme)}

    display: grid;
    grid-template-columns: auto auto;
    position: absolute;
    top: 0;
    border-bottom: 1px solid #000000;
    background: black;
    color: white;
    z-index: 1000;

    ${props => responsiveFontSize({
        mobile: props.theme.navbar.fontSize.mobile,
        tablet: props.theme.navbar.fontSize.tablet,
        desktop: props.theme.navbar.fontSize.desktop,
    })(props.theme)}
    .left-container {
        height: inherit;
        padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${props => props.theme.spacing.md};

        .logo-wrapper {
            height: 2.5rem;

            img {
                height: 100%;
                object-fit: cover;
            }
        }

        /* Cache les nav-items sur mobile/tablet */

        .nav-items {
            ${props => hideBelow('laptop')(props.theme)}

            color: white;
            background: none;
            text-decoration: none;
            transition: opacity 0.1s ease-out;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .right-container {
        padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: ${props => props.theme.spacing.md};

        /* Cache les éléments sur mobile/tablet sauf burger */

        .desktop-only {
            ${props => hideBelow('laptop')(props.theme)}
        }

        ${StyledBurgerButton} {
            ${props => hideAbove('laptop')(props.theme)}
        }
    }
`;

export default NavbarStyled;