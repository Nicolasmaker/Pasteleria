import React, { useState, useEffect } from 'react';
import { productService } from '../../services/product.service';
import { categoryService } from '../../services/category.service';
import type { CreateProductRequest } from '../../services/product.service';
import type { Category } from '../../services/category.service';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface CreateProductFormProps {
  onSuccess?: () => void;
}

export const CreateProductForm: React.FC<CreateProductFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<CreateProductRequest>({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: '',
    categoriaId: '',
    disponible: true,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si el usuario es admin
  useEffect(() => {
    if (user?.role?.toLowerCase() !== 'admin') {
      alert('Solo los administradores pueden crear productos');
      navigate('/');
    }
  }, [user, navigate]);

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.nombre || !formData.descripcion || !formData.categoriaId) {
      setError('Nombre, descripción y categoría son obligatorios');
      return;
    }

    if (formData.precio <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    try {
      setIsLoading(true);
      await productService.create(formData);
      alert('Producto creado exitosamente');
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagen: '',
        categoriaId: '',
        disponible: true,
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Crear Nuevo Producto</h2>
      
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

      <div>
        <label>Nombre del Producto *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Torta de Chocolate"
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label>Descripción *</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Describe el producto..."
          required
          rows={4}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label>Precio (CLP) *</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            min="0"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
      </div>

      <div>
        <label>Categoría *</label>
        <select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <small style={{ color: '#666' }}>
          * Necesitarás tener categorías creadas primero
        </small>
      </div>

      <div>
        <label>URL de la Imagen</label>
        <input
          type="url"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="disponible"
            checked={formData.disponible}
            onChange={handleChange}
          />
          Producto disponible para la venta
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          padding: '0.75rem', 
          background: 'var(--primary-color, #007bff)', 
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Creando...' : 'Crear Producto'}
      </button>
    </form>
  );
};
