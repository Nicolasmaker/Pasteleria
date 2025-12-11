import React, { useState } from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { ProductManager } from '../components/organisms/ProductManager';
import { CategoryManager } from '../components/organisms/CategoryManager';
import { BoletaList } from '../components/organisms/BoletaList';
import { CreateProductForm } from '../components/organisms/CreateProductForm';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'productos' | 'categorias' | 'boletas' | 'crear'>('productos');

  return (
    <MainLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem', textAlign: 'center' }}>
          Panel de Administración - Pastelería Los Sabores
        </h1>
        
        {/* Pestañas de navegación */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem', 
          borderBottom: '2px solid #ddd',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setActiveTab('productos')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'productos' ? '3px solid var(--primary-color)' : 'none',
              color: activeTab === 'productos' ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📦 Productos
          </button>
          <button 
            onClick={() => setActiveTab('crear')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'crear' ? '3px solid var(--primary-color)' : 'none',
              color: activeTab === 'crear' ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ➕ Crear Producto
          </button>
          <button 
            onClick={() => setActiveTab('categorias')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'categorias' ? '3px solid var(--primary-color)' : 'none',
              color: activeTab === 'categorias' ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📁 Categorías
          </button>
          <button 
            onClick={() => setActiveTab('boletas')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'boletas' ? '3px solid var(--primary-color)' : 'none',
              color: activeTab === 'boletas' ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🧾 Pedidos
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        <div>
          {activeTab === 'productos' && <ProductManager />}
          {activeTab === 'crear' && <CreateProductForm />}
          {activeTab === 'categorias' && <CategoryManager />}
          {activeTab === 'boletas' && <BoletaList />}
        </div>
      </div>
    </MainLayout>
  );
};
