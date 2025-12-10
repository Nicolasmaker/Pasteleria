import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, errorMessage, ...props }) => {
  // Generar un ID único simple si no se proporciona uno, evitando useId por compatibilidad
  const id = React.useId ? React.useId() : `field-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="form-field">
      <Label htmlFor={id} text={label} />
      <Input id={id} {...props} />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
