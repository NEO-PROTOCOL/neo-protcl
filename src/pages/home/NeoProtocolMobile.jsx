import React, { useEffect, useState, useRef } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import Navbar from '../../components/Navbar'
import BottomNavigation from '../../components/BottomNavigation'
import Footer from '../../components/Footer'
import CommandInput from '../../components/CommandInput'
import { getMCPState, initMCP } from '../../context/mcp'
import { thirdwebClient, x402Config } from '../../providers/X402Provider'
import { processCommand } from '../../utils/commandProcessor'

/**
 * NeoProtocolMobile - Protocol Shell Frame
 * Fase 3: Ciclo de Intenção e Feedback
 * Alvo: Home Mobile
 */
export default function NeoProtocolMobile() {
  const account = useActiveAccount()
  const [mcp, setMcp] = useState(getMCPState())
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('neo_shell_events_mobile')
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: 'Bootstrap complete.' },
          { id: 2, text: 'Shell active.' },
        ]
  })

  useEffect(() => {
    try {
      const eventsJson = JSON.stringify(events)
      // Limitar tamanho para prevenir problemas de quota
      if (eventsJson.length > 500 * 1024) {
        // Se eventos são muito grandes, manter apenas últimos 500
        const truncatedEvents = events.slice(-500)
        localStorage.setItem('neo_shell_events_mobile', JSON.stringify(truncatedEvents))
        return
      }
      localStorage.setItem('neo_shell_events_mobile', eventsJson)
    } catch (error) {
      // Tratar QuotaExceededError
      if (error.name === 'QuotaExceededError') {
        // Tentar salvar versão truncada
        try {
          const truncatedEvents = events.slice(-200)
          localStorage.setItem('neo_shell_events_mobile', JSON.stringify(truncatedEvents))
        } catch (e) {
          // Se ainda falhar, apenas log em dev
          if (import.meta.env.DEV) {
            console.warn('[NeoProtocolMobile] Erro ao salvar eventos:', e)
          }
        }
      } else if (import.meta.env.DEV) {
        console.error('[NeoProtocolMobile] Erro ao salvar eventos:', error)
      }
    }
  }, [events])
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef(0)
  const containerRef = useRef(null)
  const eventsContainerRef = useRef(null)
  const isUserScrollingRef = useRef(false)
  const autoScrollEnabledRef = useRef(true)

  useEffect(() => {
    const state = initMCP()
    setMcp({ ...state })
  }, [])

  const handleCommand = cmd => {
    const context = {
      mcpConnected: mcp.connected,
      identity: account ? 'AUTHENTICATED' : 'ANONYMOUS',
      address: account?.address,
      hasClient: !!thirdwebClient,
      x402Ready: x402Config.isConfigured,
    }

    const result = processCommand(cmd, context)

    if (result.type === 'CLEAR') {
      setEvents([])
      return
    }

    const newEvents = [
      { id: Date.now(), text: `CMD: ${cmd.toUpperCase()}` },
      ...result.messages.map((msg, i) => ({ id: Date.now() + i + 1, text: msg })),
    ]

    // Garantir que auto-scroll está ativo quando o usuário executa um comando
    autoScrollEnabledRef.current = true
    isUserScrollingRef.current = false

    setEvents(prev => [...prev, ...newEvents])
  }

  // Auto-scroll para a última linha quando novos eventos são adicionados
  useEffect(() => {
    if (eventsContainerRef.current) {
      const container = eventsContainerRef.current
      // Usar requestAnimationFrame para garantir que o DOM foi atualizado
      requestAnimationFrame(() => {
        if (autoScrollEnabledRef.current && !isUserScrollingRef.current) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  }, [events])

  // Detectar quando o usuário está rolando manualmente
  const handleScroll = () => {
    if (!eventsContainerRef.current) return

    const container = eventsContainerRef.current
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5

    // Se o usuário está no final, reativar auto-scroll
    if (isAtBottom) {
      autoScrollEnabledRef.current = true
      isUserScrollingRef.current = false
    } else {
      // Se o usuário está rolando para cima, desabilitar auto-scroll
      autoScrollEnabledRef.current = false
      isUserScrollingRef.current = true
    }
  }

  const networkStatus = thirdwebClient ? 'OK' : 'OFF'
  const identityStatus = account
    ? `${account.address.slice(0, 4)}..${account.address.slice(-2)}`
    : 'NONE'
  const mcpStatus = mcp.connected ? 'ACTIVE' : 'OFF'

  // Pull to Refresh logic (infrastructure maintained)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = e => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = e => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        const distance = e.touches[0].clientY - touchStartY.current
        if (distance > 0) {
          setPullDistance(Math.min(distance, 80))
        }
      }
    }

    const handleTouchEnd = () => {
      if (pullDistance > 50) {
        window.location.reload()
      }
      setPullDistance(0)
      touchStartY.current = 0
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullDistance])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative font-mono"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Background Layer: Animated Network Topology */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

        {/* Animated radial glows - mobile optimized */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>

        {/* Network pattern - connected nodes */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0),
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0)
            `,
            backgroundSize: '50px 50px, 100px 100px',
            backgroundPosition: '0 0, 25px 25px',
          }}
        ></div>

        {/* Connection lines - subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 50%, black 100%)',
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="ios-status-bar"></div>
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-4 pt-safe overflow-hidden">
          {/* Mobile Telemetry Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-[9px] uppercase tracking-widest text-gray-400">
            <div className="flex flex-col border-l border-gray-700 pl-2">
              <span className="text-gray-300 mb-0.5">network</span>
              <span className={thirdwebClient ? 'text-cyan-400' : 'text-red-400'}>
                {networkStatus}
              </span>
            </div>
            <div className="flex flex-col border-l border-gray-700 pl-2">
              <span className="text-gray-300 mb-0.5">mcp</span>
              <span className={mcp.connected ? 'text-cyan-400' : 'text-gray-500'}>{mcpStatus}</span>
            </div>
            <div className="flex flex-col border-l border-gray-700 pl-2">
              <span className="text-gray-300 mb-0.5">identity</span>
              <span className={account ? 'text-cyan-400' : 'text-gray-500'}>{identityStatus}</span>
            </div>
            <div className="flex flex-col border-l border-gray-700 pl-2">
              <span className="text-gray-300 mb-0.5">events</span>
              <span className="text-gray-400">{events.length}</span>
            </div>
          </div>

          {/* Central Action Area (Touch Optimized) */}
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full border border-gray-700 p-6 bg-gray-900/30 backdrop-blur-sm">
              <div className="mb-3 text-[10px] text-gray-300 uppercase tracking-widest">
                [SYSTEM READY] - COMMAND REQUIRED
              </div>
              <CommandInput onCommand={handleCommand} placeholder="COMMAND..." />
            </div>
          </div>

          {/* Bottom Event Log */}
          <div className="mt-6 border-t border-gray-800 pt-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[9px] text-gray-300 uppercase tracking-[0.15em]">
                System Stream
              </div>
              <div className="flex items-center gap-2">
                {!autoScrollEnabledRef.current && (
                  <button
                    onClick={() => {
                      autoScrollEnabledRef.current = true
                      isUserScrollingRef.current = false
                      if (eventsContainerRef.current) {
                        eventsContainerRef.current.scrollTop =
                          eventsContainerRef.current.scrollHeight
                      }
                    }}
                    className="text-[8px] text-cyan-400 hover:text-cyan-300 uppercase tracking-wider transition-colors px-2 py-0.5 border border-cyan-400/30 rounded"
                    title="Voltar para última linha"
                  >
                    ↓
                  </button>
                )}
                <div className="text-[8px] text-gray-400 uppercase">
                  last: {events[events.length - 1]?.text.slice(0, 15)}..
                </div>
              </div>
            </div>
            <div
              ref={eventsContainerRef}
              onScroll={handleScroll}
              className="space-y-1 text-[10px] h-32 overflow-y-auto scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(52, 225, 255, 0.3) transparent',
              }}
            >
              {events.map(event => {
                const isUserCommand = event.text.startsWith('CMD:')
                return (
                  <div key={event.id} className={isUserCommand ? 'text-cyan-400' : 'text-gray-400'}>
                    &gt; {event.text}
                  </div>
                )
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Persistent Navigation */}
      <BottomNavigation />
    </div>
  )
}
