import { useMemo, createContext, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setLoading } from "../../Store/Slices/AppSlice";
import { Alert, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import Loader from "../../Components/UI/Loader/Loader";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.app);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: 'light',
                primary: {
                    main: '#1976d2',
                    light: '#63a4ff',
                    dark: '#004ba0',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#9c27b0',
                    light: '#d05ce3',
                    dark: '#6a0080',
                    contrastText: '#fff',
                },
                success: {
                    main: '#2e7d32',
                },
                error: {
                    main: '#d32f2f',
                },
                warning: {
                    main: '#f57c00',
                },
                info: {
                    main: '#0288d1',
                },
                background: {
                    default: '#f4f6f8',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#212121',
                    secondary: '#616161',
                },
            },
            typography: {
                fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
                fontSize: 14,
                button: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
                h6: {
                    fontWeight: 700,
                },
            },
            shape: {
                borderRadius: 8,
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 8,
                            padding: '6px 16px',
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        rounded: {
                            borderRadius: 12,
                        },
                    },
                },
            },
        }), []);

    const appProviderReturn = useMemo(() => ({
        isLoading: loading,
        setIsLoading: (value) => dispatch(setLoading(value))
    }), [loading, dispatch]);

    const handleClose = useCallback((event, reason) => {
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