import React, { createContext, useState, useContext, useEffect } from 'react';
import { boletaService } from '../services/boleta.service';
import type { CreateBoletaRequest } from '../services/boleta.service';

// Redefinimos la interfaz para evitar dependencias circulares
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (userId: string, observaciones?: string) => Promise<boolean>;
  loadUserCart: (userId: string | null) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Función para cargar el carrito de un usuario específico
  const loadUserCart = (userId: string | null) => {
    setCurrentUserId(userId);
    
    if (!userId) {
      // Si no hay usuario, limpiar el carrito
      setCartItems([]);
      return;
    }

    try {
      const cartKey = `cart_${userId}`;
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        const items = JSON.parse(savedCart);
        // Asegurar que los precios sean números
        const normalizedItems = items.map((item: CartItem) => ({
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          quantity: typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity
        }));
        setCartItems(normalizedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    }
  };

  // Escuchar eventos de login/logout
  useEffect(() => {
    const handleLogin = (event: any) => {
      const userId = event.detail?.userId;
      if (userId) {
        loadUserCart(userId);
      }
    };

    const handleLogout = () => {
      loadUserCart(null);
    };

    window.addEventListener('user-login', handleLogin);
    window.addEventListener('user-logout', handleLogout);

    return () => {
      window.removeEventListener('user-login', handleLogin);
      window.removeEventListener('user-logout', handleLogout);
    };
  }, []);

  // Guardar el carrito cuando cambie (asociado al usuario actual)
  useEffect(() => {
    if (currentUserId) {
      const cartKey = `cart_${currentUserId}`;
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUserId]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const currentItems = Array.isArray(prev) ? prev : [];
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      (Array.isArray(prev) ? prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ) : [])
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = async (userId: string, observaciones?: string): Promise<boolean> => {
    try {
      console.log('🛒 Iniciando checkout...', { userId, observaciones });
      
      if (safeCartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Convertir items del carrito al formato de boleta
      const productos = safeCartItems.map(item => ({
        productoId: item.id,
        nombre: item.name,
        cantidad: item.quantity,
        precio: item.price,
      }));

      const boletaData: CreateBoletaRequest = {
        userId,
        productos,
        total,
        observaciones,
      };

      console.log('📦 Datos de boleta a enviar:', boletaData);
      
      const response = await boletaService.create(boletaData);
      console.log('✅ Boleta creada exitosamente:', response);
      
      clearCart();
      return true;
    } catch (err: any) {
      console.error('❌ Error al crear boleta:', err);
      console.error('Detalles del error:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || 'Error al procesar la compra';
      alert(errorMessage);
      return false;
    }
  };

  // Safety check for reduce
  const safeCartItems = Array.isArray(cartItems) ? cartItems.filter(item => item && typeof item === 'object') : [];
  
  const total = safeCartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : (typeof item.price === 'string' ? parseFloat(item.price) : 0);
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + price * quantity;
  }, 0);
  
  const itemCount = safeCartItems.reduce((sum, item) => {
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems: safeCartItems, addToCart, removeFromCart, updateQuantity, clearCart, checkout, loadUserCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
