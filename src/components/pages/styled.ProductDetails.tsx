import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const VariantSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ColorButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

export const VariantDetails = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;