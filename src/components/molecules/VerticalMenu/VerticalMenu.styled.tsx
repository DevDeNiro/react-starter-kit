import styled from "styled-components";
import {responsiveWidth} from "@shared/utils/responsive.ts";

const VerticalMenuStyled = styled.nav`
    overflow: hidden;
    height: calc(100vh - ${props => props.theme.navbar.height.desktop});
    background: #393e46;
    transition: width 0.4s ease-out;
    color: white;

    /* Largeur responsive basée sur le thème */

    ${props => responsiveWidth({
        mobile: props.theme.verticalMenu.width.mobile,
        tablet: props.theme.verticalMenu.width.tablet,
        laptop: props.theme.verticalMenu.width.laptop,
        desktop: props.theme.verticalMenu.width.desktop,
    })(props.theme)}
    .vertical-menu-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${props => props.theme.spacing.md};
        padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xxl};
        width: 100%;
        opacity: 1;
        transition: opacity 0.5s ease-out;

        a,
        select,
        button {
            width: 100%;
        }

        .nav-item {
            display: flex;
            place-content: center;
            background: none;
            color: white;
            transition: opacity 0.2s ease-out;

            &:hover {
                opacity: 0.7;
            }
        }
    }

    &.hidden {
        width: 0;

        .vertical-menu-content {
            opacity: 0;
        }
    }

    &.visible {
        /* Utilise les largeurs définies dans le thème */

        ${props => responsiveWidth({
            mobile: props.theme.verticalMenu.width.mobile,
            tablet: props.theme.verticalMenu.width.tablet,
            laptop: props.theme.verticalMenu.width.laptop,
            desktop: props.theme.verticalMenu.width.desktop,
        })(props.theme)}
        .vertical-menu-content {
            opacity: 1;
        }
    }
`;

export default VerticalMenuStyled;