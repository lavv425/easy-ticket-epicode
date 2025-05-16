const FRONTEND_URL = (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) ? "http://localhost:30000" : "https://easy-ticket.michaellavigna.com";

export const RATE_LIMITER_CONFIG = {
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // max req for IP
  message: "<h3>Too many requests, please try again later</h3>",
  legacyHeaders: false,
};

export const CORS_CONFIG = {
  origin: FRONTEND_URL,
  credentials: true
};