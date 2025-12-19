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
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Erro desconhecido';
      const isClientIdError = errorMessage.includes('clientId');
      
      return (
        <div style={{ 
          padding: '2rem', 
          color: '#fff', 
          background: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '1rem' }}>Erro ao carregar aplicação</h1>
          <p style={{ marginTop: '1rem', color: '#888', maxWidth: '600px' }}>
            {errorMessage}
          </p>
          {isClientIdError && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: '#1a1a1a', 
              borderRadius: '0.5rem',
              maxWidth: '600px'
            }}>
              <p style={{ color: '#ffa500', marginBottom: '0.5rem' }}>
                💡 Dica: Este erro geralmente ocorre quando o Thirdweb Client ID não está configurado.
              </p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>
                O app funciona sem o Client ID, mas com funcionalidades limitadas. 
                Configure VITE_THIRDWEB_CLIENT_ID no .env se precisar de Embedded Wallets.
              </p>
            </div>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#007acc',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
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

