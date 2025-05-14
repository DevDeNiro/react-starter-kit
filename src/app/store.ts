import { configureStore } from "@reduxjs/toolkit";

import intlReducer from "./slices/intl/intlSlice.ts";
import menuReducer from "./slices/menu/menuSlice.ts";

export const store = configureStore({
  reducer: {
    intl: intlReducer,
    menu: menuReducer,
    // keycloak: keycloakReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
