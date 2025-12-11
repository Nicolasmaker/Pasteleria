/**
 * Guía de Uso de los Servicios del Backend
 * 
 * Este archivo muestra ejemplos de cómo usar los servicios conectados al backend.
 * Todos los tipos están centralizados en src/types/index.ts
 */

import { authService, productService, categoryService, boletaService, userService } from '../services';

// ====================================
// 1. AUTENTICACIÓN
// ====================================

async function ejemploLogin() {
  try {
    const response = await authService.login({
      username: 'admin',
      password: '123456'
    });
    
    console.log('Token:', response.token);
    console.log('Usuario:', response.user);
    // El token se guarda automáticamente en localStorage
  } catch (error) {
    console.error('Error en login:', error);
  }
}

async function ejemploRegistro() {
  try {
    const response = await authService.register({
      email: 'nuevo@example.com',
      password: 'Password123',
      fullName: 'Nuevo Usuario'
    });
    
    console.log('Usuario registrado:', response.user);
    // Auto-login después del registro
  } catch (error) {
    console.error('Error en registro:', error);
  }
}

// ====================================
// 2. PRODUCTOS
// ====================================

async function ejemploProductos() {
  try {
    // Obtener todos los productos
    const productos = await productService.getAll();
    console.log('Productos:', productos);

    // Obtener un producto específico
    const producto = await productService.getById('uuid-del-producto');
    console.log('Producto:', producto);

    // Productos por categoría
    const productosPorCategoria = await productService.getByCategory('uuid-de-categoria');
    console.log('Productos de la categoría:', productosPorCategoria);

    // Crear producto (requiere ser admin)
    const nuevoProducto = await productService.create({
      nombre: 'Torta de Fresa',
      descripcion: 'Deliciosa torta de fresa con crema',
      precio: 25000,
      stock: 10,
      categoriaId: 'uuid-de-categoria',
      imagen: 'https://ejemplo.com/imagen.jpg',
      disponible: true
    });
    console.log('Producto creado:', nuevoProducto);

    // Actualizar producto (requiere ser admin)
    const productoActualizado = await productService.update('uuid-del-producto', {
      precio: 27000,
      stock: 15
    });
    console.log('Producto actualizado:', productoActualizado);

    // Eliminar producto (requiere ser admin)
    await productService.delete('uuid-del-producto');
    console.log('Producto eliminado');
  } catch (error) {
    console.error('Error con productos:', error);
  }
}

// ====================================
// 3. CATEGORÍAS
// ====================================

async function ejemploCategorias() {
  try {
    // Obtener todas las categorías
    const categorias = await categoryService.getAll();
    console.log('Categorías:', categorias);

    // Crear categoría (requiere ser admin)
    const nuevaCategoria = await categoryService.create({
      nombre: 'Pasteles',
      descripcion: 'Pasteles finos y delicados'
    });
    console.log('Categoría creada:', nuevaCategoria);

    // Actualizar categoría (requiere ser admin)
    await categoryService.update('uuid-de-categoria', {
      descripcion: 'Nueva descripción'
    });

    // Eliminar categoría (requiere ser admin)
    await categoryService.delete('uuid-de-categoria');
  } catch (error) {
    console.error('Error con categorías:', error);
  }
}

// ====================================
// 4. BOLETAS (ÓRDENES)
// ====================================

async function ejemploBoletas() {
  try {
    // Crear una boleta (requiere estar autenticado)
    const nuevaBoleta = await boletaService.create({
      userId: 'uuid-del-usuario',
      productos: [
        {
          productoId: 'uuid-producto-1',
          nombre: 'Torta de Chocolate',
          cantidad: 2,
          precio: 25000
        },
        {
          productoId: 'uuid-producto-2',
          nombre: 'Pastel de Fresa',
          cantidad: 1,
          precio: 15000
        }
      ],
      total: 65000,
      observaciones: 'Sin azúcar adicional'
    });
    console.log('Boleta creada:', nuevaBoleta);

    // Obtener boletas del usuario
    const boletasUsuario = await boletaService.getByUserId('uuid-del-usuario');
    console.log('Boletas del usuario:', boletasUsuario);

    // Obtener todas las boletas (requiere ser admin/vendedor)
    const todasLasBoletas = await boletaService.getAll();
    console.log('Todas las boletas:', todasLasBoletas);

    // Actualizar estado de boleta (requiere ser admin/vendedor)
    const boletaActualizada = await boletaService.update('uuid-de-boleta', {
      estado: 'pagado'
    });
    console.log('Boleta actualizada:', boletaActualizada);

    // Eliminar boleta (requiere ser admin)
    await boletaService.delete('uuid-de-boleta');
  } catch (error) {
    console.error('Error con boletas:', error);
  }
}

// ====================================
// 5. USUARIOS
// ====================================

async function ejemploUsuarios() {
  try {
    // Obtener todos los usuarios (requiere estar autenticado)
    const usuarios = await userService.getAll();
    console.log('Usuarios:', usuarios);

    // Obtener un usuario específico
    const usuario = await userService.getById('uuid-del-usuario');
    console.log('Usuario:', usuario);

    // Crear usuario (requiere ser admin)
    const nuevoUsuario = await userService.create({
      email: 'vendedor@example.com',
      password: 'Password123',
      fullName: 'Vendedor 1',
      role: 'vendedor'
    });
    console.log('Usuario creado:', nuevoUsuario);

    // Actualizar usuario (requiere estar autenticado)
    await userService.update('uuid-del-usuario', {
      fullName: 'Nuevo Nombre'
    });

    // Eliminar usuario (requiere ser admin)
    await userService.delete('uuid-del-usuario');
  } catch (error) {
    console.error('Error con usuarios:', error);
  }
}

// ====================================
// 6. USO CON HOOKS EN COMPONENTES
// ====================================

/*
// En tus componentes React, usa los hooks:

import { useProducts, useCategories, useBoletas } from '../hooks';
import { useAuth } from '../hooks/useAuth';

function MiComponente() {
  const { products, isLoading, error, refresh } = useProducts();
  const { categories } = useCategories();
  const { user, login, logout } = useAuth();
  
  // Los datos se cargan automáticamente
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.nombre}</div>
      ))}
    </div>
  );
}
*/

// ====================================
// 7. MANEJO DE ERRORES
// ====================================

async function manejoDeErrores() {
  try {
    const productos = await productService.getAll();
    console.log(productos);
  } catch (error: any) {
    // Los errores del backend vienen en error.response.data
    if (error.response) {
      console.error('Error del servidor:', error.response.data.message);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error:', error.message);
    }
  }
}

export {
  ejemploLogin,
  ejemploRegistro,
  ejemploProductos,
  ejemploCategorias,
  ejemploBoletas,
  ejemploUsuarios,
  manejoDeErrores
};
