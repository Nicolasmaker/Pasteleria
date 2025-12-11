import React, { useState } from 'react';
import { AuthLayout } from '../components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';
import { CustomerLoginForm } from '../components/organisms/CustomerLoginForm';
import { CustomerRegisterForm } from '../components/organisms/CustomerRegisterForm';

type TabType = 'cliente' | 'admin';
type CustomerViewType = 'login' | 'register';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('cliente');
  const [customerView, setCustomerView] = useState<CustomerViewType>('login');

  return (
    <AuthLayout>
      <div className="auth-container">
        <div className="card">
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '2rem',
            borderBottom: '2px solid #e0e0e0'
          }}>
            <button
              onClick={() => setActiveTab('cliente')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'cliente' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'cliente' ? 'white' : '#666',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              CLIENTE
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'admin' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'admin' ? 'white' : '#666',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              ADMIN
            </button>
          </div>

          {/* Content */}
          {activeTab === 'cliente' ? (
            <>
              {customerView === 'login' ? (
                <>
                  <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h1>
                  <CustomerLoginForm />
                  <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: '#666' }}>¿No tienes cuenta? </span>
                    <button
                      onClick={() => setCustomerView('register')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-color)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Regístrate aquí
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Crear Cuenta</h1>
                  <CustomerRegisterForm />
                  <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: '#666' }}>¿Ya tienes cuenta? </span>
                    <button
                      onClick={() => setCustomerView('login')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-color)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Inicia sesión
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Panel de Administración</h1>
              <LoginForm />
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};
