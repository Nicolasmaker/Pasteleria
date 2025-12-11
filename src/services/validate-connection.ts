/**
 * Script de Validación de Conexión al Backend
 * 
 * Este script verifica que el backend esté disponible y funcionando correctamente.
 * Ejecuta desde la consola del navegador o crea un componente de diagnóstico.
 */

import api from './api';

export async function validateBackendConnection() {
  const results = {
    backendAvailable: false,
    authEndpoint: false,
    productosEndpoint: false,
    categoriasEndpoint: false,
    errors: [] as string[],
  };

  console.log('🔍 Validando conexión al backend...\n');

  // 1. Verificar que el backend esté disponible
  try {
    await api.get('/productos');
    results.backendAvailable = true;
    results.productosEndpoint = true;
    console.log('✅ Backend disponible en', api.defaults.baseURL);
  } catch (error: any) {
    results.backendAvailable = false;
    const errorMsg = error.message || 'Backend no disponible';
    results.errors.push(errorMsg);
    console.error('❌ Backend no disponible:', errorMsg);
    return results;
  }

  // 2. Verificar endpoint de categorías
  try {
    await api.get('/categorias');
    results.categoriasEndpoint = true;
    console.log('✅ Endpoint /categorias funcional');
  } catch (error: any) {
    results.errors.push('Endpoint /categorias no disponible');
    console.error('❌ Endpoint /categorias falló:', error.message);
  }

  // 3. Verificar endpoint de autenticación (debe dar 401 o similar, es normal)
  try {
    await api.post('/auth/login', { username: 'test', password: 'test' });
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 400) {
      results.authEndpoint = true;
      console.log('✅ Endpoint /auth/login funcional (responde correctamente)');
    } else {
      results.errors.push('Endpoint /auth/login tiene problemas');
      console.error('⚠️ Endpoint /auth/login:', error.message);
    }
  }

  // Resumen
  console.log('\n📊 Resumen de validación:');
  console.log('Backend disponible:', results.backendAvailable ? '✅' : '❌');
  console.log('Endpoint /productos:', results.productosEndpoint ? '✅' : '❌');
  console.log('Endpoint /categorias:', results.categoriasEndpoint ? '✅' : '❌');
  console.log('Endpoint /auth:', results.authEndpoint ? '✅' : '❌');
  
  if (results.errors.length > 0) {
    console.log('\n⚠️ Errores encontrados:');
    results.errors.forEach(err => console.log('  -', err));
  } else {
    console.log('\n🎉 Todas las validaciones pasaron correctamente!');
  }

  return results;
}

/**
 * Validar credenciales de prueba
 */
export async function testLogin(username: string, password: string) {
  try {
    console.log(`🔐 Probando login con: ${username}`);
    const response = await api.post('/auth/login', { username, password });
    console.log('✅ Login exitoso!');
    console.log('Usuario:', response.data.user);
    console.log('Token recibido:', response.data.token ? 'Sí' : 'No');
    return true;
  } catch (error: any) {
    console.error('❌ Login falló:', error.response?.data?.message || error.message);
    return false;
  }
}

/**
 * Probar obtención de productos
 */
export async function testGetProducts() {
  try {
    console.log('🍰 Obteniendo productos...');
    const response = await api.get('/productos');
    console.log(`✅ Se obtuvieron ${response.data.length} productos`);
    if (response.data.length > 0) {
      console.log('Primer producto:', response.data[0]);
    }
    return response.data;
  } catch (error: any) {
    console.error('❌ Error obteniendo productos:', error.message);
    return [];
  }
}

/**
 * Probar obtención de categorías
 */
export async function testGetCategories() {
  try {
    console.log('📁 Obteniendo categorías...');
    const response = await api.get('/categorias');
    console.log(`✅ Se obtuvieron ${response.data.length} categorías`);
    if (response.data.length > 0) {
      console.log('Primera categoría:', response.data[0]);
    }
    return response.data;
  } catch (error: any) {
    console.error('❌ Error obteniendo categorías:', error.message);
    return [];
  }
}

// Para usar en la consola del navegador:
if (typeof window !== 'undefined') {
  (window as any).validateBackend = validateBackendConnection;
  (window as any).testLogin = testLogin;
  (window as any).testGetProducts = testGetProducts;
  (window as any).testGetCategories = testGetCategories;
  
  console.log('💡 Funciones de validación disponibles:');
  console.log('  - validateBackend()');
  console.log('  - testLogin(username, password)');
  console.log('  - testGetProducts()');
  console.log('  - testGetCategories()');
}
