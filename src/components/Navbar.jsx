import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { soundManager } from '../utils/sounds'
import ConnectButton from './WalletConnect/ConnectButton'
import { getIPFSGatewayUrl } from '../services/intentDataCapture'
// Wallet imports disabled

export default function Navbar() {
  const logoCid = 'bafkreifm3hzdhem47tfzzqxm4274t3rqkzrgsa2zi2bc72nzjecxaixsxm'
  // const account = useActiveAccount() // Temporariamente desabilitado
  // const wallet = useActiveWallet() // Temporariamente desabilitado
  // const disconnectHook = useDisconnect() // Temporariamente desabilitado
  const account = null
  const wallet = null
  const disconnectHook = null
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const menuRef = useRef(null)

  // Verificar se disconnect é uma função (pode ser undefined em alguns casos)
  const disconnect = typeof disconnectHook === 'function' ? disconnectHook : null

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

  return (
    <nav className="sticky top-0 z-50 ios-navbar ios-shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => soundManager.playClick()}
          className="flex items-center haptic-light"
        >
          <img
            src={getIPFSGatewayUrl(logoCid)}
            alt="NΞØ SMART FACTORY"
            className="h-7 md:h-9 w-auto"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 255, 255, 0.3))',
            }}
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/nos"
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Nodes
            </Link>
            <Link
              to="/manifesto"
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Manifesto
            </Link>
            <Link
              to="/docs"
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Docs
            </Link>
            <Link
              to="/project"
              onClick={() => soundManager.playNavigate()}
              className="ios-button-secondary ios-compact-xs text-xs haptic-light"
            >
              Project
            </Link>

          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[10px] font-medium text-green-400 uppercase tracking-wide">
                Synced
              </span>
            </div>
            {/* Wallet Menu - Desktop */}
            <div className="hidden md:flex items-center relative" ref={menuRef}>
              {account ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowWalletMenu(!showWalletMenu)
                      soundManager.playClick()
                    }}
                    className="px-3 py-1.5 border border-green-400/50 bg-gray-800/50 backdrop-blur-sm font-mono text-xs text-green-300 rounded-lg hover:bg-gray-800/70 hover:border-green-400 transition-all"
                    style={{
                      borderColor: 'rgba(34, 197, 94, 0.5)',
                      boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)',
                      textShadow: '0 0 5px rgba(34, 197, 94, 0.4)',
                    }}
                  >
                    <span className="text-green-400">●</span> {account.address.slice(0, 4)}...
                    {account.address.slice(-4)}
                  </button>

                  {/* Dropdown Menu */}
                  {showWalletMenu && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
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
                          {account.address}
                        </div>
                      </div>
                      <button
                        onClick={handleDisconnect}
                        className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-500/10 transition-colors font-mono flex items-center gap-2 border-t border-gray-700"
                      >
                        <span className="text-base">✕</span>
                        <span>DISCONNECT</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <ConnectButton compact={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
