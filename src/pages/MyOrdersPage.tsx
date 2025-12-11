import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { useUserBoletas } from '../hooks/useBoletas';
import { Navigate } from 'react-router-dom';

export const MyOrdersPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { boletas, isLoading, error } = user ? useUserBoletas(user.id) : { boletas: [], isLoading: false, error: null };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Mis Pedidos</h1>

        {isLoading && <div>Cargando pedidos...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {!isLoading && !error && boletas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>No tienes pedidos aún</h3>
            <p style={{ color: '#666', marginTop: '1rem' }}>
              Explora nuestros productos y realiza tu primer pedido
            </p>
            <a href="/productos" style={{ 
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--primary-color)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              Ver Productos
            </a>
          </div>
        )}

        {!isLoading && boletas.length > 0 && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {boletas.map((boleta) => (
              <div 
                key={boleta.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Pedido #{boleta.id.slice(0, 8).toUpperCase()}</h3>
                    <p style={{ margin: '0.5rem 0 0', color: '#666', fontSize: '0.9rem' }}>
                      {new Date(boleta.createdAt).toLocaleDateString('es-CL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px',
                    background: boleta.estado === 'pagado' ? '#d4edda' : 
                               boleta.estado === 'cancelado' ? '#f8d7da' : '#fff3cd',
                    color: boleta.estado === 'pagado' ? '#155724' : 
                           boleta.estado === 'cancelado' ? '#721c24' : '#856404',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase'
                  }}>
                    {boleta.estado}
                  </span>
                </div>

                <h4 style={{ marginBottom: '0.75rem' }}>Productos:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {boleta.productos.map((prod, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '0.5rem 0',
                      borderBottom: index < boleta.productos.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <span>
                        <strong>{prod.nombre}</strong> x {prod.cantidad}
                      </span>
                      <span>${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</span>
                    </li>
                  ))}
                </ul>

                {boleta.observaciones && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px' }}>
                    <strong>Observaciones:</strong> {boleta.observaciones}
                  </div>
                )}

                <div style={{ 
                  marginTop: '1rem', 
                  paddingTop: '1rem', 
                  borderTop: '2px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <strong style={{ fontSize: '1.25rem' }}>Total:</strong>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                    ${boleta.total.toLocaleString('es-CL')}
                  </strong>
                </div>

                {boleta.estado === 'pendiente' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px', fontSize: '0.9rem' }}>
                    ⏳ Tu pedido está siendo procesado. Te contactaremos pronto para coordinar la entrega.
                  </div>
                )}

                {boleta.estado === 'pagado' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#d4edda', borderRadius: '4px', fontSize: '0.9rem' }}>
                    ✅ Pedido confirmado y pagado. ¡Gracias por tu compra!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
