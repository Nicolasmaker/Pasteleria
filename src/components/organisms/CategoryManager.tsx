import React, { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { categoryService } from '../../services/category.service';
import type { Category, CreateCategoryRequest } from '../../services/category.service';
import { useAuth } from '../../hooks/useAuth';

export const CategoryManager: React.FC = () => {
  const { categories, isLoading, error, refresh } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden eliminar categorías');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      return;
    }

    try {
      await categoryService.delete(id);
      await refresh();
      alert('Categoría eliminada exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al eliminar categoría');
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!isAdmin) {
      alert('Solo los administradores pueden actualizar categorías');
      return;
    }

    try {
      await categoryService.update(id, data);
      await refresh();
      setEditingCategory(null);
      alert('Categoría actualizada exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar categoría');
    }
  };

  if (isLoading) return <div>Cargando categorías...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Gestión de Categorías</h2>
        {isAdmin && (
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {showCreateForm ? 'Cancelar' : '+ Nueva Categoría'}
          </button>
        )}
      </div>

      {!isAdmin && (
        <div style={{ color: 'orange', marginBottom: '1rem' }}>
          ⚠️ Vista de solo lectura. Solo los administradores pueden editar categorías.
        </div>
      )}

      {showCreateForm && isAdmin && (
        <CreateCategoryForm 
          onSuccess={() => {
            refresh();
            setShowCreateForm(false);
          }}
        />
      )}

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {categories.map((category) => (
          <div 
            key={category.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '1rem', 
              borderRadius: '8px',
            }}
          >
            {editingCategory?.id === category.id ? (
              <CategoryEditForm 
                category={category} 
                onSave={(data) => handleUpdate(category.id, data)}
                onCancel={() => setEditingCategory(null)}
              />
            ) : (
              <>
                <h3>{category.nombre}</h3>
                <p>{category.descripcion || 'Sin descripción'}</p>
                
                {isAdmin && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setEditingCategory(category)}
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
                      onClick={() => handleDelete(category.id)} 
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

interface CreateCategoryFormProps {
  onSuccess?: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    nombre: '',
    descripcion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    try {
      setIsSubmitting(true);
      await categoryService.create(formData);
      alert('Categoría creada exitosamente');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al crear categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #28a745', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>Nueva Categoría</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          placeholder="Nombre de la categoría *"
          required
          style={{ padding: '0.5rem' }}
        />
        <textarea
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          placeholder="Descripción (opcional)"
          rows={3}
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isSubmitting ? 'Creando...' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
};

interface CategoryEditFormProps {
  category: Category;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: category.nombre,
    descripcion: category.descripcion || '',
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
        required
      />
      <textarea
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        placeholder="Descripción"
        rows={3}
      />
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
