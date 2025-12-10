import React, { useState } from 'react';
import { useCakes } from '../../context/CakeContext';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export const CakeForm: React.FC = () => {
  const { addCake } = useCakes();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    addCake({
      name,
      description,
      price: Number(price),
      image: image || 'https://placehold.co/300x200/e0e0e0/333333?text=Sin+Imagen'
    });

    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <div className="card">
      <h2>Agregar Nuevo Pastel</h2>
      <form onSubmit={handleSubmit}>
        <FormField 
          label="Nombre del Pastel" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Ej. Pastel de Zanahoria"
          required
        />
        <FormField 
          label="Descripción" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Breve descripción..."
        />
        <FormField 
          label="Precio ($)" 
          type="number"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="0.00"
          required
        />
        <FormField 
          label="URL de la Imagen" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          placeholder="https://..."
        />
        <Button label="Guardar Pastel" type="submit" style={{ width: '100%' }} />
      </form>
    </div>
  );
};
