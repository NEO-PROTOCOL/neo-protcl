import { useEffect, useRef, useId, useMemo } from 'react'
import mermaid from 'mermaid'

// Inicializa Mermaid globalmente uma única vez com o tema do protocolo
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono, monospace',
  themeVariables: {
    primaryColor: '#00CFFF',
    primaryTextColor: '#0A0A0A',
    primaryBorderColor: '#00FF99',
    lineColor: '#00CFFF',
    secondaryColor: '#1B1B1B',
    tertiaryColor: '#00FF99',
    background: '#0A0A0A',
    mainBkgColor: '#0A0A0A',
    secondBkgColor: '#1B1B1B',
    textColor: '#F0F0F0',
  },
})

/**
 * Componente para renderizar diagramas Mermaid
 *
 * @param {string} diagram - Código do diagrama Mermaid
 * @param {string} id - ID único opcional para o diagrama
 */
export default function MermaidDiagram({ diagram, id }) {
  const containerRef = useRef(null)
  const reactId = useId().replace(/:/g, '') // Remove dois pontos do useId para ser um ID válido de DOM
  const diagramId = useMemo(() => id || `mermaid-${reactId}`, [id, reactId])

  useEffect(() => {
    let isMounted = true
    let timeoutId = null

    /**
     * Sanitiza string para prevenir XSS
     */
    const sanitizeHTML = str => {
      if (typeof str !== 'string') return ''
      const div = document.createElement('div')
      div.textContent = str
      return div.innerHTML
    }

    const renderDiagram = async () => {
      if (!diagram || !containerRef.current) return

      // Validação de entrada: diagrama não pode ser muito grande (prevenir DoS)
      const MAX_DIAGRAM_LENGTH = 100000
      if (diagram.length > MAX_DIAGRAM_LENGTH) {
        if (isMounted && containerRef.current) {
          const errorDiv = document.createElement('div')
          errorDiv.className = 'p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-xs'

          const title = document.createElement('p')
          title.className = 'text-red-400 font-bold mb-1'
          title.textContent = 'Erro de Validação'
          errorDiv.appendChild(title)

          const message = document.createElement('p')
          message.className = 'text-red-300/80 font-mono'
          message.textContent = `Diagrama muito grande (máximo ${MAX_DIAGRAM_LENGTH} caracteres)`
          errorDiv.appendChild(message)

          containerRef.current.innerHTML = ''
          containerRef.current.appendChild(errorDiv)
        }
        return
      }

      try {
        // Limpa o diagrama para evitar erros de sintaxe por espaços extras
        const cleanDiagram = diagram.trim()

        // Timeout para prevenir operações infinitas
        const renderPromise = mermaid.render(diagramId, cleanDiagram)
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Timeout ao renderizar diagrama')), 10000)
        })

        const { svg } = await Promise.race([renderPromise, timeoutPromise])

        if (isMounted && containerRef.current) {
          // Mermaid retorna SVG válido, mas ainda precisamos validar
          // Usar DOMParser para validar SVG antes de inserir
          try {
            const parser = new DOMParser()
            const svgDoc = parser.parseFromString(svg, 'image/svg+xml')
            const parseError = svgDoc.querySelector('parsererror')

            if (parseError) {
              throw new Error('SVG inválido retornado pelo Mermaid')
            }

            // Limpar container antes de inserir novo conteúdo
            containerRef.current.innerHTML = ''
            // Usar appendChild para inserir SVG validado (mais seguro que innerHTML)
            const svgElement = svgDoc.documentElement
            if (svgElement) {
              containerRef.current.appendChild(svgElement.cloneNode(true))
            }
          } catch (parseError) {
            throw new Error('Erro ao validar SVG do Mermaid')
          }
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Erro ao renderizar diagrama Mermaid:', error)
        }

        if (isMounted && containerRef.current) {
          // Usar createElement em vez de innerHTML com template strings
          const errorDiv = document.createElement('div')
          errorDiv.className = 'p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-xs'

          const title = document.createElement('p')
          title.className = 'text-red-400 font-bold mb-1'
          title.textContent = 'Erro de Renderização'
          errorDiv.appendChild(title)

          const message = document.createElement('p')
          message.className = 'text-red-300/80 font-mono'
          message.textContent = error.message || 'Erro desconhecido'
          errorDiv.appendChild(message)

          containerRef.current.innerHTML = ''
          containerRef.current.appendChild(errorDiv)
        }
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [diagram, diagramId])

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram w-full flex justify-center overflow-x-auto py-4"
      style={{ minHeight: '100px' }}
    />
  )
}
