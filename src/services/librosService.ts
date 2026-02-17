import type { Libro } from '../types/libro';
import { apiClient } from './apiClient';

export const librosService = {
  async getAll(): Promise<Libro[]> {
    const response = await apiClient.get<Libro[]>('/libros');
    return response.data;
  },

  async getById(id: number): Promise<Libro> {
    const response = await apiClient.get<Libro>(`/libros/${id}`);
    return response.data;
  },

  async create(libro: Omit<Libro, 'id' | 'userId'>): Promise<Libro> {
    const response = await apiClient.post<Libro>('/libros', libro);
    return response.data;
  },

  async update(id: number, libro: Partial<Omit<Libro, 'id' | 'userId'>>): Promise<Libro> {
    const response = await apiClient.patch<Libro>(`/libros/${id}`, libro);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/libros/${id}`);
  },
};
