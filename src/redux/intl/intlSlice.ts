import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageFormatElement } from "react-intl";
import English from "@utils/translations/en-us.json";
import French from "@utils/translations/fr-fr.json";

interface intlState {
    locale: string;
    messages: Record<string, string> | Record<string, MessageFormatElement[]>;
}

const initialState: intlState = {
    locale: navigator.language,
    messages: navigator.language === "en-US" ? English : French,
};

const intlSlice = createSlice({
    name: "intl",
    initialState,
    reducers: {
        selectLanguage(
            state,
            action: PayloadAction<React.ChangeEvent<HTMLSelectElement>>,
        ) {
            const locale = action.payload.target.value;
            state.locale = locale;
            //   25:13  error  Expected an assignment or function call and instead saw an expression
            //   @typescript-eslint/no-unused-expressions
            // Error if ternary operator is not assigned to a variable
            if (locale === "en-US") {
                state.messages = English;
            } else if (locale === "fr-FR") {
                state.messages = French;
            }
        },
    },
});

export const { selectLanguage } = intlSlice.actions;
export default intlSlice.reducer;
