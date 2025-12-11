import api from './api';
import type { Boleta, BoletaProducto, CreateBoletaRequest, UpdateBoletaRequest } from '../types';

export type { Boleta, BoletaProducto, CreateBoletaRequest, UpdateBoletaRequest };

export const boletaService = {
  // GET - Admin/Vendedor
  getAll: async (): Promise<Boleta[]> => {
    const response = await api.get<Boleta[]>('/boletas');
    return response.data;
  },

  // GET - Usuario autenticado
  getById: async (id: string): Promise<Boleta> => {
    const response = await api.get<Boleta>(`/boletas/${id}`);
    return response.data;
  },

  // GET - Usuario autenticado
  getByUserId: async (userId: string): Promise<Boleta[]> => {
    const response = await api.get<Boleta[]>(`/boletas/usuario/${userId}`);
    return response.data;
  },

  // POST - Usuario autenticado
  create: async (boletaData: CreateBoletaRequest): Promise<Boleta> => {
    const response = await api.post<Boleta>('/boletas', boletaData);
    return response.data;
  },

  // PATCH - Admin/Vendedor
  update: async (id: string, boletaData: UpdateBoletaRequest): Promise<Boleta> => {
    const response = await api.patch<Boleta>(`/boletas/${id}`, boletaData);
    return response.data;
  },

  // DELETE - Admin
  delete: async (id: string): Promise<void> => {
    await api.delete(`/boletas/${id}`);
  },
};
