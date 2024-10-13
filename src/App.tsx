// External imports
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// Local imports
import "./App.css";
import { toggleVerticalMenu } from "@redux/menu/menuSlice";
import VerticalMenu from "@molecules/VerticalMenu/VerticalMenu.tsx";
import Home from "@components/pages/Home/Home.tsx";
import Navbar from "./components/molecules/Navbar/Navbar.tsx";
import VerticalMenuStyled from "./components/molecules/VerticalMenu/VerticalMenu.styled.tsx";
import { RootState } from "@redux/store.ts";

const StyledRoot = styled.div`
    width: 100%;

    ${VerticalMenuStyled} {
        position: absolute;
        top: 4rem;
        left: 0;
        right: 0;

        &.hidden {
            width: 0vw;
        }
    }
`;

function App() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const menuState = useSelector((state: RootState) => state.menu);

    const Root: FC = () => {
        function handleLogin() {
            return auth.signinRedirect();
        }

        function handleLogout() {
            return auth.signoutRedirect();
        }

        useEffect(() => {
            function handleWindowResize() {
                const windowWidth = window.innerWidth;
                if (windowWidth > 1100) {
                    dispatch(toggleVerticalMenu(true));
                }
            }

            window.addEventListener("resize", handleWindowResize);
        }, []);

        return (
            <StyledRoot>
                <Navbar
                    handleShowMenu={() =>
                        dispatch(
                            toggleVerticalMenu(!menuState.showVerticalMenu),
                        )
                    }
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    user={auth.user}
                    isAuthenticated={auth.isLoading}
                />

                <VerticalMenu
                    handleShowMenu={() => dispatch(toggleVerticalMenu(false))}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    user={auth.user}
                    className={
                        menuState.showVerticalMenu ? "visible" : "hidden"
                    }
                    isAuthenticated={auth.isLoading}
                />
                <Outlet />
            </StyledRoot>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [{ path: "/", element: <Home user={auth.user} /> }],
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
