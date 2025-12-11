import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const CheckoutButton: React.FC = () => {
  const { checkout, total, itemCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [observaciones, setObservaciones] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      alert('Debes iniciar sesión para realizar la compra');
      navigate('/login');
      return;
    }

    if (itemCount === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!window.confirm(`¿Confirmar compra por $${total.toLocaleString('es-CL')}?`)) {
      return;
    }

    console.log('🛍️ Usuario realizando compra:', user);

    try {
      setIsProcessing(true);
      const success = await checkout(user.id, observaciones || undefined);
      
      if (success) {
        alert('¡Compra realizada exitosamente! Puedes ver tu pedido en "Mis Pedidos".');
        setObservaciones('');
        navigate('/mis-pedidos');
      }
    } catch (err) {
      console.error('Error en checkout:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="observaciones" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Observaciones (opcional):
        </label>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Ej: Sin azúcar, entrega a las 3pm, etc."
          rows={3}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>

      <button
        onClick={handleCheckout}
        disabled={isProcessing || itemCount === 0}
        style={{
          width: '100%',
          padding: '1rem',
          background: itemCount === 0 ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: itemCount === 0 ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        {isProcessing ? 'Procesando...' : `Finalizar Compra - $${total.toLocaleString('es-CL')}`}
      </button>
    </div>
  );
};
