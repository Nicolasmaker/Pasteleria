import api from './api';
import type { User, CreateUserRequest, UpdateUserRequest } from '../types';

export type { User, CreateUserRequest, UpdateUserRequest };

export const userService = {
  // GET - Autenticado
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // GET - Autenticado
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // POST - Admin
  create: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },

  // PATCH - Autenticado
  update: async (id: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, userData);
    return response.data;
  },

  // DELETE - Admin
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Mantener exports legacy para compatibilidad
export const getUsers = userService.getAll;
export const getUser = userService.getById;

// Exportar el servicio por defecto
export default userService;
