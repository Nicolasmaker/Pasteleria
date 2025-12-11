import { useState, useEffect } from 'react';
import { boletaService } from '../services/boleta.service';
import type { Boleta } from '../services/boleta.service';

export const useBoletas = () => {
  const [boletas, setBoletas] = useState<Boleta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBoletas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await boletaService.getAll();
      setBoletas(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar boletas');
      console.error('Error cargando boletas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBoletas();
  }, []);

  return {
    boletas,
    isLoading,
    error,
    refresh: loadBoletas,
  };
};

export const useBoleta = (id: string) => {
  const [boleta, setBoleta] = useState<Boleta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBoleta = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await boletaService.getById(id);
        setBoleta(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar boleta');
        console.error('Error cargando boleta:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadBoleta();
    }
  }, [id]);

  return {
    boleta,
    isLoading,
    error,
  };
};

export const useUserBoletas = (userId: string) => {
  const [boletas, setBoletas] = useState<Boleta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBoletas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await boletaService.getByUserId(userId);
      setBoletas(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar boletas del usuario');
      console.error('Error cargando boletas del usuario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadBoletas();
    }
  }, [userId]);

  return {
    boletas,
    isLoading,
    error,
    refresh: loadBoletas,
  };
};
