import { createSlice } from '@reduxjs/toolkit';
import { AUTH_TOKEN_LS } from '../../Constants/Constants';

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isLogged: false,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            let token = action?.payload?.token;

            if (!token) {
                const lsToken = localStorage.getItem(AUTH_TOKEN_LS);
                if (!lsToken) {
                    state.isLogged = false;
                    state.token = null;
                    return;
                }
                token = lsToken;
            }

            localStorage.setItem(AUTH_TOKEN_LS, token);
            state.token = token;
            state.isLogged = true;
        },
        logout: (state) => {
            localStorage.clear();

            state.isLogged = false;
            state.token = null;
        },
    }
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;