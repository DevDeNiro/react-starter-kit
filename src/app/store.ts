// Extern
import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

// Intern
import {api} from './baseApi';
import intlReducer from "./slices/intl/intlSlice.ts";
import menuReducer from "./slices/menu/menuSlice.ts";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        intl: intlReducer,
        menu: menuReducer,
        // keycloak: keycloakReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
