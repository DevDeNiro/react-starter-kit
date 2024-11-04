// External Imports
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// Local Imports
import App from "./App.tsx";
import "./index.css";
import Wrapper from "@components/Wrapper.tsx";
import { store } from "@redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Wrapper>
        <App />
      </Wrapper>
    </Provider>
  </React.StrictMode>,
);
