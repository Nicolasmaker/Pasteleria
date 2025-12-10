import { createContext } from 'react';

export interface User {
  name: string; // Nombres
  lastName?: string; // Apellidos
  phone?: string; // Telefono
  email?: string; // Correo (used as username for customers)
  address?: string; // Direccion
  role: 'ADMIN' | 'CUSTOMER';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => boolean;
  register: (userData: any) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
