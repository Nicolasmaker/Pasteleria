import { render, screen } from '@testing-library/react';
import { LoginPage } from '../../pages/LoginPage';
import { AuthProvider } from '../../context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

test('renders login page', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </AuthProvider>
  );
  const headingElement = screen.getByText(/Iniciar Sesión/i);
  expect(headingElement).toBeInTheDocument();
});
