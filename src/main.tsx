import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './routes/AppRouter'
import { ErrorBoundary } from './components/ErrorBoundary'
import './assets/styles/main.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </React.StrictMode>,
)
