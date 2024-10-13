import StyledBurgerButton from "@components/atoms/BurgerButton/BurgerButton.styled.tsx";
import React from "react";

export interface BurgerButtonProps {
    handleShowMenu: () => void;
    hasPopup?: boolean;
    expanded?: boolean;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
    handleShowMenu,
    expanded,
    hasPopup,
}) => {
    return (
        <StyledBurgerButton
            role={"button"}
            className={"burger-button"}
            onClick={handleShowMenu}
            aria-haspopup={hasPopup}
            aria-expanded={expanded}
        >
            🍔
        </StyledBurgerButton>
    );
};

export default BurgerButton;
