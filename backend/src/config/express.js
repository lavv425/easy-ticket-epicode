const FRONTEND_URL = (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) ? "http://localhost:20000" : "https://easy-ticket.michaellavigna.com";

export const RATE_LIMITER_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max req for IP
  message: "Too many requests, please try again later",
};

export const CORS_CONFIG = {
  origin: FRONTEND_URL,
  credentials: true
};