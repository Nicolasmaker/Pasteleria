import api from './api';
import type { User, LoginRequest, RegisterRequest, LoginResponse } from '../types';

export type { User };

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },
};

// Mantener exports compatibles con código existente
export const login = authService.login;
export const register = authService.register;
