import { useContext, useEffect, useState } from 'react';
import { AgentContext } from './AgentContext';

export default function Avatar() {
  const context = useContext(AgentContext);
  const agentState = context?.agentState || {
    resonance: 0,
    zonesUnlocked: [],
    zone: null,
    coherence: 0,
  };
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    // Mudar estado baseado no estado do agente
    if (agentState.zone) {
      setAnimationState('resonance');
    } else if (agentState.resonance > 0) {
      setAnimationState('listening');
    } else {
      setAnimationState('idle');
    }
  }, [agentState.zone, agentState.resonance]);

  // ASCII art do avatar com diferentes estados
  const avatarArt = {
    idle: 
`\████▀▀▀████        
 ██   Ø   Ø ██      
██           ██     
██   ───   ██       
  ██████████       `,
    listening: 
`\████▀▀▀████        
 ██   ◉   ◉ ██      
██           ██     
██   ═══   ██       
  ██████████       `,
    resonance: 
`\████▀▀▀████        
 ██   ✦   ✦ ██      
██           ██     
██   ++++  ██       
  ██████████       `,
    error: 
`\████▀▀▀████        
 ██   ✕   ✕ ██      
██           ██     
██   ───   ██       
  ██████████       `,
  };

  const statusText = {
    idle: 'node-[MELLØ] • post-human',
    listening: 'node-[MELLØ] • escutando',
    resonance: `node-[MELLØ] • ressonância ${agentState.coherence || 0}`,
    error: 'node-[MELLØ] • erro',
  };

  return (
    <div className="mb-6 text-center leading-none text-green-300 select-none">
      <pre className="text-[10px] md:text-sm leading-tight font-mono animate-pulse">
        {avatarArt[animationState]}
      </pre>
      <div className="text-xs text-green-500 mt-1">{statusText[animationState]}</div>
      {agentState.zonesUnlocked && Array.isArray(agentState.zonesUnlocked) && agentState.zonesUnlocked.length > 0 && (
        <div className="text-xs text-cyan-400 mt-1">
          zonas: {agentState.zonesUnlocked.join(', ')}
        </div>
      )}
    </div>
  );
}

