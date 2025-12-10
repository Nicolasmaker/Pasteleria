import React from 'react';
import { AuthLayout } from '../components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="auth-container">
        <div className="card">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h1>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};
