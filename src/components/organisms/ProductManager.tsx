import React, { useState, useEffect } from 'react';
import { productService } from '../../services/product.service';
import type { Product } from '../../services/product.service';
import { useAuth } from '../../hooks/useAuth';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { user } = useAuth();

  // Verificar si el usuario es admin
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden eliminar productos');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await productService.delete(id);
      await loadProducts();
      alert('Producto eliminado exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al eliminar producto');
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden actualizar productos');
      return;
    }

    try {
      await productService.update(id, data);
      await loadProducts();
      setEditingProduct(null);
      alert('Producto actualizado exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar producto');
    }
  };

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Productos</h2>
      {!isAdmin && (
        <div style={{ color: 'orange', marginBottom: '1rem' }}>
          ⚠️ Vista de solo lectura. Solo los administradores pueden editar productos.
        </div>
      )}
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '1rem', 
              borderRadius: '8px',
              opacity: product.disponible ? 1 : 0.5
            }}
          >
            {editingProduct?.id === product.id ? (
              <ProductEditForm 
                product={product} 
                onSave={(data) => handleUpdate(product.id, data)}
                onCancel={() => setEditingProduct(null)}
              />
            ) : (
              <>
                <h3>{product.nombre}</h3>
                <p>{product.descripcion}</p>
                <p><strong>Precio:</strong> ${product.precio.toLocaleString('es-CL')}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Categoría:</strong> {product.categoria?.nombre || 'N/A'}</p>
                <p><strong>Disponible:</strong> {product.disponible ? '✅ Sí' : '❌ No'}</p>
                {product.imagen && (
                  <img src={product.imagen} alt={product.nombre} style={{ maxWidth: '200px', marginTop: '0.5rem' }} />
                )}
                
                {isAdmin && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setEditingProduct(product)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background 0.2s',
                        fontSize: '0.9rem'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#007bff'}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background 0.2s',
                        fontSize: '0.9rem'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#c82333'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#dc3545'}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProductEditFormProps {
  product: Product;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: product.nombre,
    descripcion: product.descripcion,
    precio: product.precio,
    stock: product.stock,
    disponible: product.disponible,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Nombre"
      />
      <textarea
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        placeholder="Descripción"
      />
      <input
        type="number"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
        placeholder="Precio"
      />
      <input
        type="number"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
        placeholder="Stock"
      />
      <label>
        <input
          type="checkbox"
          checked={formData.disponible}
          onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
        />
        Disponible
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button 
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}
        >
          ✔️ Guardar
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          style={{
            padding: '0.5rem 1rem',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}
        >
          ❌ Cancelar
        </button>
      </div>
    </form>
  );
};
