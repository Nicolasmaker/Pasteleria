import React from 'react';
import type { Cake } from '../../context/CakeContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../atoms/Button';
import { formatCurrency } from '../../utils/formatters';

interface CakeCardProps {
  cake: Cake;
  onDelete?: (id: string) => void;
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake, onDelete }) => {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <img 
        src={cake.image} 
        alt={cake.name} 
        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '4px' }} 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/600x400?text=Pastel+No+Disponible';
        }}
      />
      <h3 style={{ margin: '0.5rem 0 0' }}>{cake.name}</h3>
      <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
        {formatCurrency(cake.price)}
      </p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>{cake.description}</p>
      
      {onDelete ? (
        <Button 
          label="Eliminar" 
          onClick={() => onDelete(cake.id)}
          style={{ backgroundColor: 'var(--color-error)', marginTop: 'auto' }}
        />
      ) : (
        <Button 
          label="Agregar al Carrito" 
          onClick={() => addToCart(cake)}
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)', marginTop: 'auto' }}
        />
      )}
    </div>
  );
};
