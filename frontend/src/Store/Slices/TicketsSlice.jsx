import { createSlice } from "@reduxjs/toolkit";

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        tickets: [],
        dashboardData: [],
    },
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
        setDasboardData: (state, action) => {
            state.dashboardData = action.payload;
        }
    }
});

export const { setTickets, setDasboardData } = ticketsSlice.actions;
export default ticketsSlice.reducer;