import styled from "styled-components";
import StyledBurgerButton from "@atoms/BurgerButton/BurgerButton.styled.tsx";

const NavbarStyled = styled.div`
    width: 100%;
    height: 4rem;
    display: grid;
    grid-template-columns: auto auto;
    position: absolute;
    top: 0;
    border-bottom: 1px solid #000000;
    font-size: 0.875rem;
    background: black;
    color: white;
    z-index: 1000;

    .left-container {
        height: inherit;
        padding: 4px 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;

        .logo-wrapper {
            height: 2.5rem;

            img {
                height: 100%;
                object-fit: cover;
            }
        }

        nav-items {
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
        padding: 4px 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;

        ${StyledBurgerButton} {
            display: none;
        }
    }

    @media screen and (max-width: 1100px) {
        //display: flex;
        //flex-direction: row;
        font-size: 0.75rem;

        .left-container {
            a {
                display: none;
            }
        }

        .right-container {
            a. select. span. button {
                display: none;
            }

            ${StyledBurgerButton} {
                display: block;
            }
        }
    }
`;

export default NavbarStyled;
