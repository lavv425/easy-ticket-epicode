import { CREATE_USER, DELETE_USER, GET_USERS } from "../../Constants/Endpoints";
import ApiClient from "../../Services/ApiClient";
import { setLoading, setMessage } from "../Slices/AppSlice";
import { setUsers } from "../Slices/UsersSlice";

export const fetchUsers = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.get(GET_USERS);
        const { status, message, data: users } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message: message }));
            return;
        }

        dispatch(setUsers(users));
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteUser = (uuid) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.delete(`${DELETE_USER}/${uuid}`);
        const { status, message } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message }));
            return;
        }

        await dispatch(fetchUsers());
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createUser = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await ApiClient.post(CREATE_USER, userData);
        const { status, message } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message }));
            return;
        }

        await dispatch(fetchUsers());

        dispatch(setMessage({ type: "success", message }));
    } catch (err) {
        dispatch(setMessage({ type: "error", message: err.message }));
    } finally {
        dispatch(setLoading(false));
    }
};