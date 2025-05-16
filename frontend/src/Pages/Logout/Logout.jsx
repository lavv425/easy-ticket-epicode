import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/SessionSlice";
import { LOGIN } from "../../Routes/Routes";

const Logout = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        nav(LOGIN);
    }, [nav, dispatch]);

    return null;
};

export default Logout;