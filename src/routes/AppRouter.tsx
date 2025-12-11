import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { AboutPage } from '../pages/AboutPage';
import { CartPage } from '../pages/CartPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MyOrdersPage } from '../pages/MyOrdersPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from '../context/AuthProvider';
import { CakeProvider } from '../context/CakeContext';
import { CartProvider } from '../context/CartContext';

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <CakeProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/mis-pedidos" element={<MyOrdersPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </CakeProvider>
    </AuthProvider>
  );
};
