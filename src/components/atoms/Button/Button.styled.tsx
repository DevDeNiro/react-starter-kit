import styled from "styled-components";

export const StyledButton = styled.button`
    padding: 5px 15px;
    height: 2.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`;
