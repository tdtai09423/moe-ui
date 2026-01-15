import axios from "axios";
import qs from "qs";

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },

    paramsSerializer: (params) =>
        qs.stringify(params, {
            arrayFormat: "repeat",
            skipNulls: true,
        }),
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error.response?.status;
        const message =
            error.response?.data?.message || "Something went wrong";

        console.log({ "status": status, "message": message })

        //  Catch error here

        return Promise.reject(error);
    }
);


export default api;