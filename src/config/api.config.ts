/**
 * Configuración del Backend
 * 
 * Este archivo contiene la configuración de conexión al backend.
 * Puedes modificar estos valores según tu entorno.
 */

export const API_CONFIG = {
  // URL base del backend
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  
  // Timeout de peticiones (ms)
  TIMEOUT: 30000,
  
  // Keys de localStorage
  STORAGE_KEYS: {
    TOKEN: 'token',
    USER: 'currentUser',
    CART: 'cart',
  },
  
  // URLs de redirección
  REDIRECT_URLS: {
    LOGIN: '/login',
    AFTER_LOGIN: '/dashboard',
    AFTER_REGISTER: '/',
    UNAUTHORIZED: '/login',
  },
};

/**
 * Para usar variables de entorno, crea un archivo .env en la raíz:
 * 
 * VITE_API_URL=http://localhost:3000/api/v1
 * 
 * En producción:
 * VITE_API_URL=https://tu-api.com/api/v1
 */
