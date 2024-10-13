import { configureStore } from "@reduxjs/toolkit";

import intlReducer from "./intl/intlSlice";
import menuReducer from "./menu/menuSlice";

export const store = configureStore({
    reducer: {
        intl: intlReducer,
        menu: menuReducer,
        // keycloak: keycloakReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
