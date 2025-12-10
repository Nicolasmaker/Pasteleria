import api from './api';

export const getUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
