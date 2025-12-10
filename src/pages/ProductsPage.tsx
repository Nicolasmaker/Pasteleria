import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { CakeCard } from '../components/molecules/CakeCard';
import { useCakes } from '../context/CakeContext';

export const ProductsPage: React.FC = () => {
  const { cakes, searchQuery } = useCakes();

  const filteredCakes = cakes.filter(cake => 
    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cake.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>
          Nuestros Productos
        </h1>
        
        {filteredCakes.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No se encontraron productos que coincidan con tu búsqueda.</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredCakes.map(cake => (
              <CakeCard 
                key={cake.id} 
                cake={cake} 
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
