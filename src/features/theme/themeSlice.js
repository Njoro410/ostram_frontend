import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark"
};

// Create a slice for theme state using Redux toolkit's createSlice function.
export const themeSlice = createSlice({
    // Set the name of the slice to "theme".
    name: "theme",
    // Set the initial state of the slice.
    initialState,
    // Define the slice's reducers.
    reducers: {
        // Create a "setMode" reducer that toggles the theme mode between "light" and "dark".
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
})

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;