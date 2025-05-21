import { setLoading, setMessage } from "../Slices/AppSlice";
import ApiClient from '../../Services/ApiClient';
import { CREATE_TICKET, DELETE_TICKET, GET_DASHBOARD_TICKETS, GET_TICKET, GET_TICKETS, UPDATE_TICKET } from "../../Constants/Endpoints";
import { setTickets, setDasboardData } from "../Slices/TicketsSlice";

export const fetchTickets = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.get(GET_TICKETS);
        const { status, message, data: { tickets } } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message: message }));
            return;
        }

        dispatch(setTickets(tickets));
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchTicketDetails = (uuid, isViewing = false) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.get(`${GET_TICKET}/${uuid}?viewing=${isViewing}`);
        const { status, message, data: { ticket } } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message: message }));
            return;
        }

        return ticket;
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchDashboardTickets = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.get(GET_DASHBOARD_TICKETS);
        const { status, message, data: { tickets, statusCounts } } = data;
        if (!status) {
            dispatch(setMessage({ type: "error", message: message }));
            return;
        }

        dispatch(setDasboardData({ tickets, statusCounts }));
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteTicket = (uuid) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.delete(`${DELETE_TICKET}/${uuid}`);
        const { status, message } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message }));
            return;
        }

        await dispatch(fetchTickets());
        dispatch(setMessage({ type: "success", message }));
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createTicket = (ticketData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.post(CREATE_TICKET, ticketData);
        const { status, message } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message }));
            return;
        }

        await dispatch(fetchTickets());

        dispatch(setMessage({ type: "success", message }));
        return true;
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
        return false;
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateTicket = (ticketData, uuid) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.put(`${UPDATE_TICKET}/${uuid}`, ticketData);
        const { status, message } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message }));
            return;
        }

        await dispatch(fetchTickets());

        dispatch(setMessage({ type: "success", message }));
        return true;
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
        return false;
    } finally {
        dispatch(setLoading(false));
    }
};