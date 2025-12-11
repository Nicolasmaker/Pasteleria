import React from 'react';
import { useBoletas, useUserBoletas } from '../../hooks/useBoletas';
import { boletaService } from '../../services/boleta.service';
import { useAuth } from '../../hooks/useAuth';

export const BoletaList: React.FC = () => {
  const { user } = useAuth();
  const isAdminOrVendedor = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'vendedor';
  
  // Admin/Vendedor ven todas las boletas
  const { boletas: allBoletas, isLoading: loadingAll, error: errorAll, refresh: refreshAll } = 
    isAdminOrVendedor ? useBoletas() : { boletas: [], isLoading: false, error: null, refresh: () => {} };
  
  // Cliente ve solo sus boletas
  const { boletas: userBoletas, isLoading: loadingUser, error: errorUser, refresh: refreshUser } = 
    user && !isAdminOrVendedor ? useUserBoletas(user.id) : { boletas: [], isLoading: false, error: null, refresh: () => {} };

  const boletas = isAdminOrVendedor ? allBoletas : userBoletas;
  const isLoading = isAdminOrVendedor ? loadingAll : loadingUser;
  const error = isAdminOrVendedor ? errorAll : errorUser;
  const refresh = isAdminOrVendedor ? refreshAll : refreshUser;

  console.log('📋 BoletaList estado:', { 
    isAdminOrVendedor, 
    userRole: user?.role,
    boletasCount: boletas.length,
    isLoading,
    error,
    boletas 
  });

  const handleUpdateEstado = async (id: string, estado: 'pendiente' | 'pagado' | 'cancelado') => {
    if (!isAdminOrVendedor) {
      alert('Solo administradores y vendedores pueden actualizar el estado');
      return;
    }

    try {
      await boletaService.update(id, { estado });
      await refresh();
      alert('Estado actualizado exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (user?.role?.toLowerCase() !== 'admin') {
      alert('Solo administradores pueden eliminar boletas');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar esta boleta?')) {
      return;
    }

    try {
      await boletaService.delete(id);
      await refresh();
      alert('Boleta eliminada exitosamente');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al eliminar boleta');
    }
  };

  if (isLoading) return <div>Cargando boletas...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isAdminOrVendedor ? 'Todas las Boletas' : 'Mis Boletas'}</h2>
      
      {boletas.length === 0 ? (
        <p>No hay boletas disponibles</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {boletas.map((boleta) => (
            <div 
              key={boleta.id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '1rem', 
                borderRadius: '8px',
                background: boleta.estado === 'pagado' ? '#d4edda' : 
                           boleta.estado === 'cancelado' ? '#f8d7da' : '#fff3cd'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Boleta #{boleta.id.slice(0, 8)}</h3>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  background: boleta.estado === 'pagado' ? '#28a745' : 
                             boleta.estado === 'cancelado' ? '#dc3545' : '#ffc107',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>
                  {boleta.estado.toUpperCase()}
                </span>
              </div>

              {isAdminOrVendedor && boleta.user && (
                <p><strong>Cliente:</strong> {boleta.user.fullName} ({boleta.user.email})</p>
              )}

              <h4>Productos:</h4>
              <ul>
                {boleta.productos.map((prod, index) => (
                  <li key={index}>
                    {prod.nombre} - Cantidad: {prod.cantidad} - ${prod.precio.toLocaleString('es-CL')} c/u
                  </li>
                ))}
              </ul>

              <p><strong>Total:</strong> ${boleta.total.toLocaleString('es-CL')}</p>
              {boleta.observaciones && (
                <p><strong>Observaciones:</strong> {boleta.observaciones}</p>
              )}
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Creada: {new Date(boleta.createdAt).toLocaleString('es-CL')}
              </p>

              {isAdminOrVendedor && boleta.estado !== 'cancelado' && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  {boleta.estado === 'pendiente' && (
                    <>
                      <button 
                        onClick={() => handleUpdateEstado(boleta.id, 'pagado')}
                        style={{ background: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Marcar como Pagado
                      </button>
                      <button 
                        onClick={() => handleUpdateEstado(boleta.id, 'cancelado')}
                        style={{ background: '#ffc107', color: 'black', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {boleta.estado === 'pagado' && (
                    <button 
                      onClick={() => handleUpdateEstado(boleta.id, 'pendiente')}
                      style={{ background: '#6c757d', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Marcar como Pendiente
                    </button>
                  )}
                </div>
              )}

              {user?.role?.toLowerCase() === 'admin' && (
                <button 
                  onClick={() => handleDelete(boleta.id)}
                  style={{ marginTop: '0.5rem', background: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Eliminar Boleta
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
