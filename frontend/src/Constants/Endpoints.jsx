const USER_NAMESPACE = "/user";
const TICKET_NAMESPACE = "/ticket";
const AUTH_NAMESPACE = `${USER_NAMESPACE}/auth`;

export const BASE_URL = import.meta.env.BACKEND_BASE_URL;
export const LOGIN = `${AUTH_NAMESPACE}/login`;
export const VALIDATE_TOKEN = `${AUTH_NAMESPACE}/validate-token`;

export const GET_TICKETS = `${TICKET_NAMESPACE}`;
export const GET_TICKET = `${TICKET_NAMESPACE}`;
export const GET_DASHBOARD_TICKETS = `${TICKET_NAMESPACE}/dashboard`;
export const UPDATE_TICKET = `${TICKET_NAMESPACE}`;
export const DELETE_TICKET = `${TICKET_NAMESPACE}`;
export const CREATE_TICKET = `${TICKET_NAMESPACE}`;

export const GET_USERS = `${USER_NAMESPACE}`;
export const GET_USER = `${USER_NAMESPACE}`;
export const DELETE_USER = `${USER_NAMESPACE}`;
export const CREATE_USER = `${USER_NAMESPACE}`;
export const UPDATE_USER = `${USER_NAMESPACE}`;