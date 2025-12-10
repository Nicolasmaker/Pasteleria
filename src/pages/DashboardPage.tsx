import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { CakeForm } from '../components/organisms/CakeForm';
import { CakeCard } from '../components/molecules/CakeCard';
import { useCakes } from '../context/CakeContext';

export const DashboardPage: React.FC = () => {
  const { cakes, deleteCake } = useCakes();

  return (
    <MainLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem', textAlign: 'center' }}>
          Panel de Administración - Pastelería Los Sabores
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          {/* Columna Izquierda: Formulario */}
          <div>
            <CakeForm />
          </div>

          {/* Columna Derecha: Lista de Pasteles */}
          <div>
            <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Inventario de Pasteles</h2>
            {cakes.length === 0 ? (
              <p>No hay pasteles registrados aún.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {cakes.map(cake => (
                  <CakeCard 
                    key={cake.id} 
                    cake={cake} 
                    onDelete={deleteCake}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
