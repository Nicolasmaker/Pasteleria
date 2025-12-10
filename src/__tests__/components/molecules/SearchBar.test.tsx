import { render, screen } from '@testing-library/react';
import { SearchBar } from '../../../components/molecules/SearchBar';

test('renders search bar', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/Buscar.../i);
  const buttonElement = screen.getByText(/Buscar/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
