import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';

export const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: 'var(--color-primary)', 
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Nuestra Historia de Dulzura
          </h1>
          <div style={{ 
            width: '100px', 
            height: '4px', 
            backgroundColor: 'var(--color-accent)', 
            margin: '0 auto' 
          }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          <div>
            <img 
              src="https://i.pinimg.com/736x/84/45/97/84459770d64bd791b9fd2e94a498f9e3.jpg" 
              alt="Nuestra cocina" 
              style={{ 
                width: '100%', 
                borderRadius: '12px', 
                boxShadow: 'var(--shadow-card)',
                transform: 'rotate(-2deg)'
              }} 
            />
          </div>
          
          <div style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              En <strong style={{ color: 'var(--color-text)' }}>Pastelería Los Sabores</strong>, no solo horneamos pasteles; creamos momentos inolvidables. Desde nuestros humildes comienzos en una pequeña cocina familiar hasta convertirnos en el corazón dulce de la comunidad, nuestra pasión siempre ha sido la misma: <em style={{ color: 'var(--color-primary)' }}>llevar alegría a tu mesa.</em>
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Cada receta es un legado, cada ingrediente es seleccionado con amor y cada decoración es una obra de arte. Creemos que un buen pastel tiene el poder de unir a las personas, de celebrar la vida y de convertir un día común en una ocasión especial.
            </p>
            <p>
              Nuestros maestros pasteleros combinan técnicas tradicionales con innovaciones modernas para ofrecerte sabores que despiertan tus sentidos. Ya sea que busques el clásico sabor de casa o una nueva aventura culinaria, aquí encontrarás tu porción de felicidad.
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '5rem', 
          backgroundColor: 'white', 
          padding: '3rem', 
          borderRadius: '12px', 
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h2 style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>Nuestros Valores</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❤️</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Pasión</h3>
              <p style={{ fontSize: '0.9rem' }}>Amamos lo que hacemos y se nota en cada detalle.</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Calidad</h3>
              <p style={{ fontSize: '0.9rem' }}>Solo los mejores ingredientes entran en nuestra cocina.</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tradición</h3>
              <p style={{ fontSize: '0.9rem' }}>Honramos las recetas que han pasado de generación en generación.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
