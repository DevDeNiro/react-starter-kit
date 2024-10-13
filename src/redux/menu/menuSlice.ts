import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
    showVerticalMenu: boolean;
}

const initialState: MenuState = {
    showVerticalMenu: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggleVerticalMenu(state, action: PayloadAction<boolean>) {
            state.showVerticalMenu = action.payload;
        },
    },
});

export const { toggleVerticalMenu } = menuSlice.actions;
export default menuSlice.reducer;
