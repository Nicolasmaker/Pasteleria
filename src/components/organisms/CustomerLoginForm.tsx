import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';

export const CustomerLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/'); // Redirigir al home o dashboard de cliente
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Iniciar Sesión Cliente</h2>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      <FormField 
        label="Correo Electrónico" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <FormField 
        label="Contraseña" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button label="Ingresar" type="submit" style={{ marginTop: '1rem' }} />
    </form>
  );
};
