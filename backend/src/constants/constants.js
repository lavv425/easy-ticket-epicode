export const COLLECTION_STATUSES = "statuses";
export const COLLECTION_ROLES = "roles";
export const COLLECTION_USERS = "users";
export const COLLECTION_TICKETS = "tickets";
export const COLLECTION_RESET_CODES = "reset-codes";

export const JWT_SECRET = "b^'!1!!dln(L(d1)Vs#jSne6q{IWv.@NQR,~";
export const JWT_BASE_SETTINGS = {
    expiresIn: "2h",
    issuer: "easy-ticket",
    audience: "https://easy-ticket.michaellavigna.com",
};

export const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export const DEFAULT_OK_RESPONSE = {
    status: true,
    message: "Success",
    statusCode: 200,
};

export const BAD_REQUEST_RESPONSE = {
    status: false,
    message: "Bad request",
    statusCode: 400,
};

export const INVALID_TOKEN_RESPONSE = {
    status: false,
    message: "Unauthorized",
    statusCode: 401,
};

export const FORBIDDEN_RESPONSE = {
    status: false,
    message: "Forbidden",
    statusCode: 403,
};

export const RESOURCE_NOT_FOUND_RESPONSE = {
    status: false,
    message: "Resource not found",
    statusCode: 404,
};

export const CONFLICT_RESPONSE = {
    status: false,
    message: "Resource conflict",
    statusCode: 409,
};

export const ERROR_RESPONSE = {
    status: false,
    message: "An error occurred, please try again later",
    statusCode: 500,
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

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

export const USER_ROLE_LABELS = {
    [USER_ROLES.ADMIN]: 'Amministratore',
    [USER_ROLES.USER]: 'Utente',
};