import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text, className, ...props }) => {
  return <label className={`form-label ${className || ''}`} {...props}>{text}</label>;
};
