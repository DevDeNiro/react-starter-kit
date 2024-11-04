import styled from "styled-components";

const VerticalMenuStyled = styled.nav`
  width: 40vw;
  overflow: hidden;
  height: calc(100vh - 4rem);
  background: #393e46;
  transition: width 0.4s ease-out;
  color: white;

  .vertical-menu-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 1.5rem 2.5rem;
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

  @media screen and (max-width: 1100px) {
    &.visible {
      width: 50vw;

      .vertical-menu-content {
        opacity: 1;
      }
    }

    &.hidden {
      width: 0;

      .vertical-menu-content {
        opacity: 0;
      }
    }
  }

  @media screen and (max-width: 500px) {
    &.visibility {
      width: 100vw;
    }

    &.hidden {
      width: 0;
    }
  }
`;

export default VerticalMenuStyled;
