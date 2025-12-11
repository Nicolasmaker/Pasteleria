import api from './api';
import type { Categoria, CreateCategoryRequest, UpdateCategoryRequest } from '../types';

export type Category = Categoria;
export type { CreateCategoryRequest, UpdateCategoryRequest };

export const categoryService = {
  // GET - Público
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categorias');
    return response.data;
  },

  // GET - Público
  getById: async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categorias/${id}`);
    return response.data;
  },

  // POST - Admin
  create: async (categoryData: CreateCategoryRequest): Promise<Category> => {
    const response = await api.post<Category>('/categorias', categoryData);
    return response.data;
  },

  // PATCH - Admin
  update: async (id: string, categoryData: UpdateCategoryRequest): Promise<Category> => {
    const response = await api.patch<Category>(`/categorias/${id}`, categoryData);
    return response.data;
  },

  // DELETE - Admin
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categorias/${id}`);
  },
};
