import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';

export const CustomerRegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.phone || !formData.address) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const success = register(formData);
    if (success) {
      alert('Registro exitoso. Por favor inicia sesión.');
      if (onSuccess) onSuccess();
    } else {
      setError('El correo ya está registrado');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Registro de Cliente</h2>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormField 
          label="Nombres" 
          name="name"
          value={formData.name} 
          onChange={handleChange} 
        />
        <FormField 
          label="Apellidos" 
          name="lastName"
          value={formData.lastName} 
          onChange={handleChange} 
        />
      </div>

      <FormField 
        label="Teléfono Chileno (+569...)" 
        name="phone"
        value={formData.phone} 
        onChange={handleChange} 
        placeholder="+56 9 1234 5678"
      />

      <FormField 
        label="Dirección de Despacho" 
        name="address"
        value={formData.address} 
        onChange={handleChange} 
      />

      <FormField 
        label="Correo Electrónico" 
        type="email"
        name="email"
        value={formData.email} 
        onChange={handleChange} 
      />

      <FormField 
        label="Contraseña" 
        type="password" 
        name="password"
        value={formData.password} 
        onChange={handleChange} 
      />

      <Button label="Registrarse" type="submit" style={{ marginTop: '1rem' }} />
    </form>
  );
};
