import axios from 'axios';

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api` 
        : '/api',
});

// Add a request interceptor
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const api = {
    get: async (url: string) => {
        const response = await apiInstance.get(url);
        return response.data;
    },
    post: async (url: string, data: any) => {
        const response = await apiInstance.post(url, data);
        return response.data;
    },
    put: async (url: string, data: any) => {
        const response = await apiInstance.put(url, data);
        return response.data;
    },
    delete: async (url: string) => {
        const response = await apiInstance.delete(url);
        return response.data;
    }
};
