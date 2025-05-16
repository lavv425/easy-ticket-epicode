import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading: false,
        message: null,
        isNavbarOpen: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload; // { type: 'success' | 'error', message: string }
        },
        clearMessage: (state) => {
            state.message = null;
        },
        setIsNavbarOpen: (state, action) => {
            state.isNavbarOpen = action.payload;
        },
    }
});

export const { setLoading, setMessage, clearMessage, setIsNavbarOpen } = appSlice.actions;
export default appSlice.reducer;