import React, { createContext, useState, useContext } from 'react';
import pinaImage from '../images/piña.png';
import milhojasImage from '../images/milhojas.png';
import brazoReinaImage from '../images/brazoreina.png';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CakeContextType {
  cakes: Cake[];
  addCake: (cake: Omit<Cake, 'id'>) => void;
  deleteCake: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CakeContext = createContext<CakeContextType | undefined>(undefined);

export const useCakes = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCakes must be used within a CakeProvider');
  }
  return context;
};

export const CakeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cakes, setCakes] = useState<Cake[]>([
    {
      id: '1',
      name: 'Torta de Milhojas',
      description: 'Clásica torta chilena de finas capas de masa crujiente, rellena de abundante manjar y nueces picadas.',
      price: 28990,
      image: milhojasImage
    },
    {
      id: '2',
      name: 'Torta Tres Leches',
      description: 'Bizcocho húmedo y esponjoso remojado en leche evaporada, condensada y crema, cubierto de merengue italiano.',
      price: 24990,
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Pastel_de_Tres_Leches.jpg'
    },
    {
      id: '3',
      name: 'Brazo de Reina',
      description: 'Tradicional rollo de bizcocho suave relleno con dulce de leche y espolvoreado con azúcar glas.',
      price: 12990,
      image: brazoReinaImage
    },
    {
      id: '4',
      name: 'Torta de Piña',
      description: 'Fresca torta de bizcocho vainilla, rellena con crema chantilly y trozos de piña en almíbar.',
      price: 22990,
      image: pinaImage
    },
    {
      id: '5',
      name: 'Torta Panqueque Naranja',
      description: 'Elegante torta de capas delgadas de bizcocho panqueque, rellenas con una suave crema de naranja natural.',
      price: 26990,
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Mille_crepe_cake.jpg'
    }
  ]);

  const addCake = (cake: Omit<Cake, 'id'>) => {
    const newCake = { ...cake, id: Date.now().toString() };
    setCakes([...cakes, newCake]);
  };

  const deleteCake = (id: string) => {
    setCakes(prev => prev.filter(cake => cake.id !== id));
  };

  return (
    <CakeContext.Provider value={{ cakes, addCake, deleteCake, searchQuery, setSearchQuery }}>
      {children}
    </CakeContext.Provider>
  );
};
