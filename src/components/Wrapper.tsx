// Extern
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { AuthProvider } from "react-oidc-context";
import React from "react";

// Intern
import oidcConfig from "@utils/auth/oidcConfig.ts";
import { RootState } from "../redux/store.ts";

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const intlState = useSelector((state: RootState) => state.intl);

    return (
        <IntlProvider locale={intlState.locale} messages={intlState.messages}>
            <AuthProvider {...oidcConfig}> {children} </AuthProvider>
        </IntlProvider>
    );
};

export default Wrapper;
