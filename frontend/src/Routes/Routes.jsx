import { TICKET_PARAMS } from "../Constants/Constants";

export const UNAUTHORIZED = "/unauthorized";
export const NOT_FOUND = "*";

export const LOGIN = "/login";
export const DASHBOARD = "/";
export const TICKETS = "/tickets";
export const CREATE_TICKET = `${TICKETS}/${TICKET_PARAMS.CREATE}`;
export const VIEW_TICKET_BASE = `${TICKETS}/view`;
export const EDIT_TICKET = `${TICKETS}/${TICKET_PARAMS.EDIT}`;
export const CREATE_EDIT_TICKET = `${TICKETS}/:mode/:uuid?`;
export const VIEW_TICKET = `${VIEW_TICKET_BASE}/:uuid`;
export const USERS = "/users";
export const LOGOUT = "/logout";