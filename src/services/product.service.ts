import api from './api';
import type { Producto, CreateProductRequest, UpdateProductRequest } from '../types';

export type Product = Producto;
export type { CreateProductRequest, UpdateProductRequest };

export const productService = {
  // GET - Público
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/productos');
    return response.data;
  },

  // GET - Público
  getById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/productos/${id}`);
    return response.data;
  },

  // GET - Público
  getByCategory: async (categoriaId: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/productos/categoria/${categoriaId}`);
    return response.data;
  },

  // POST - Admin
  create: async (productData: CreateProductRequest): Promise<Product> => {
    const response = await api.post<Product>('/productos', productData);
    return response.data;
  },

  // PATCH - Admin
  update: async (id: string, productData: UpdateProductRequest): Promise<Product> => {
    const response = await api.patch<Product>(`/productos/${id}`, productData);
    return response.data;
  },

  // DELETE - Admin
  delete: async (id: string): Promise<void> => {
    await api.delete(`/productos/${id}`);
  },
};
