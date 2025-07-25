import { useMemo, createContext, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setLoading } from "../../Store/Slices/AppSlice";
import { Alert, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import Loader from "../../Components/UI/Loader/Loader";
import { SITE_THEME } from "../../Constants/Constants";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.app);

    const theme = useMemo(() => createTheme(SITE_THEME), []);

    const appProviderReturn = useMemo(() => ({
        isLoading: loading,
        setIsLoading: (value) => dispatch(setLoading(value))
    }), [loading, dispatch]);

    const handleClose = useCallback((_, reason) => {
        if (reason === 'clickaway') return;
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(handleClose, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch, handleClose]);

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ appProviderReturn }}>
                {loading && <Loader />}

                <Snackbar
                    open={!!message}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    {message && (
                        <Alert onClose={handleClose} severity={message.type} variant="filled">
                            {message.message}
                        </Alert>
                    )}
                </Snackbar>

                {children}
            </AppContext.Provider>
        </ThemeProvider>
    );
};