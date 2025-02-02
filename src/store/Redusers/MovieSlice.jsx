import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null
}

const MovieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        loadMovie: (state, action) => {
            state.info = action.payload;
        },

        removeMovie: (state, action) => {
            state.info = null;
        }

    },
});

export const { loadMovie, removeMovie } = MovieSlice.actions;
export default MovieSlice.reducer;
