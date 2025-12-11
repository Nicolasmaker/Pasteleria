import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './routes/AppRouter'
import { ErrorBoundary } from './components/ErrorBoundary'
import './assets/styles/main.css'

// Importar funciones de validación en desarrollo
if (import.meta.env.DEV) {
  import('./services/validate-connection').then(({ validateBackendConnection }) => {
    console.log('🚀 Modo desarrollo - Funciones de validación disponibles en la consola');
    console.log('💡 Ejecuta: validateBackend() para validar la conexión al backend');
  });
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </React.StrictMode>,
)
