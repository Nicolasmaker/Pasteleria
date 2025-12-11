import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { CustomerLoginForm } from '../components/organisms/CustomerLoginForm';
import { CustomerRegisterForm } from '../components/organisms/CustomerRegisterForm';

export const CustomerAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MainLayout>
      <div style={{ 
        maxWidth: '600px', 
        margin: '2rem auto', 
        padding: '2rem', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'none',
              borderBottom: isLogin ? '2px solid var(--primary-color)' : '2px solid transparent',
              color: isLogin ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'none',
              borderBottom: !isLogin ? '2px solid var(--primary-color)' : '2px solid transparent',
              color: !isLogin ? 'var(--primary-color)' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            Registrarse
          </button>
        </div>

        {isLogin ? (
          <CustomerLoginForm />
        ) : (
          <CustomerRegisterForm onSuccess={() => setIsLogin(true)} />
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <span style={{ color: '#666' }}>¿Eres administrador? </span>
          <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
            Acceso Admin
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
