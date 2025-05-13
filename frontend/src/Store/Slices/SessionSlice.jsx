import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setLoading, setUser, setError, logout } = sessionSlice.actions;
export default sessionSlice.reducer;