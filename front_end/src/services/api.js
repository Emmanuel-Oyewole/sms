import axios from "axios";
const api = axios.create({
    baseURL: "https://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Adding a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const tokens = localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null;
        if (tokens && tokens.access_token) {
            config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;


