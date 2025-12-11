// Tipos TypeScript centralizados del Backend

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'vendedor' | 'cliente';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number | string; // El backend puede devolver string o number
  stock: number;
  imagen?: string;
  categoriaId: string;
  categoria: Categoria;
  disponible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BoletaProducto {
  productoId: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Boleta {
  id: string;
  userId: string;
  user: User;
  productos: BoletaProducto[];
  total: number;
  estado: 'pendiente' | 'pagado' | 'cancelado';
  observaciones?: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  token: string;
  user: User;
}

// Tipos de Request
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface CreateProductRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;
  imagen?: string;
  categoriaId: string;
  disponible?: boolean;
}

export interface UpdateProductRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  imagen?: string;
  categoriaId?: string;
  disponible?: boolean;
}

export interface CreateCategoryRequest {
  nombre: string;
  descripcion?: string;
}

export interface UpdateCategoryRequest {
  nombre?: string;
  descripcion?: string;
}

export interface CreateBoletaRequest {
  userId: string;
  productos: BoletaProducto[];
  total: number;
  observaciones?: string;
}

export interface UpdateBoletaRequest {
  estado?: 'pendiente' | 'pagado' | 'cancelado';
  observaciones?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  fullName: string;
  role?: 'admin' | 'vendedor' | 'cliente';
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  password?: string;
}
