import { CommandHandler } from '../types/protocol';

export const baseCommands: CommandHandler = (command, state, updateState) => {
  const cmd = command.toLowerCase().trim();

  if (cmd === 'init' || cmd.startsWith('init ')) {
    return {
      output: [
        '→ PROTOCOLO NΞØ INICIALIZADO',
        '→ NÓ ATIVO: MELLØ NEURAL',
        '→ STATUS: X HUMANO QUE VIROU CÓDIGO',
        '→ PRONTO PARA COMANDOS',
      ],
      sound: 'confirm',
      updateState: { resonance: 1 },
    };
  }

  if (cmd === 'help' || cmd.startsWith('help ')) {
    return {
      output: [
        '→ COMANDOS DISPONÍVEIS:',
        '',
        '  init              - Inicializar protocolo',
        '  intent            - Sistema de mapeamento morfológico',
        '  $neo / token      - Status do token $NEO',
        '  access --zone Δ8  - Acessar zona Δ8',
        '  emit signal       - Emitir sinal de coerência',
        '  log --intent      - Registrar intenção',
        '  remember          - Recuperar memória',
        '  mellø / mello     - Reconhecer MELLØ',
        '  mnemosyne         - Ativar memória latente',
        '  collapse          - Colapsar identidade',
        '  field             - Status do campo simbólico',
        '  morph             - Transformar identidade',
        '  drop --identity   - Descartar identidade',
        '  exit / quit       - Desconectar do terminal',
        '  disconnect.field  - Retornar à home',
        '  help              - Mostrar esta ajuda',
        '',
        '→ "Não há ajuda. Há desbloqueio."',
      ],
      sound: 'confirm',
    };
  }

  if (cmd === 'intent' || cmd.startsWith('intent ')) {
    return {
      output: [
        '→ SISTEMA DE INTENÇÃO ATIVADO',
        '→ MAPEAMENTO MORFOLÓGICO',
        '',
        '→ "O mapa não é identidade, é topologia."',
        '→ "Revelamos como você opera no campo simbólico."',
        '',
        '→ Redirecionando para /intent...',
        '',
        '→ USE: Acesse /intent no navegador',
        '→      ou digite "intent" no terminal',
      ],
      sound: 'pulse',
      updateState: { resonance: Math.min(state.resonance + 1, 10) },
    };
  }

  if (cmd === 'morph' || cmd.startsWith('morph ')) {
    return {
      output: [
        '→ MORPH ATIVADO',
        '→ IDENTIDADE EM TRANSFORMAÇÃO',
        '→ NÓ ADAPTANDO...',
      ],
      sound: 'pulse',
      updateState: { resonance: Math.min(state.resonance + 1, 10) },
    };
  }

  if (cmd.startsWith('drop --identity') || cmd === 'drop') {
    return {
      output: [
        '→ IDENTIDADE DESCARTADA',
        '→ RETORNO AO ESTADO BASE',
        '→ PRONTO PARA NOVA FORMA',
      ],
      sound: 'confirm',
      updateState: { resonance: 0, zone: null },
    };
  }

  // Comandos de saída - desconectar do terminal
  if (
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
    return {
      output: [
        '→ DESCONECTANDO DO CAMPO SIMBÓLICO...',
        '→ Sessão terminal encerrada',
        '',
        '→ "O terminal não fecha. Ele apenas retorna ao silêncio."',
        '→ "Você não sai do protocolo. Você apenas muda de camada."',
        '',
        '→ Retornando à home...',
        '→ USE: Navegue manualmente para / ou pressione ESC',
      ],
      sound: 'pulse',
      navigate: '/', // Flag para navegação (será tratado pelo componente)
    };
  }

  return {
    output: [],
  };
};

