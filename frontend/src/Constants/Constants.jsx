import { BASE_URL } from "./Endpoints";

export const AUTH_TOKEN_LS = "auth-token";

export const AXIOS_SETTINGS = {
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    responseType: "json",
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status <= 500,
};

export const SITE_THEME = {
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
        fontFamily: `'Open Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
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
};

export const TICKET_STATUSES = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
};

export const TICKET_STATUS_LABELS = {
    [TICKET_STATUSES.OPEN]: 'Open',
    [TICKET_STATUSES.IN_PROGRESS]: 'Work in progress',
    [TICKET_STATUSES.RESOLVED]: 'Resolved',
};

export const TICKET_PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
};

export const TICKET_PRIORITY_LABELS = {
    [TICKET_PRIORITIES.LOW]: 'Low',
    [TICKET_PRIORITIES.MEDIUM]: 'Medium',
    [TICKET_PRIORITIES.HIGH]: 'High',
    [TICKET_PRIORITIES.CRITICAL]: 'Critical',
};

export const TICKET_PARAMS = {
    CREATE: 'create',
    EDIT: 'edit',
};