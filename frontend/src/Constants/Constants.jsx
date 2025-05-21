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