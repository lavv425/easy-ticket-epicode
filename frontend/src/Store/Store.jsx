import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Slices/AppSlice';
import sessionReducer from './Slices/SessionSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        session: sessionReducer
    }
});

export default store;