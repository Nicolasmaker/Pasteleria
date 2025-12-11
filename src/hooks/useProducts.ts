import { useState, useEffect } from 'react';
import { productService } from '../services/product.service';
import type { Product } from '../services/product.service';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
      console.error('Error cargando productos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    refresh: loadProducts,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar producto');
        console.error('Error cargando producto:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  return {
    product,
    isLoading,
    error,
  };
};

export const useProductsByCategory = (categoryId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getByCategory(categoryId);
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
      console.error('Error cargando productos por categoría:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      loadProducts();
    }
  }, [categoryId]);

  return {
    products,
    isLoading,
    error,
    refresh: loadProducts,
  };
};
