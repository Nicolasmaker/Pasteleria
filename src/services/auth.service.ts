import api from './api';

export const login = (credentials: any) => api.post('/auth/login', credentials);
export const register = (userData: any) => api.post('/auth/register', userData);
export const refreshToken = () => api.post('/auth/refresh-token');
