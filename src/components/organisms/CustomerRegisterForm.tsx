import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const CustomerRegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const success = await register(formData);
    if (success) {
      // El backend hace auto-login, así que redirigimos directamente
      navigate('/productos');
    } else {
      setError('Error en el registro. El correo podría estar ya registrado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Registro de Cliente</h2>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      
      <FormField 
        label="Nombre Completo" 
        name="fullName"
        value={formData.fullName} 
        onChange={handleChange}
        placeholder="Juan Pérez" 
      />

      <FormField 
        label="Correo Electrónico" 
        type="email"
        name="email"
        value={formData.email} 
        onChange={handleChange} 
      />

      <FormField 
        label="Contraseña (mínimo 6 caracteres)" 
        type="password" 
        name="password"
        value={formData.password} 
        onChange={handleChange} 
      />

      <Button label="Registrarse" type="submit" style={{ marginTop: '1rem' }} />
    </form>
  );
};
