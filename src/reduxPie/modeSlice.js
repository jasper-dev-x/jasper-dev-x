import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bg: 'light',
    txt: 'dark'
};

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        toggleMode(state, action) {
            if (state.bg === 'light') {
                state.bg = 'dark';
                state.txt = 'light';
            } else {
                state.bg = 'light';
                state.txt = 'dark';
            }
        }
    }
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;