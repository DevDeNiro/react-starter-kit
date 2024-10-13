import React, { useEffect, useRef } from "react";
import { StyledButton } from "@atoms/Button/Button.styled.tsx";

export interface ButtonProps {
    handleClick: () => void;
    children: React.ReactNode;
    hasPopup?: boolean;
    expanded?: boolean;
    logout?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    handleClick,
    children,
    hasPopup,
    expanded,
    logout,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            if (logout) {
                buttonRef.current.setAttribute("aria-label", "Logout");
                buttonRef.current.style.background = "red";
                buttonRef.current.style.color = "white";
                return;
            } else if (!logout) {
                buttonRef.current.setAttribute("aria-label", "Menu");
                buttonRef.current.style.background = "#73f0f3";
                buttonRef.current.style.color = "black";
                return;
            }
        }
    }, [logout]);

    return (
        <StyledButton
            aria-haspopup={hasPopup}
            aria-expanded={expanded}
            ref={buttonRef}
            onClick={handleClick}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
