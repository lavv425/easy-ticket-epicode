import { useMemo, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Store/Slices/AppSlice";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.app.loading);

    const appProviderReturn = useMemo(() => ({
        isLoading,
        setIsLoading: (value) => dispatch(setLoading(value)) // override della vecchia setState
    }), [isLoading, dispatch]);
    return (
        <AppContext.Provider value={{ appProviderReturn }}>
            {isLoading && <Loader />}
            {children}
        </AppContext.Provider>
    );
};