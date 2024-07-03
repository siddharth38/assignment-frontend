import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // Base URL for your API
    headers: {
        "Content-Type": "application/json",
    },
});

// Optionally add interceptors to handle request and response globally
axiosInstance.interceptors.request.use(
    (config) => {
        // Add token to headers if available
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors here (e.g., logout on 401)
        if (error.response && error.response.status === 401) {
            // Optionally clear token and redirect to login
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
