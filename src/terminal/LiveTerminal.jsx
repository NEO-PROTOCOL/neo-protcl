import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCommand } from './CommandParserEngine';
import { soundManager } from '../utils/sounds';
import { AgentContext } from './AgentContext';
import Avatar from './Avatar';
import { zones } from './zones';

export default function LiveTerminal() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const { agentState, updateAgentState } = useContext(AgentContext);

  // Carregar histórico do localStorage na inicialização
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('neo_terminal_history') || '[]');
    if (savedHistory.length) {
      setHistory(savedHistory);
    }
  }, []);

  // Salvar histórico no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('neo_terminal_history', JSON.stringify(history));
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (!command) return;

      const result = parseCommand(command, agentState, updateAgentState);

      setInput('');
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: command },
        ...result.output.map((text) => ({ type: 'output', text })),
      ]);

      if (result.sound) {
        soundManager.play(result.sound);
      }

      // Navegar se o comando retornar uma rota
      if (result.navigate) {
        setTimeout(() => navigate(result.navigate), 1500);
      }
    }
  };

  // Renderizar zona ativa se houver
  const ActiveZone = agentState.zone && zones[agentState.zone]
    ? zones[agentState.zone]
    : null;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-4 py-8 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline absolute inset-0 pointer-events-none"></div>

      {/* Terminal cursor blink */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .terminal-cursor {
          animation: blink 1s infinite;
        }
      `}</style>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Avatar */}
        <Avatar />

        {/* Terminal Lines */}
        <div className="space-y-2 text-sm">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={line.type === 'input' ? 'text-cyan-400' : 'text-green-400'}
            >
              {line.type === 'input' ? `$ ${line.text}` : line.text}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center mt-4 text-cyan-400">
            <span className="text-green-400 mr-2">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1 terminal-cursor"
              autoFocus
              placeholder="emit signal --coherence Ø3"
              style={{ caretColor: 'rgba(0, 255, 255, 0.8)' }}
            />
          </div>

          {/* Zone feedback */}
          {ActiveZone && <ActiveZone />}
        </div>

        {/* Terminal Footer */}
        <div className="mt-8 pt-4 border-t border-green-500/30 text-green-500/30 text-xs">
          <span>└─</span>
          <span className="ml-1">neoprotocol.eth • IPFS • ENS • LiveTerminal v1.0</span>
        </div>
      </div>
    </div>
  );
}

