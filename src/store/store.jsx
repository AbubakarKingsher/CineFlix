import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./Redusers/MovieSlice";
import TvSlice from "./Redusers/TvSlice";
import PersonSlice from "./Redusers/PersonSlice";

export const store = configureStore({
    reducer: {
        movie: MovieSlice,
        tv: TvSlice,
        person: PersonSlice
    },
});

export default store;
