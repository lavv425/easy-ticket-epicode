import { useNavigate } from "react-router-dom";
import { LOGIN, VALIDATE_TOKEN } from "../../Constants/Endpoints";
import ApiClient from "../../Services/ApiClient";
import { setLoading, setMessage } from "../Slices/AppSlice";
import { login, logout } from "../Slices/SessionSlice";
import { useDispatch } from "react-redux";
import { LOGIN as LOGIN_ROUTE } from '../../Routes/Routes';
import { useCallback } from "react";

export const loginUser = (username, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const loginBody = { username, password };
        const { data } = await ApiClient.post(LOGIN, loginBody);
        const { status, message, data: loginData } = data;

        if (!status) {
            dispatch(setMessage({ type: "error", message: message }));
            return;
        }

        dispatch(login({ token: loginData.token }));

        return true;
    } catch (err) {
        dispatch(logout());
        dispatch(setMessage({ type: "error", message: err.message }));
        return false;
    } finally {
        dispatch(setLoading(false));
    }
};

export const useValidateSession = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateSession = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const { data } = await ApiClient.get(VALIDATE_TOKEN);

            if (!data.status) {
                dispatch(logout());
                navigate(LOGIN_ROUTE);
                dispatch(setMessage({ type: "error", message: data.message }));
            }

            dispatch(login());

        } catch (_e) {
            dispatch(logout());
            navigate(LOGIN_ROUTE);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    return validateSession;
};