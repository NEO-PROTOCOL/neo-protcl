import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { AgentState } from './types/protocol'

const defaultState: AgentState = {
  resonance: 0,
  zonesUnlocked: [],
  memory: [],
  zone: null,
  coherence: 0,
  alignment: 0,
}

const AgentContext = createContext<{
  agentState: AgentState
  updateAgentState: (updates: Partial<AgentState>) => void
}>({
  agentState: defaultState,
  updateAgentState: () => {},
})

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agentState, setAgentState] = useState<AgentState>(defaultState)

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const saved = localStorage.getItem('neo_agent_state')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Garantir que zonesUnlocked e memory sejam arrays
        const restoredState = {
          ...defaultState,
          ...parsed,
          zonesUnlocked: Array.isArray(parsed.zonesUnlocked) ? parsed.zonesUnlocked : [],
          memory: Array.isArray(parsed.memory) ? parsed.memory : [],
          coherence:
            typeof parsed.coherence === 'number' ? parsed.coherence : defaultState.coherence,
          alignment:
            typeof parsed.alignment === 'number' ? parsed.alignment : defaultState.alignment,
        }
        setAgentState(restoredState)
      } catch (e) {
        console.error('Erro ao carregar estado do agente:', e)
      }
    }
  }, [])

  // Salvar estado no localStorage quando mudar (com debounce para evitar muitas escritas)
  useEffect(() => {
    // Evitar salvar o estado inicial vazio
    if (
      agentState.resonance === 0 &&
      agentState.zonesUnlocked.length === 0 &&
      agentState.memory.length === 0 &&
      !agentState.zone &&
      agentState.coherence === 0
    ) {
      return // Não salvar estado vazio inicial
    }

    const timeoutId = setTimeout(() => {
      try {
        const stateJson = JSON.stringify(agentState)
        // Validar tamanho antes de salvar
        const MAX_SIZE = 1024 * 1024 // 1MB (muito mais que suficiente para estado do agente)
        if (stateJson.length > MAX_SIZE) {
          if (import.meta.env.DEV) {
            console.warn('[AgentContext] Estado muito grande, truncando memória...')
          }
          // Truncar arrays grandes
          const truncatedState = {
            ...agentState,
            memory: agentState.memory.slice(-20), // Manter apenas últimas 20 memórias
            zonesUnlocked: agentState.zonesUnlocked.slice(-20), // Manter apenas últimas 20 zonas
          }
          localStorage.setItem('neo_agent_state', JSON.stringify(truncatedState))
          return
        }
        localStorage.setItem('neo_agent_state', stateJson)
      } catch (error) {
        // Tratar QuotaExceededError
        if (error.name === 'QuotaExceededError') {
          if (import.meta.env.DEV) {
            console.warn('[AgentContext] localStorage cheio, limpando memória antiga...')
          }
          try {
            // Salvar versão truncada
            const truncatedState = {
              ...agentState,
              memory: agentState.memory.slice(-10),
              zonesUnlocked: agentState.zonesUnlocked.slice(-10),
            }
            localStorage.setItem('neo_agent_state', JSON.stringify(truncatedState))
          } catch (e) {
            // Se ainda falhar, apenas log (não bloquear aplicação)
            if (import.meta.env.DEV) {
              console.error('[AgentContext] Erro ao persistir estado truncado:', e)
            }
          }
        } else if (import.meta.env.DEV) {
          console.error('[AgentContext] Erro ao salvar estado:', error)
        }
      }
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timeoutId)
  }, [agentState])

  const updateAgentState = (updates: Partial<AgentState>) => {
    setAgentState(prev => ({ ...prev, ...updates }))
  }

  return (
    <AgentContext.Provider value={{ agentState, updateAgentState }}>
      {children}
    </AgentContext.Provider>
  )
}

export { AgentContext }
