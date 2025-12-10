import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  return <button className={`btn btn-primary ${className || ''}`} {...props}>{label}</button>;
};
