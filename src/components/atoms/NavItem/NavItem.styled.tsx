import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavItem = styled(Link)`
  color: white;
  background: none;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default StyledNavItem;
