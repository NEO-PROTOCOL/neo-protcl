import { useState, useEffect, useRef } from 'react'
import { soundManager } from '../utils/sounds'

/**
 * Componente de texto com efeito typewriter (digitação)
 * Inclui som de impressora matricial dos anos 90
 */
export default function TypewriterText({
  text,
  speed = 30, // ms por caractere
  onComplete,
  className = '',
  style = {},
  showCursor = true,
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Validação de entrada
    if (typeof text !== 'string') {
      setDisplayedText('')
      return
    }

    // Limitar tamanho do texto para prevenir memory issues
    const MAX_TEXT_LENGTH = 100000
    const safeText = text.length > MAX_TEXT_LENGTH ? text.substring(0, MAX_TEXT_LENGTH) : text

    // Reset quando o texto mudar
    setDisplayedText('')
    indexRef.current = 0
    setIsTyping(true)

    // Não iniciar som aqui - será gerenciado pelo componente pai

    const typeNextChar = () => {
      if (indexRef.current < safeText.length) {
        setDisplayedText(safeText.slice(0, indexRef.current + 1))
        // Tocar som da cabeça da impressora a cada caractere (exceto espaços)
        const char = safeText[indexRef.current]
        if (char && char !== ' ') {
          try {
            soundManager.playPrinterHead()
          } catch (e) {
            // Ignorar erros de som silenciosamente
          }
        }
        indexRef.current++
        timeoutRef.current = setTimeout(typeNextChar, speed)
      } else {
        // Terminou de digitar
        setIsTyping(false)
        if (onComplete && typeof onComplete === 'function') {
          try {
            onComplete()
          } catch (e) {
            // Ignorar erros no callback
          }
        }
      }
    }

    // Iniciar digitação após um pequeno delay
    timeoutRef.current = setTimeout(typeNextChar, 100)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Não parar o som no cleanup - será gerenciado pelo componente pai
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]) // Removido onComplete das dependências para evitar loops

  return (
    <span className={className} style={style}>
      {displayedText}
      {showCursor && isTyping && <span className="animate-pulse text-gray-600">|</span>}
    </span>
  )
}

/**
 * Componente para múltiplas linhas com typewriter
 */
export function TypewriterLines({
  lines,
  speed = 30,
  lineDelay = 200, // delay entre linhas
  onComplete,
  className = '',
  renderLine,
}) {
  // Validação de entrada
  if (!Array.isArray(lines)) {
    return <div className={className}>Erro: lines deve ser um array</div>
  }

  // Limitar número de linhas para prevenir memory issues
  const MAX_LINES = 1000
  const safeLines = lines.slice(0, MAX_LINES)

  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [lineStates, setLineStates] = useState({})
  const isFirstLine = useRef(true)

  useEffect(() => {
    if (currentLineIndex < safeLines.length) {
      if (isFirstLine.current) {
        try {
          soundManager.startPrinterSound()
        } catch (e) {
          // Ignorar erros de som
        }
        isFirstLine.current = false
      }
    } else {
      try {
        soundManager.stopPrinterSound()
      } catch (e) {
        // Ignorar erros de som
      }
      if (onComplete && typeof onComplete === 'function') {
        try {
          onComplete()
        } catch (e) {
          // Ignorar erros no callback
        }
      }
    }
  }, [currentLineIndex, safeLines.length, onComplete])

  const timeoutRefs = useRef([])

  const handleLineComplete = lineIndex => {
    setLineStates(prev => ({ ...prev, [lineIndex]: 'complete' }))
    if (lineIndex < lines.length - 1) {
      const timeoutId = setTimeout(() => {
        setCurrentLineIndex(lineIndex + 1)
      }, lineDelay)
      timeoutRefs.current.push(timeoutId)
    } else {
      try {
        soundManager.stopPrinterSound()
      } catch (e) {
        // Ignorar erros de som
      }
    }
  }

  // Cleanup de timeouts
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(id => clearTimeout(id))
      timeoutRefs.current = []
    }
  }, [])

  return (
    <div className={className}>
      {safeLines.map((line, index) => {
        if (line === '') {
          return <div key={index} className="h-4"></div>
        }

        const state = lineStates[index]
        const isTyping = index === currentLineIndex
        const isComplete = state === 'complete' || index < currentLineIndex

        if (renderLine) {
          if (isComplete) {
            return renderLine(line, index, true)
          } else if (isTyping) {
            const styledLine = renderLine(line, index, false)
            // Se renderLine retornou um elemento, precisamos substituir o texto pelo TypewriterText
            if (styledLine && styledLine.type) {
              return (
                <styledLine.type key={index} {...styledLine.props}>
                  <TypewriterText
                    text={line}
                    speed={speed}
                    onComplete={() => handleLineComplete(index)}
                    className={styledLine.props.className}
                    style={styledLine.props.style}
                    showCursor={true}
                  />
                </styledLine.type>
              )
            }
          }
          return null
        }

        // Fallback sem renderLine
        if (isComplete) {
          return (
            <p
              key={index}
              className="text-base md:text-lg font-medium text-gray-200 font-['Courier_New',monospace]"
            >
              {line}
            </p>
          )
        } else if (isTyping) {
          return (
            <TypewriterText
              key={index}
              text={line}
              speed={speed}
              onComplete={() => handleLineComplete(index)}
              className="text-base md:text-lg font-medium text-gray-200 font-['Courier_New',monospace]"
              showCursor={true}
            />
          )
        }
        return null
      })}
    </div>
  )
}
