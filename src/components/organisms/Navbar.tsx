import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCakes } from '../../context/CakeContext';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { searchQuery, setSearchQuery } = useCakes();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar-custom">
        <div className="navbar-left">
          <Link to="/" className="nav-link">INICIO</Link>
          <Link to="/nosotros" className="nav-link">NOSOTROS</Link>
          <Link to="/productos" className="nav-link">PRODUCTOS</Link>
        </div>

        <div className="navbar-center">
          <div className="logo-container">
            <div className="navbar-brand-text">Los Sabores</div>
          </div>
        </div>

        <div className="navbar-right">
          
          {isAuthenticated ? (
             <div className="auth-controls">
                <span className="user-greeting">Hola, {user?.name}</span>
                {user?.role === 'ADMIN' && <Link to="/dashboard" className="btn-dashboard">PANEL</Link>}
                <button onClick={handleLogout} className="btn-logout">SALIR</button>
             </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" className="nav-link" style={{ fontSize: '0.9rem' }}>ADMIN</Link>
              <Link to="/cliente" className="btn-compra-online">INGRESAR</Link>
            </div>
          )}

          {location.pathname === '/productos' && (
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          )}

          <Link to="/carrito" className="cart-icon-container" style={{ position: 'relative', textDecoration: 'none', marginLeft: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🛒</span>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--color-error)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
      
      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </>
  );
};
