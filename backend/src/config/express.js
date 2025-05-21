console.log("NODE_ENV:", process.env.NODE_ENV);
const FRONTEND_URL = (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) ? "http://localhost:30000" : "https://easy-ticket-epc.michaellavigna.com";

console.log("FRONTEND_URL:", FRONTEND_URL);
export const RATE_LIMITER_CONFIG = {
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // max req for IP
  message: "<h3>Too many requests, please try again later</h3>",
  legacyHeaders: false,
};

export const CORS_CONFIG = {
  origin: FRONTEND_URL,
  credentials: true
};