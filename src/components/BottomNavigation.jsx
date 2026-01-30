import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { soundManager } from '../utils/sounds'
import { useDeviceDetection } from '../hooks/useDeviceDetection'
// import { useActiveAccount } from 'thirdweb/react' // Temporariamente desabilitado
// import {
//   ConnectButton as ThirdwebConnectButton,
//   useDisconnect,
//   useActiveWallet,
// } from 'thirdweb/react' // Temporariamente desabilitado
import { useThirdwebClient } from '../providers/X402Provider'

export default function BottomNavigation() {
  const location = useLocation()
  const { isMobile } = useDeviceDetection()
  // const account = useActiveAccount() // Temporariamente desabilitado
  // const wallet = useActiveWallet() // Temporariamente desabilitado
  // const disconnectHook = useDisconnect() // Temporariamente desabilitado
  const account = null
  const wallet = null
  const disconnectHook = null
  const client = useThirdwebClient()

  // Verificar se disconnect é uma função (pode ser undefined em alguns casos)
  const disconnect = typeof disconnectHook === 'function' ? disconnectHook : null
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const menuRef = useRef(null)

  const handleDisconnect = () => {
    if (wallet && disconnect && typeof disconnect === 'function') {
      soundManager.playClick()
      try {
        disconnect(wallet)
        setShowWalletMenu(false)
      } catch (error) {
        console.error('Erro ao desconectar wallet:', error)
      }
    } else {
      console.warn('Disconnect não disponível ou wallet não encontrada')
    }
  }

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowWalletMenu(false)
      }
    }

    if (showWalletMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showWalletMenu])

  // Não renderizar em desktop
  if (!isMobile) {
    return null
  }

  // Partículas NΞØ conforme biblioteca de símbolos
  const navItems = [
    { path: '/', particle: '⟡', label: 'HOME', accent: '#34E1FF' }, // Glitch.Cyan - núcleo/essência
    { path: '/nos', particle: '⦾', label: 'NODES', accent: '#1A9AF7' }, // Anomaly.Blue - foco/presença ativa
    { path: '/manifesto', particle: '⦙', label: 'DOCS', accent: '#7B5DFF' }, // Signal.Violet - divisor singular
    // { path: '/register', particle: '◉', label: 'CADASTRO', accent: '#22C55E' }, // Temporariamente desabilitado
    { path: '/boot', particle: '⊘', label: 'TERM', accent: '#34E1FF' }, // Glitch.Cyan - LiveTerminal
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0"
      style={{
        zIndex: 100,
        background: '#0B0D10', // Depth.Gray
        borderTop: '1px solid rgba(52, 225, 255, 0.08)', // Glitch.Cyan com baixa opacidade
        paddingTop: '6px', // 1x unidade fractal
        paddingBottom: `max(6px, env(safe-area-inset-bottom))`,
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="flex items-center justify-around px-4" style={{ gap: '8px' }}>
        {' '}
        {/* 2x cluster */}
        {navItems.map(item => {
          const isActive = item.clickable !== false && location.pathname === item.path
          const accentColor = item.accent

          const content = (
            <div
              className="relative flex flex-col items-center justify-center flex-1 transition-all"
              style={{
                paddingTop: '6px', // 1x
                paddingBottom: '6px', // 1x
                opacity: item.clickable === false ? 0.3 : 1,
                pointerEvents: item.clickable === false ? 'none' : 'auto',
                filter: isActive ? 'saturate(115%)' : 'saturate(100%)',
              }}
            >
              {/* Partícula NΞØ */}
              <span
                className="mb-3"
                style={{
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: isActive ? 600 : 300,
                  color: isActive ? accentColor : '#6B7280', // Gray neutro quando inativo
                  transition: 'color 0.2s linear, font-weight 0.2s linear',
                }}
              >
                {item.particle}
              </span>

              {/* Label */}
              <span
                className="uppercase"
                style={{
                  fontSize: '9px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: isActive ? 500 : 300,
                  letterSpacing: '0.05em',
                  color: isActive ? accentColor : '#6B7280',
                  transition: 'color 0.2s linear',
                }}
              >
                {item.label}
              </span>

              {/* Indicador de estado ativo - linha fraturada */}
              {isActive && (
                <div
                  className="absolute -top-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '24px', // 4x
                    height: '1px',
                    background: accentColor,
                    opacity: 0.6,
                  }}
                ></div>
              )}
            </div>
          )

          return (
            <div key={item.path || item.label} className="flex items-center flex-1">
              {item.clickable !== false ? (
                <Link
                  to={item.path}
                  onClick={() => {
                    if (!isActive) {
                      soundManager.playNavigate()
                    } else {
                      soundManager.playClick()
                    }
                  }}
                  className="w-full"
                  style={{ textDecoration: 'none' }}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          )
        })}
        {/* Wallet Button - Compacto para BottomNavigation */}
        <div className="flex items-center flex-1" ref={menuRef}>
          <div
            className="relative flex flex-col items-center justify-center w-full transition-all"
            style={{ paddingTop: '6px', paddingBottom: '6px' }}
          >
            {account ? (
              // Conectado: mostrar menu com opção de desconectar
              <>
                <button
                  onClick={() => {
                    setShowWalletMenu(!showWalletMenu)
                    soundManager.playClick()
                  }}
                  className="flex flex-col items-center w-full"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span
                    className="mb-3"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      color: '#22C55E', // Green quando conectado
                      transition: 'color 0.2s linear',
                    }}
                  >
                    ●
                  </span>
                  <span
                    className="uppercase"
                    style={{
                      fontSize: '9px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      color: '#22C55E',
                    }}
                  >
                    WALLET
                  </span>
                  <div
                    className="absolute -top-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '24px',
                      height: '1px',
                      background: '#22C55E',
                      opacity: 0.6,
                    }}
                  ></div>
                </button>

                {/* Disconnect menu */}
                {showWalletMenu && (
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
                    style={{
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div className="p-3 border-b border-gray-700">
                      <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">
                        CONNECTED WALLET
                      </div>
                      <div className="font-mono text-xs text-green-400 break-all">
                        {account.address.slice(0, 8)}...{account.address.slice(-6)}
                      </div>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full px-4 py-3 text-left text-xs text-red-400 hover:bg-red-500/10 transition-colors font-mono flex items-center gap-2 border-t border-gray-700"
                    >
                      <span className="text-base">✕</span>
                      <span>DISCONNECT</span>
                    </button>
                  </div>
                )}
              </>
            ) : client ? (
              // Disconnected: minimalist icon that opens modal
              <div className="flex flex-col items-center w-full">
                <div
                  className="mb-3 flex items-center justify-center"
                  style={{ minHeight: '18px' }}
                >
                  <ThirdwebConnectButton
                    client={client}
                    connectModal={{
                      size: 'wide',
                      title: 'Conectar Wallet',
                      welcomeScreen: {
                        title: 'Bem-vindo ao NΞØ Protocol',
                        subtitle: 'Conecte sua wallet para começar',
                      },
                    }}
                    connectButton={{
                      label: '',
                      className: 'p-0 border-0 bg-transparent min-w-0',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 300,
                        color: '#6B7280',
                        transition: 'color 0.2s linear',
                        cursor: 'pointer',
                        display: 'block',
                        lineHeight: '1',
                      }}
                    >
                      ⦿
                    </span>
                  </ThirdwebConnectButton>
                </div>
                <span
                  className="uppercase"
                  style={{
                    fontSize: '9px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    color: '#6B7280',
                  }}
                >
                  WALLET
                </span>
              </div>
            ) : (
              // Fallback se não houver cliente configurado
              <div className="flex flex-col items-center w-full opacity-30">
                <span style={{ fontSize: '18px', marginBottom: '3px' }}>⦿</span>
                <span style={{ fontSize: '9px', color: '#6B7280' }}>WALLET</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
