import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const AuthDebug: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '0.75rem',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>🔍 Auth Debug</h4>
      <div><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</div>
      <div><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</div>
      {user && (
        <>
          <div><strong>User:</strong> {user.fullName}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Role:</strong> {user.role}</div>
          <div><strong>ID:</strong> {user.id.slice(0, 8)}...</div>
        </>
      )}
      <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #666' }}>
        <div><strong>LocalStorage Token:</strong> {localStorage.getItem('token') ? 'Yes' : 'No'}</div>
        <div><strong>LocalStorage User:</strong> {localStorage.getItem('currentUser') ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};
