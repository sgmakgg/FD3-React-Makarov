import { createSlice } from '@reduxjs/toolkit';
import deepEqual from 'deep-equal';


const initialState={
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    data: null,
}

export const top250moviesSlice = createSlice({
    name: 'top250movies',
    initialState,
    reducers: {

        updateLoadStatus: (state,action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
        },

        updateData: (state,action) => {
            state.data = action.payload;
            if(!deepEqual(action.payload, localStorage.getItem('top250Movies'))){
                localStorage.setItem('top250Movies', JSON.stringify(action.payload));
            }
        },
    },
});

export const { updateLoadStatus, updateData } = top250moviesSlice.actions;

export default top250moviesSlice.reducer;