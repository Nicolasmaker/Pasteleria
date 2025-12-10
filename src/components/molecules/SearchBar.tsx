import React from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <Input placeholder="Buscar..." />
      <Button label="Buscar" />
    </div>
  );
};
