import React, { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../services/product.service';
import type { Product } from '../services/product.service';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock?: number;
  disponible?: boolean;
  categoriaId?: string;
}

interface CakeContextType {
  cakes: Cake[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addCake: (cake: Omit<Cake, 'id'>) => void;
  deleteCake: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshProducts: () => Promise<void>;
  getProductsByCategory: (categoryId: string) => Promise<void>;
}

const CakeContext = createContext<CakeContextType | undefined>(undefined);

export const useCakes = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCakes must be used within a CakeProvider');
  }
  return context;
};

// Función para convertir Product del backend a Cake del frontend
const productToCake = (product: Product): Cake => {
  return {
    id: product.id,
    name: product.nombre,
    description: product.descripcion,
    price: typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio,
    image: product.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
    stock: product.stock,
    disponible: product.disponible,
    categoriaId: product.categoriaId,
  };
};

export const CakeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    refreshProducts();
  }, []);

  // Actualizar cakes cuando cambien los productos
  useEffect(() => {
    setCakes(products.map(productToCake));
  }, [products]);

  const refreshProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      console.error('Error cargando productos:', err);
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (categoryId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getByCategory(categoryId);
      setProducts(data);
    } catch (err: any) {
      console.error('Error cargando productos por categoría:', err);
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  // Mantener funciones legacy para compatibilidad (ahora podrían usar el backend)
  const addCake = (cake: Omit<Cake, 'id'>) => {
    // Esta función podría actualizar en el backend si el usuario es admin
    const newCake = { ...cake, id: Date.now().toString() };
    setCakes([...cakes, newCake]);
  };

  const deleteCake = (id: string) => {
    // Esta función podría eliminar del backend si el usuario es admin
    setCakes(prev => prev.filter(cake => cake.id !== id));
  };

  return (
    <CakeContext.Provider value={{ 
      cakes, 
      products,
      isLoading,
      error,
      addCake, 
      deleteCake, 
      searchQuery, 
      setSearchQuery,
      refreshProducts,
      getProductsByCategory
    }}>
      {children}
    </CakeContext.Provider>
  );
};
