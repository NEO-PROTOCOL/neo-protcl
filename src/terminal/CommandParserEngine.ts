import { CommandResponse, AgentState } from './types/protocol';
import { baseCommands } from './commands/base';
import { tokenCommands } from './commands/token';
import { zoneCommands } from './commands/zones';
import { memoryCommands } from './commands/memory';
import { invalidCommand } from './commands/invalid';

/**
 * Motor de interpretação de comandos
 * Orquestra os diferentes módulos de comandos
 */
export function parseCommand(
  command: string,
  state: AgentState,
  updateState: (updates: Partial<AgentState>) => void
): CommandResponse {
  const cmd = command.toLowerCase().trim();

  if (!cmd) {
    return {
      output: ['→ DIGITE UM COMANDO'],
      sound: 'error',
    };
  }

  // Roteamento de comandos
  let response: CommandResponse = { output: [] };

  // Comandos base (init, help, morph, drop, exit, quit, disconnect)
  if (
    cmd.startsWith('init') || 
    cmd === 'help' || 
    cmd.startsWith('morph') || 
    cmd.startsWith('drop') ||
    cmd === 'exit' ||
    cmd === 'quit' ||
    cmd === 'disconnect' ||
    cmd === 'disconnect.field' ||
    cmd === 'collapse.session' ||
    cmd === 'return.base' ||
    cmd === 'sair' ||
    cmd === 'desconectar' ||
    cmd === 'voltar'
  ) {
    response = baseCommands(command, state, updateState);
  }
  // Comandos de token ($neo, token, mint)
  else if (cmd.includes('$neo') || cmd.includes('token') || cmd === 'neo' || cmd.startsWith('mint') || cmd.includes('status')) {
    response = tokenCommands(command, state, updateState);
  }
  // Comandos de zonas (access, zone, emit signal)
  else if (cmd.includes('zone') || cmd.includes('access') || cmd.startsWith('emit')) {
    response = zoneCommands(command, state, updateState);
  }
  // Comandos de memória (log, remember, echo, mellø, mnemosyne, collapse, field)
  else if (
    cmd.startsWith('log') || 
    cmd === 'remember' || 
    cmd.startsWith('remember ') || 
    cmd.startsWith('echo') ||
    cmd.includes('mellø') ||
    cmd.includes('mello') ||
    cmd.includes('mnemosyne') ||
    cmd.includes('latent') ||
    cmd.includes('collapse') ||
    cmd.includes('colapsar') ||
    cmd.includes('field') ||
    cmd.includes('campo')
  ) {
    response = memoryCommands(command, state, updateState);
  }
  // Comando não reconhecido
  else {
    response = invalidCommand(command, state, updateState);
  }

  // Aplicar atualizações de estado se houver
  if (response.updateState) {
    updateState(response.updateState);
  }

  return response;
}

