import axios from "axios";
import { AUTH_TOKEN_LS, AXIOS_SETTINGS } from "../../Constants/Constants";

const ApiClient = axios.create(AXIOS_SETTINGS);

ApiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = localStorage.getItem(AUTH_TOKEN_LS) || "";
            config.headers.Authorization = `Bearer ${token}`;

        } catch (error) {
            if (error instanceof Error) {
                return Promise.reject(new Error(`Invalid Url: ${error.message}`));
            } else {
                return Promise.reject(new Error('Invalid Url: errore sconosciuto'));
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to save in cache
ApiClient.interceptors.response.use(
    async (response) => {
        const { status, data } = response;

        if (status >= 400 && !(data.status && data.message)) {
            const errorMessage = response.data?.message || `Error ${status}: An error occurred.`;

            return Promise.reject({
                response,
                message: errorMessage,
            });
        }

        return response;
    },
    (error) => {
        if (error.cached) {
            return Promise.resolve({ data: error.data, config: error.config });
        }
        return Promise.reject(error);
    }
);
export default ApiClient;