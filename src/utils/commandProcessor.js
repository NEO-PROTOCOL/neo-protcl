/**
 * Sanitiza comando para prevenir injection
 * @param {string} command - Comando a ser sanitizado
 * @returns {string} Comando sanitizado
 */
function sanitizeCommand(command) {
  if (typeof command !== 'string') return ''
  // Remover caracteres de controle e limitar tamanho
  return command.replace(/[\x00-\x1F\x7F]/g, '').trim().substring(0, 1000)
}

/**
 * Valida contexto do comando
 * @param {Object} context - Contexto a ser validado
 * @returns {Object} Contexto validado
 */
function validateContext(context) {
  if (!context || typeof context !== 'object') {
    return {}
  }

  return {
    mcpConnected: Boolean(context.mcpConnected),
    identity: typeof context.identity === 'string' ? context.identity.substring(0, 100) : null,
    hasClient: Boolean(context.hasClient),
    x402Ready: Boolean(context.x402Ready),
    address: typeof context.address === 'string' && /^0x[a-fA-F0-9]{40}$/.test(context.address)
      ? context.address
      : null,
  }
}

/**
 * Command Processor for NEO Protocol Shell
 * Handles input and returns systemic feedback
 */
export const processCommand = (command, context = {}) => {
  // Validar e sanitizar entrada
  const sanitizedCommand = sanitizeCommand(command)
  if (!sanitizedCommand) {
    return {
      type: 'ERROR',
      messages: ['Comando inválido'],
    }
  }

  const cmd = sanitizedCommand.toLowerCase()
  const timestamp = new Date().toLocaleTimeString()
  const validatedContext = validateContext(context)

  const responses = {
    help: [
      'AVAILABLE COMMANDS:',
      '  - HELP: SHOW THIS LIST',
      '  - STATUS: DISPLAY SYSTEM HEALTH',
      '  - NETWORK: SHOW CHAIN CONNECTIVITY',
      '  - IDENTITY: SHOW LOCAL WALLET STATE',
      '  - CLEAR: RESET EVENT STREAM',
    ],
    status: [
      `SYSTEM HEALTH: OPERATIONAL`,
      `MCP ROUTER: ${validatedContext.mcpConnected ? 'ACTIVE' : 'OFFLINE'}`,
      `IDENTITY: ${validatedContext.identity || 'NOT DETECTED'}`,
    ],
    network: [
      `CHAIN: BASE`,
      `CLIENT: ${validatedContext.hasClient ? 'INITIALIZED' : 'NOT FOUND'}`,
      `X402: ${validatedContext.x402Ready ? 'READY' : 'INCOMPLETE'}`,
    ],
    identity: [
      `LOCAL ADDRESS: ${validatedContext.address || 'NONE'}`,
      `STATUS: ${validatedContext.address ? 'AUTHENTICATED' : 'ANONYMOUS'}`,
    ],
    clear: [], // Special case handled in component
  }

  if (cmd === 'clear') {
    return { type: 'CLEAR', messages: [] }
  }

  const result = responses[cmd] || [`ERROR: COMMAND "${cmd.toUpperCase()}" NOT_IMPLEMENTED`]

  return {
    type: 'FEEDBACK',
    messages: result.map(msg => `[${timestamp}] ${msg}`),
  }
}
