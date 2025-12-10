import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { useCakes } from '../context/CakeContext';
import { CakeCard } from '../components/molecules/CakeCard';

export const HomePage: React.FC = () => {
  const { cakes } = useCakes();
  const featuredCakes = cakes.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className='hero-section'>
        <h1 className='hero-title'>Pastelería Los Sabores</h1>
        <p className='hero-subtitle'>
          Donde cada bocado es una experiencia inolvidable. Tradición y dulzura en cada pastel, hechos con amor para ti.
        </p>
        <Link to='/productos' className='cta-button'>
          Ver Nuestros Pasteles
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className='section-title'>¿Por qué elegirnos?</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <span className='feature-icon'>🍰</span>
            <h3>Recetas Tradicionales</h3>
            <p>Conservamos el sabor auténtico de la pastelería casera con recetas de antaño.</p>
          </div>
          <div className='feature-card'>
            <span className='feature-icon'>🍓</span>
            <h3>Ingredientes Frescos</h3>
            <p>Seleccionamos las mejores frutas y materias primas para garantizar la calidad.</p>
          </div>
          <div className='feature-card'>
            <span className='feature-icon'>🚚</span>
            <h3>Envío a Domicilio</h3>
            <p>Llevamos la dulzura directamente a tu puerta con nuestro servicio de delivery.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className='section-title'>Nuestros Favoritos</h2>
        <div className='featured-products'>
          {featuredCakes.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to='/productos' className='cta-button' style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-text)' }}>
            Ver Todo el Menú
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};
