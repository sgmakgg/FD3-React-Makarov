import { configureStore } from '@reduxjs/toolkit';

import top250moviesReducer from './top250moviesSlice';

export const store = configureStore({
    reducer: {
        top250movies: top250moviesReducer,
    },
    // the thunk middleware adds automatically
})
