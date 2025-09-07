import axios from 'axios';

export const AXIOS_CLIENT = axios.create({
    baseURL: '/api',
    withCredentials: true,
    params: {
        ['api-key']: 'rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP',
    },
});
