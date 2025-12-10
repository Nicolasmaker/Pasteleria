import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from '../../../components/organisms/LoginForm';
import { AuthProvider } from '../../../context/AuthProvider';

test('renders login form', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );
  const usernameInput = screen.getByLabelText(/Usuario/i);
  const passwordInput = screen.getByLabelText(/Contraseña/i);
  const submitButton = screen.getByText(/Ingresar/i);

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
