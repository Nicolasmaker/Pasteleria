import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { useCart } from '../context/CartContext';
import { Button } from '../components/atoms/Button';
import { formatCurrency } from '../utils/formatters';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <MainLayout>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>
          Tu Carrito de Compras
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-primary">
              Ver Productos
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '1.5rem', 
                  borderBottom: '1px solid #eee',
                  gap: '1.5rem'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ minWidth: '100px', textAlign: 'right', fontWeight: 'bold' }}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', fontSize: '1.2rem' }}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div style={{ 
              backgroundColor: 'var(--color-white)', 
              padding: '2rem', 
              borderRadius: 'var(--radius-md)', 
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '1.2rem' }}>
                <span>Total:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{formatCurrency(total)}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button 
                  label="Vaciar Carrito" 
                  onClick={clearCart}
                  style={{ backgroundColor: '#999', fontSize: '0.9rem' }}
                />
                <Button 
                  label="Finalizar Compra" 
                  onClick={() => alert('¡Gracias por tu compra! Esta funcionalidad estará disponible pronto.')}
                  style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
