/**
 * Command Processor for NEO Protocol Shell
 * Handles input and returns systemic feedback
 */
export const processCommand = (command, context = {}) => {
  const cmd = command.trim().toLowerCase();
  const timestamp = new Date().toLocaleTimeString();
  
  const responses = {
    'help': [
      'AVAILABLE COMMANDS:',
      '  - HELP: SHOW THIS LIST',
      '  - STATUS: DISPLAY SYSTEM HEALTH',
      '  - NETWORK: SHOW CHAIN CONNECTIVITY',
      '  - IDENTITY: SHOW LOCAL WALLET STATE',
      '  - CLEAR: RESET EVENT STREAM'
    ],
    'status': [
      `SYSTEM HEALTH: OPERATIONAL`,
      `MCP ROUTER: ${context.mcpConnected ? 'ACTIVE' : 'OFFLINE'}`,
      `IDENTITY: ${context.identity || 'NOT DETECTED'}`
    ],
    'network': [
      `CHAIN: BASE`,
      `CLIENT: ${context.hasClient ? 'INITIALIZED' : 'NOT FOUND'}`,
      `X402: ${context.x402Ready ? 'READY' : 'INCOMPLETE'}`
    ],
    'identity': [
      `LOCAL ADDRESS: ${context.address || 'NONE'}`,
      `STATUS: ${context.address ? 'AUTHENTICATED' : 'ANONYMOUS'}`
    ],
    'clear': [] // Special case handled in component
  };

  if (cmd === 'clear') {
    return { type: 'CLEAR', messages: [] };
  }

  const result = responses[cmd] || [`ERROR: COMMAND "${cmd.toUpperCase()}" NOT_IMPLEMENTED`];
  
  return {
    type: 'FEEDBACK',
    messages: result.map(msg => `[${timestamp}] ${msg}`)
  };
};

