import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useValidateSession } from "../Store/Thunks/SessionThunks";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../Store/Selectors/SessionSelectors";
import { memo, useEffect } from "react";
import { LOGIN } from "../Routes/Routes";
import Loader from '../Components/UI/Loader/Loader';

const AuthenticatedRoute = () => {
    const { pathname } = useLocation();
    const validateSession = useValidateSession();
    const isLogged = useSelector(selectIsLogged);

    useEffect(() => {
        validateSession();
    }, [pathname, validateSession]);


    if (isLogged === null || isLogged === undefined) {
        return <Loader />;
    }

    if (!isLogged) {
        return <Navigate to={LOGIN} replace />;
    }

    return <Outlet />;
};

export default memo(AuthenticatedRoute);