/* eslint-disable @typescript-eslint/no-explicit-any, react-refresh/only-export-components */
import React, {ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";
import {IntlProvider} from "react-intl";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {http, HttpResponse} from "msw";
import {theme} from "@/shared/theme";
import {api} from "@/app/baseApi";

export const setupApiStore = (apiSlice: any, extraReducers = {}) => {
    const store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            ...extraReducers,
        },
        middleware: (getDefaultMiddleware: any) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });

    return {store};
};

interface TestProvidersProps {
    children: React.ReactNode;
    initialState?: any;
    store?: any;
}

export const TestProviders: React.FC<TestProvidersProps> = ({
    children,
    initialState = {},
    store,
}) => {
    const testStore = store || configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware: any) =>
            getDefaultMiddleware().concat(api.middleware),
        preloadedState: initialState,
    } as any);

    return (
        <Provider store={testStore}>
            <ThemeProvider theme={theme}>
                <IntlProvider locale="en" messages={{}}>
                    <BrowserRouter>{children}</BrowserRouter>
                </IntlProvider>
            </ThemeProvider>
        </Provider>
    );
};

const customRender = (
    ui: ReactElement,
    options: RenderOptions & {
        initialState?: any;
        store?: any;
    } = {},
) => {
    const {initialState, store, ...renderOptions} = options;

    const Wrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
        <TestProviders initialState={initialState} store={store}>
            {children}
        </TestProviders>
    );

    return render(ui, {wrapper: Wrapper, ...renderOptions});
};

export const createMockHandler = (
    method: "get" | "post" | "put" | "delete",
    url: string,
    response: unknown,
) => {
    const handler = async () => {
        const payload = typeof response === "function"
            ? await (response as () => unknown)()
            : response;
        return HttpResponse.json(payload as Record<string, unknown>);
    };

    return http[method](url, handler);
};

export * from "@testing-library/react";
export {customRender as render};
