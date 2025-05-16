import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Slices/AppSlice';
import sessionReducer from './Slices/SessionSlice';
import ticketsReducer from './Slices/TicketsSlice';
import usersReducer from './Slices/UsersSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        session: sessionReducer,
        tickets: ticketsReducer,
        users: usersReducer
    }
});

export default store;