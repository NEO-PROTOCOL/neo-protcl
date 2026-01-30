import React, { useState, useEffect, useRef } from 'react'
// import { useActiveAccount } from 'thirdweb/react' // Temporarily disabled
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CommandInput from '../../components/CommandInput'
import { getMCPState, initMCP } from '../../context/mcp'
import { thirdwebClient, x402Config } from '../../providers/X402Provider'
import { processCommand } from '../../utils/commandProcessor'

/**
 * NeoProtocolDesktop - Protocol Shell Frame
 * Phase 3: Intent and Feedback Cycle
 * Target: Desktop Home
 */
export default function NeoProtocolDesktop() {
  // const account = useActiveAccount() // Temporarily disabled
  const account = null
  const [mcp, setMcp] = useState(getMCPState())
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('neo_shell_events')
    return saved
      ? JSON.parse(saved)
      : [
        { id: 1, text: 'Bootstrap sequence completed.' },
        { id: 2, text: 'Protocol shell active.' },
      ]
  })
  const eventsContainerRef = useRef(null)
  const isUserScrollingRef = useRef(false)
  const autoScrollEnabledRef = useRef(true)

  useEffect(() => {
    try {
      const eventsJson = JSON.stringify(events)
      // Limitar tamanho para prevenir problemas de quota
      if (eventsJson.length > 500 * 1024) {
        // Se eventos são muito grandes, manter apenas últimos 500
        const truncatedEvents = events.slice(-500)
        localStorage.setItem('neo_shell_events', JSON.stringify(truncatedEvents))
        return
      }
      localStorage.setItem('neo_shell_events', eventsJson)
    } catch (error) {
      // Tratar QuotaExceededError
      if (error.name === 'QuotaExceededError') {
        // Tentar salvar versão truncada
        try {
          const truncatedEvents = events.slice(-200)
          localStorage.setItem('neo_shell_events', JSON.stringify(truncatedEvents))
        } catch (e) {
          // Se ainda falhar, apenas log em dev
          if (import.meta.env.DEV) {
            console.warn('[NeoProtocolDesktop] Erro ao salvar eventos:', e)
          }
        }
      } else if (import.meta.env.DEV) {
        console.error('[NeoProtocolDesktop] Erro ao salvar eventos:', error)
      }
    }
  }, [events])

  useEffect(() => {
    const state = initMCP()
    setMcp({ ...state })
  }, [])

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

  const networkStatus = thirdwebClient ? 'CONNECTED (BASE)' : 'DISCONNECTED'
  const identityStatus = account
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : 'NOT_INITIALIZED'
  const mcpStatus = mcp.connected ? 'ACTIVE / ROUTING' : 'OFFLINE'

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative font-mono">
      {/* Background Layer: Animated Network Topology */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

        {/* Animated radial glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        ></div>

        {/* Network pattern - connected nodes */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0),
              radial-gradient(circle at 2px 2px, #00ffff 1px, transparent 0)
            `,
            backgroundSize: '60px 60px, 120px 120px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        ></div>

        {/* Connection lines - subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
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

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Top Telemetry Bar */}
          <div className="flex justify-between items-start mb-8 text-[10px] uppercase tracking-widest text-gray-400">
            <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-gray-300 mb-1">network_status</span>
                <span className={thirdwebClient ? 'text-cyan-400' : 'text-red-400'}>
                  {networkStatus}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 mb-1">mcp_status</span>
                <span className={mcp.connected ? 'text-cyan-400' : 'text-gray-500'}>
                  {mcpStatus}
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-gray-300 mb-1">local_identity_state</span>
              <span className={account ? 'text-cyan-400' : 'text-gray-500'}>{identityStatus}</span>
            </div>
          </div>

          {/* Central Action Area (Protocol Input) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full border border-gray-700 p-8 bg-gray-900/30 backdrop-blur-sm">
              <div className="mb-4 text-xs text-gray-300 uppercase tracking-widest">
                [SYSTEM READY] - INPUT REQUIRED
              </div>
              <CommandInput onCommand={handleCommand} />
            </div>
          </div>

          {/* Bottom Event Stream */}
          <div className="mt-8 border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[10px] text-gray-300 uppercase tracking-[0.2em]">
                System Events
              </div>
              <div className="flex items-center gap-3">
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
                    className="text-[9px] text-cyan-400 hover:text-cyan-300 uppercase tracking-wider transition-colors"
                    title="Voltar para última linha"
                  >
                    [↓ FOLLOW]
                  </button>
                )}
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.1em]">
                  last_event:{' '}
                  <span className="text-gray-300">
                    {events[events.length - 1]?.text.slice(0, 30)}...
                  </span>
                </div>
              </div>
            </div>
            <div
              ref={eventsContainerRef}
              onScroll={handleScroll}
              className="space-y-1 font-mono text-[11px] h-40 overflow-y-auto scroll-smooth"
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
    </div>
  )
}
