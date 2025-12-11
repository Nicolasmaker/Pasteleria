import { useState, useEffect } from 'react';
import { categoryService } from '../services/category.service';
import type { Category } from '../services/category.service';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar categorías');
      console.error('Error cargando categorías:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refresh: loadCategories,
  };
};

export const useCategory = (id: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await categoryService.getById(id);
        setCategory(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar categoría');
        console.error('Error cargando categoría:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id]);

  return {
    category,
    isLoading,
    error,
  };
};
