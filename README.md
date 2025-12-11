# Pastelería Los Sabores

Proyecto de pasteleria, para prueba final de full stack.
Desarrollado con Node.js, TypeScript y Vite.

## Requisitos

- Node.js instalado.
- Backend corriendo en `http://localhost:3000`

## Instalación

```bash
npm install
```

### Variables de Entorno (Opcional)

Para configurar la URL del backend, copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` y ajusta la URL del backend si es diferente a `http://localhost:3000/api/v1`.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Construcción

Para compilar el proyecto para producción:

```bash
npm run build
```

## Conexión con Backend

El frontend está conectado al backend que corre en:
- **URL Base:** `http://localhost:3000/api/v1`
- **Autenticación:** JWT Bearer Token (automático)
- **CORS:** Configurado para desarrollo
- **Content-Type:** `application/json`

### 🔐 Características de Seguridad

- **Interceptor de Request:** Añade automáticamente el token JWT a todas las peticiones
- **Interceptor de Response:** Maneja errores 401 y redirige al login automáticamente
- **Token Storage:** El token se guarda en `localStorage` tras login/registro exitoso
- **Auto-logout:** Si el token expira o es inválido, se limpia la sesión automáticamente

### 📁 Estructura de Tipos

Todos los tipos TypeScript están centralizados en `src/types/index.ts`:
- `User`, `LoginRequest`, `RegisterRequest`, `LoginResponse`
- `Producto`, `CreateProductRequest`, `UpdateProductRequest`
- `Categoria`, `CreateCategoryRequest`, `UpdateCategoryRequest`
- `Boleta`, `BoletaProducto`, `CreateBoletaRequest`, `UpdateBoletaRequest`
- `CreateUserRequest`, `UpdateUserRequest`

### Servicios Disponibles

#### 🔐 Autenticación (`auth.service.ts`)
- `login(credentials)` - POST `/auth/login`
- `register(userData)` - POST `/auth/register`

#### 🍰 Productos (`product.service.ts`)
- `getAll()` - GET `/productos` (público)
- `getById(id)` - GET `/productos/:id` (público)
- `getByCategory(categoriaId)` - GET `/productos/categoria/:categoriaId` (público)
- `create(data)` - POST `/productos` (admin)
- `update(id, data)` - PATCH `/productos/:id` (admin)
- `delete(id)` - DELETE `/productos/:id` (admin)

#### 📁 Categorías (`category.service.ts`)
- `getAll()` - GET `/categorias` (público)
- `getById(id)` - GET `/categorias/:id` (público)
- `create(data)` - POST `/categorias` (admin)
- `update(id, data)` - PATCH `/categorias/:id` (admin)
- `delete(id)` - DELETE `/categorias/:id` (admin)

#### 🧾 Boletas (`boleta.service.ts`)
- `getAll()` - GET `/boletas` (admin/vendedor)
- `getById(id)` - GET `/boletas/:id` (autenticado)
- `getByUserId(userId)` - GET `/boletas/usuario/:userId` (autenticado)
- `create(data)` - POST `/boletas` (autenticado)
- `update(id, data)` - PATCH `/boletas/:id` (admin/vendedor)
- `delete(id)` - DELETE `/boletas/:id` (admin)

#### 👥 Usuarios (`user.service.ts`)
- `getAll()` - GET `/users` (autenticado)
- `getById(id)` - GET `/users/:id` (autenticado)
- `create(data)` - POST `/users` (admin)
- `update(id, data)` - PATCH `/users/:id` (autenticado)
- `delete(id)` - DELETE `/users/:id` (admin)

### Hooks Personalizados

- `useAuth()` - Manejo de autenticación
- `useProducts()` - Cargar todos los productos
- `useProduct(id)` - Cargar un producto específico
- `useProductsByCategory(categoryId)` - Productos por categoría
- `useCategories()` - Cargar categorías
- `useBoletas()` - Cargar boletas (admin/vendedor)
- `useUserBoletas(userId)` - Boletas de un usuario

### Componentes Principales

- `LoginForm` - Formulario de inicio de sesión
- `CustomerRegisterForm` - Registro de clientes
- `ProductManager` - Gestión de productos (CRUD)
- `CreateProductForm` - Crear nuevos productos
- `CategoryManager` - Gestión de categorías
- `BoletaList` - Listado de boletas
- `CheckoutButton` - Finalizar compra

### Roles de Usuario

- **admin** - Acceso completo (CRUD productos, categorías, usuarios, boletas)
- **vendedor** - Gestión de boletas
- **cliente** - Compras y visualización de productos

## 🧪 Pruebas de Conexión

### 1. Verificar Backend

Asegúrate de que tu backend esté corriendo:
```bash
curl http://localhost:3000/api/v1/productos
```

### 2. Credenciales de Prueba

Si tu backend tiene datos de prueba, usa:
- **Admin:** `username: admin`, `password: 123456`
- **Cliente:** Regístrate desde la aplicación

### 3. Probar Endpoints

Revisa `src/services/ejemplos-uso.ts` para ver ejemplos de uso de cada servicio.

## 📂 Estructura de Archivos

```
src/
├── config/              # Configuración (API config)
├── types/               # Tipos TypeScript centralizados
├── services/            # Servicios del backend
│   ├── api.ts          # Cliente Axios con interceptores
│   ├── auth.service.ts
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── boleta.service.ts
│   ├── user.service.ts
│   ├── index.ts        # Exportaciones centralizadas
│   └── ejemplos-uso.ts # Guía de uso
├── hooks/               # Hooks personalizados
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useCategories.ts
│   └── useBoletas.ts
├── context/             # Contextos React
│   ├── AuthContext/Provider
│   ├── CakeContext
│   └── CartContext
└── components/          # Componentes React
    └── organisms/
        ├── ProductManager.tsx
        ├── CreateProductForm.tsx
        ├── CategoryManager.tsx
        ├── BoletaList.tsx
        └── CheckoutButton.tsx
```

## 🐛 Troubleshooting

### Error de CORS
Si recibes errores de CORS, verifica que tu backend tenga configurado:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Error 401 (No autorizado)
- Verifica que el token esté en localStorage
- Revisa que el token no haya expirado
- Asegúrate de estar enviando el header `Authorization: Bearer <token>`

### Backend no responde
- Verifica que el backend esté corriendo en puerto 3000
- Revisa la consola del backend para ver errores
- Usa herramientas como Postman para probar los endpoints directamente
