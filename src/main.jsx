import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App';
import TWProvider from './providers/ThirdwebProvider';
import './index.css';

// Polyfill para buffer no browser (necessário para ethers.js e outras libs blockchain)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.global = window.globalThis;
}
globalThis.Buffer = Buffer;
globalThis.global = globalThis;

// Error Boundary para capturar erros de renderização
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          color: '#fff', 
          background: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1>Erro ao carregar aplicação</h1>
          <p style={{ marginTop: '1rem', color: '#888' }}>
            {this.state.error?.message || 'Erro desconhecido'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#007acc',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <TWProvider>
        <App />
      </TWProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

