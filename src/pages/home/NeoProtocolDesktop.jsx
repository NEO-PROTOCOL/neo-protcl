import React, { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CommandInput from '../../components/CommandInput';
import { getMCPState, initMCP } from '../../context/mcp';
import { thirdwebClient, x402Config } from '../../providers/X402Provider';
import { processCommand } from '../../utils/commandProcessor';

/**
 * NeoProtocolDesktop - Protocol Shell Frame
 * Fase 3: Ciclo de Intenção e Feedback
 * Alvo: Home Desktop
 */
export default function NeoProtocolDesktop() {
  const account = useActiveAccount();
  const [mcp, setMcp] = useState(getMCPState());
  const [events, setEvents] = useState([
    { id: 1, text: 'Bootstrap sequence completed.' },
    { id: 2, text: 'Protocol shell active.' }
  ]);

  useEffect(() => {
    const state = initMCP();
    setMcp({ ...state });
  }, []);

  const handleCommand = (cmd) => {
    const context = {
      mcpConnected: mcp.connected,
      identity: account ? 'AUTHENTICATED' : 'ANONYMOUS',
      address: account?.address,
      hasClient: !!thirdwebClient,
      x402Ready: x402Config.isConfigured
    };

    const result = processCommand(cmd, context);
    
    if (result.type === 'CLEAR') {
      setEvents([]);
      return;
    }

    const newEvents = [
      { id: Date.now(), text: `CMD: ${cmd.toUpperCase()}` },
      ...result.messages.map((msg, i) => ({ id: Date.now() + i + 1, text: msg }))
    ];
    
    setEvents(prev => [...prev, ...newEvents]);
  };

  const networkStatus = thirdwebClient ? 'CONNECTED (BASE)' : 'DISCONNECTED';
  const identityStatus = account ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : 'NOT_INITIALIZED';
  const mcpStatus = mcp.connected ? 'ACTIVE / ROUTING' : 'OFFLINE';

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative font-mono">
      {/* Background Layer: Minimal/Static */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          
          {/* Top Telemetry Bar */}
          <div className="flex justify-between items-start mb-8 text-[10px] uppercase tracking-widest text-gray-500">
            <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-gray-700 mb-1">network_status</span>
                <span className={thirdwebClient ? "text-cyan-500" : "text-red-900"}>{networkStatus}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 mb-1">mcp_status</span>
                <span className={mcp.connected ? "text-cyan-500" : "text-gray-800"}>{mcpStatus}</span>
              </div>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-gray-700 mb-1">local_identity_state</span>
              <span className={account ? "text-cyan-500" : "text-gray-800"}>{identityStatus}</span>
            </div>
          </div>

          {/* Central Action Area (Protocol Input) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full border border-gray-800 p-8 bg-gray-900/20 backdrop-blur-sm">
              <div className="mb-4 text-xs text-gray-600 uppercase tracking-widest">
                [SYSTEM READY] - INPUT REQUIRED
              </div>
              <CommandInput onCommand={handleCommand} />
            </div>
          </div>

          {/* Bottom Event Stream */}
          <div className="mt-8 border-t border-gray-900 pt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[10px] text-gray-700 uppercase tracking-[0.2em]">System Events</div>
              <div className="text-[10px] text-gray-800 uppercase tracking-[0.1em]">
                last_event: <span className="text-gray-600">{events[events.length - 1]?.text.slice(0, 30)}...</span>
              </div>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-gray-600 h-24 overflow-y-auto">
              {events.map(event => (
                <div key={event.id}>&gt; {event.text}</div>
              ))}
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}
