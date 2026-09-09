import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  align-items: start;
  justify-items: center;
  padding: ${({theme}) => `${theme.layout.navbarHeight.desktop} ${theme.spacing.lg} ${theme.spacing.xxxl}`};
  background: ${({theme}) => theme.colors.background};

  > section {
    width: min(100%, 56rem);
    margin-top: ${({theme}) => theme.spacing.xxxl};
  }
`;
