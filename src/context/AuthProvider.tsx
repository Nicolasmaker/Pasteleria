import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from './AuthContext';
import { authService } from '../services/auth.service';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // NO cargar automáticamente desde localStorage
  // El usuario debe hacer login explícitamente cada vez

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login({ username, password });
      
      // Guardar token y usuario
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setUser(response.user);
      
      // Disparar evento personalizado para que CartContext cargue el carrito del usuario
      window.dispatchEvent(new CustomEvent('user-login', { detail: { userId: response.user.id } }));
      
      return true;
    } catch (error: any) {
      console.error('Error en login:', error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; fullName: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      // Auto-login después del registro
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setUser(response.user);
      
      // Disparar evento personalizado
      window.dispatchEvent(new CustomEvent('user-login', { detail: { userId: response.user.id } }));
      
      return true;
    } catch (error: any) {
      console.error('Error en registro:', error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
    // Disparar evento personalizado para limpiar el carrito
    window.dispatchEvent(new CustomEvent('user-logout'));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
