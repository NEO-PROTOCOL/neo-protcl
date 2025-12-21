import React, { useEffect, useState, useRef } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import CommandInput from '../../components/CommandInput';
import { getMCPState, initMCP } from '../../context/mcp';
import { thirdwebClient, x402Config } from '../../providers/X402Provider';
import { processCommand } from '../../utils/commandProcessor';

/**
 * NeoProtocolMobile - Protocol Shell Frame
 * Fase 3: Ciclo de Intenção e Feedback
 * Alvo: Home Mobile
 */
export default function NeoProtocolMobile() {
  const account = useActiveAccount();
  const [mcp, setMcp] = useState(getMCPState());
  const [events, setEvents] = useState([
    { id: 1, text: 'Bootstrap complete.' },
    { id: 2, text: 'Shell active.' }
  ]);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

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

  const networkStatus = thirdwebClient ? 'OK' : 'OFF';
  const identityStatus = account ? `${account.address.slice(0, 4)}..${account.address.slice(-2)}` : 'NONE';
  const mcpStatus = mcp.connected ? 'ACTIVE' : 'OFF';

  // Pull to Refresh logic (infrastructure maintained)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        const distance = e.touches[0].clientY - touchStartY.current;
        if (distance > 0) {
          setPullDistance(Math.min(distance, 80));
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 50) {
        window.location.reload();
      }
      setPullDistance(0);
      touchStartY.current = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative font-mono"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Background Layer: Minimal/Static */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)',
          backgroundSize: '30px 30px' 
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="ios-status-bar"></div>
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-4 pt-safe overflow-hidden">
          
          {/* Mobile Telemetry Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-[9px] uppercase tracking-widest text-gray-500">
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span className="text-gray-700 mb-0.5">network</span>
              <span className={thirdwebClient ? "text-cyan-500" : "text-red-900"}>{networkStatus}</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span className="text-gray-700 mb-0.5">mcp</span>
              <span className={mcp.connected ? "text-cyan-500" : "text-gray-800"}>{mcpStatus}</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span className="text-gray-700 mb-0.5">identity</span>
              <span className={account ? "text-cyan-500" : "text-gray-800"}>{identityStatus}</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span className="text-gray-700 mb-0.5">events</span>
              <span className="text-gray-600">{events.length}</span>
            </div>
          </div>

          {/* Central Action Area (Touch Optimized) */}
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full border border-gray-800 p-6 bg-gray-900/20 backdrop-blur-sm">
              <div className="mb-3 text-[10px] text-gray-600 uppercase tracking-widest">
                [SYSTEM READY] - COMMAND REQUIRED
              </div>
              <CommandInput onCommand={handleCommand} placeholder="COMMAND..." />
            </div>
          </div>

          {/* Bottom Event Log */}
          <div className="mt-6 border-t border-gray-900 pt-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[9px] text-gray-700 uppercase tracking-[0.15em]">System Stream</div>
              <div className="text-[8px] text-gray-800 uppercase">
                last: {events[events.length - 1]?.text.slice(0, 15)}..
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-gray-600 h-20 overflow-y-auto">
              {events.map(event => (
                <div key={event.id}>&gt; {event.text}</div>
              ))}
            </div>
          </div>

        </main>

        <Footer />
      </div>

      {/* Persistent Navigation */}
      <BottomNavigation />
    </div>
  );
}
