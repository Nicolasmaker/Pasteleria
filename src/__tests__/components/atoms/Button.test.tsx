import { render, screen } from '@testing-library/react';
import { Button } from '../../../components/atoms/Button';

test('renders button with label', () => {
  render(<Button label="Click me" />);
  const buttonElement = screen.getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});
