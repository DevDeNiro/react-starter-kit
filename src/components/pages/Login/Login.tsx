import { AuthContextProps } from "react-oidc-context";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { LoginWrapper } from "@pages/Login/Login.styled.tsx";

interface LoginProps {
    auth: AuthContextProps;
}

const Login: FC<LoginProps> = ({ auth }) => {
    if (auth.isLoading && !auth.isAuthenticated) {
        return <LoginWrapper>Logging in...</LoginWrapper>;
    }

    return <Navigate to={"/"} />;
};

export default Login;
