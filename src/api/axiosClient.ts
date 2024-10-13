import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const axiosClient = (url?: string, token?: string): AxiosInstance => {
    const instance = axios.create({
        baseURL: url,
        withCredentials: true,
        headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return instance;
};

export default axiosClient;
