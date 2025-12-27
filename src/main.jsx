import React from 'react'
import ReactDOM from 'react-dom/client'
import { Buffer } from 'buffer'
import App from './App'
import TWProvider from './providers/ThirdwebProvider'
import './index.css'

// Polyfill para buffer no browser (necessário para ethers.js e outras libs blockchain)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  window.global = window.globalThis
}
globalThis.Buffer = Buffer
globalThis.global = globalThis

// Error Boundary para capturar erros de renderização
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    // Log stack trace if available
    if (error.stack) {
      console.error('Stack trace:', error.stack)
    }
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Erro desconhecido'
      const errorStack = this.state.error?.stack || ''
      const isClientIdError = errorMessage.includes('clientId') || errorStack.includes('clientId')

      return (
        <div
          style={{
            padding: '2rem',
            color: '#fff',
            background: '#000',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>
            Erro ao carregar aplicação
          </h1>
          <div
            style={{
              marginTop: '1rem',
              color: '#ff4444',
              maxWidth: '800px',
              textAlign: 'left',
              background: '#1a1111',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #331111',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflow: 'auto',
              maxHeight: '300px',
            }}
          >
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{errorMessage}</p>
            {errorStack && (
              <pre style={{ whiteSpace: 'pre-wrap', color: '#888' }}>{errorStack}</pre>
            )}
          </div>

          {isClientIdError && (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: '#1a1a00',
                borderRadius: '0.5rem',
                maxWidth: '800px',
                border: '1px solid #333300',
              }}
            >
              <p
                style={{
                  color: '#ffa500',
                  marginBottom: '0.75rem',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                💡 Dica: Falha na configuração do Thirdweb Client
              </p>
              <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Este erro geralmente ocorre quando o <strong>clientId</strong> não é fornecido ou o
                objeto <strong>client</strong> está indefinido ao ser usado por um componente ou
                hook da Thirdweb.
              </p>
              <div
                style={{ marginTop: '1rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem' }}
              >
                <p>Verificações recomendadas:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>
                    Certifique-se que <strong>VITE_THIRDWEB_CLIENT_ID</strong> está definido no seu
                    arquivo <strong>.env</strong>
                  </li>
                  <li>
                    Reinicie o servidor de desenvolvimento (npm run dev) para carregar mudanças no
                    .env
                  </li>
                  <li>
                    Verifique se o valor do clientId no .env não possui espaços ou aspas extras
                  </li>
                </ul>
              </div>
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
              fontSize: '1rem',
            }}
          >
            Recarregar Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Sanitiza string para prevenir XSS
 * @param {string} str - String a ser sanitizada
 * @returns {string} String sanitizada
 */
function sanitizeHTML(str) {
  if (typeof str !== 'string') return ''
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

// Verificar se o elemento root existe
const rootElement = document.getElementById('root')
if (!rootElement) {
  // Usar textContent em vez de innerHTML para prevenir XSS
  const errorDiv = document.createElement('div')
  errorDiv.style.cssText = 'padding: 2rem; color: white; background: red; font-family: monospace;'
  errorDiv.textContent = 'ERRO: Elemento #root não encontrado no DOM!'
  document.body.appendChild(errorDiv)

  // Log apenas em desenvolvimento
  if (import.meta.env.DEV) {
    console.error('❌ Elemento #root não encontrado no DOM!')
  }
} else {
  if (import.meta.env.DEV) {
    console.log('✅ Elemento #root encontrado, iniciando renderização...')
  }
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <TWProvider>
            <App />
          </TWProvider>
        </ErrorBoundary>
      </React.StrictMode>
    )
    if (import.meta.env.DEV) {
      console.log('✅ React renderizado com sucesso!')
    }
  } catch (error) {
    // Log apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.error('❌ Erro ao renderizar React:', error)
    }

    // Usar textContent e createElement em vez de innerHTML
    const errorContainer = document.createElement('div')
    errorContainer.style.cssText =
      'padding: 2rem; color: white; background: red; font-family: monospace;'

    const title = document.createElement('h1')
    title.textContent = 'Erro ao renderizar React'
    errorContainer.appendChild(title)

    const pre = document.createElement('pre')
    pre.textContent = `${error.message}\n${error.stack || ''}`
    errorContainer.appendChild(pre)

    rootElement.innerHTML = ''
    rootElement.appendChild(errorContainer)
  }
}
