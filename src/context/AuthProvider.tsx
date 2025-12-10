import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario de sesión si existe (simulado)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const login = (username: string, pass: string) => {
    // 1. Admin hardcodeado
    if (username === 'admin' && pass === '123456') {
      const adminUser: User = { name: 'Admin', role: 'ADMIN' };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      localStorage.setItem('token', 'mock-jwt-token-admin'); // Simular token para API
      return true;
    }

    try {
      // 2. Buscar en usuarios registrados (localStorage)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === username && u.password === pass);

      if (foundUser) {
        const { password, ...userWithoutPass } = foundUser;
        setUser({ ...userWithoutPass, role: 'CUSTOMER' });
        localStorage.setItem('currentUser', JSON.stringify({ ...userWithoutPass, role: 'CUSTOMER' }));
        localStorage.setItem('token', 'mock-jwt-token-customer'); // Simular token para API
        return true;
      }
    } catch (error) {
      console.error('Error reading users:', error);
      return false;
    }

    console.log('Credenciales inválidas');
    return false;
  };

  const register = (userData: any) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si ya existe
      if (users.some((u: any) => u.email === userData.email)) {
        return false; // Ya existe
      }

      const newUser = { ...userData, role: 'CUSTOMER' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login después de registro? O pedir login.
      // Vamos a pedir login para seguir el flujo normal, o podríamos loguearlo directo.
      // Por ahora solo retornamos true.
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
