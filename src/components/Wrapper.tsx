// Extern
import {useSelector} from "react-redux";
import {IntlProvider} from "react-intl";
import {AuthProvider} from "react-oidc-context";
import {ThemeProvider} from "styled-components";
import React from "react";

// Intern
import oidcConfig from "@/shared/utils/auth/oidcConfig.ts";
import {RootState} from "@/app/store.ts";
import {theme} from "@/shared/theme";

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    const intlState = useSelector((state: RootState) => state.intl);

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={intlState.locale} messages={intlState.messages}>
                <AuthProvider {...oidcConfig}>
                    {children}
                </AuthProvider>
            </IntlProvider>
        </ThemeProvider>
    );
};

export default Wrapper;