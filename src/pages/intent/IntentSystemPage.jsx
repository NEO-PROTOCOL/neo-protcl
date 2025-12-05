import { useState, useEffect, useContext } from 'react';
import { ChevronRight, Sparkles, Lock } from 'lucide-react';
import { useDesktopBlock } from '../../hooks/useDesktopBlock';
import { AgentProvider, AgentContext } from '../../terminal/AgentContext';
import { soundManager } from '../../utils/sounds';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import { particles } from '../../nexo-ui';
import {
  dimensions,
  analyzeText,
  generateSynergy,
  generateMermaidDiagram,
  archetypeDatabase,
} from '../../utils/intentSystemData';
import MermaidDiagram from '../../components/MermaidDiagram';

function IntentSystemContent() {
  useDesktopBlock();
  const { agentState, updateAgentState } = useContext(AgentContext);

  const [phase, setPhase] = useState('intro');
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelectDimension = (dimId) => {
    if (!selectedDimensions.includes(dimId)) {
      setSelectedDimensions([...selectedDimensions, dimId]);
      setFocusedDim(dimId);
      soundManager.playClick();
    }
  };

  const handleRemoveDimension = (dimId) => {
    setSelectedDimensions(selectedDimensions.filter((id) => id !== dimId));
    setResponses((prev) => {
      const newResponses = { ...prev };
      delete newResponses[dimId];
      return newResponses;
    });
    if (focusedDim === dimId) setFocusedDim(null);
    soundManager.playClick();
  };

  const handleResponseChange = (dimId, text) => {
    setResponses({ ...responses, [dimId]: text });
  };

  const handleGenerateMap = async () => {
    setLoading(true);
    soundManager.playPulse();

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const profileData = {};
    selectedDimensions.forEach((dimId) => {
      const archetype = analyzeText(responses[dimId] || '', dimId);
      profileData[dimId] = {
        archetype,
        intent: archetype ? (archetypeDatabase[dimId]?.[archetype]?.intent || '') : '',
      };
    });

    const synergy = generateSynergy(profileData, selectedDimensions);
    const mermaidDiagram = generateMermaidDiagram(profileData, synergy, selectedDimensions);

    setResult({ profileData, synergy, selectedDimensions, mermaidDiagram });
    setPhase('result');
    setLoading(false);
    soundManager.playConfirm();

    // Integrar com AgentContext
    const intentText = `Padrão Integrado: ${synergy.name} - ${synergy.intent}`;
    const currentMemory = Array.isArray(agentState.memory) ? agentState.memory : [];
    const newMemory = [...currentMemory, intentText];

    updateAgentState({
      memory: newMemory,
      resonance: Math.min(agentState.resonance + 2, 10),
      coherence: Math.min((agentState.coherence || 0) + 1, 10),
    });
  };

  // INTRO PHASE
  if (phase === 'intro') {
    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Hero Card - Mapeie sua arquitetura interna (TOP) */}
            <div 
              className="mb-6 p-8 spring-in rounded-3xl bg-white"
              style={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-24 h-24 mb-6 rounded-3xl flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 overflow-hidden"
                  style={{
                    boxShadow: '0 8px 24px rgba(34, 211, 238, 0.25)',
                  }}
                >
                  <img 
                    src="/splash/intent_box.png" 
                    alt="NΞØ Intent" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="ios-headline text-[#111827] mb-3 text-4xl font-bold tracking-tight">NΞØ INTENT</h1>
                <p className="ios-body text-[#111827] mb-6 leading-relaxed max-w-lg text-lg font-medium">
                  Mapeie sua arquitetura interna.
                </p>
                <p className="ios-body text-[#4B5563] leading-relaxed max-w-lg mb-4 text-base">
                  Através de narrativas livres, revelamos os algoritmos profundos que dirigem suas{' '}
                  <span className="text-[#06B6D4] font-semibold">decisões</span>,{' '}
                  <span className="text-[#3B82F6] font-semibold">conexões</span> e{' '}
                  <span className="text-[#A855F7] font-semibold">criações</span>.
                </p>
                <p className="ios-caption text-[#9CA3AF] italic max-w-lg">
                  Você não receberá rótulos. Receberá um diagrama vivo da sua estratégia de existência.
                </p>
              </div>
            </div>

            {/* Bento Grid - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div 
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.1s',
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: 'rgba(34, 211, 238, 0.03)',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <span className="text-3xl text-[#4B5563]">{particles.null}</span>
                  <img 
                    src="/splash/box_intent.png" 
                    alt="NΞØ" 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                </div>
                <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Não Perguntamos</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">Quem você é</p>
              </div>

              <div 
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.2s',
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-cyan-400 to-blue-400 relative"
                  style={{
                    boxShadow: '0 4px 12px rgba(34, 211, 238, 0.25)',
                  }}
                >
                  <span className="text-3xl text-white">{particles.active}</span>
                  <img 
                    src="/splash/box_intent.png" 
                    alt="NΞØ" 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                </div>
                <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Revelamos</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">Como você opera no campo simbólico</p>
              </div>

              <div 
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.3s',
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-purple-400 to-pink-400 relative"
                  style={{
                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.25)',
                  }}
                >
                  <span className="text-3xl text-white">{particles.nucleus}</span>
                  <img 
                    src="/splash/box_intent.png" 
                    alt="NΞØ" 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                </div>
                <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Você Recebe</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">Um mapa vivo com a sua estrutura de intenção</p>
              </div>
            </div>

            {/* CTA Button Card */}
            <div 
              className="p-6 mb-6 spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.4s',
              }}
            >
              <button
                onClick={() => {
                  setPhase('dimensions');
                  soundManager.playConfirm();
                }}
                className="w-full group relative px-8 py-5 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                style={{
                  boxShadow: '0 8px 24px rgba(34, 211, 238, 0.25)',
                }}
              >
                <span className="text-base">Iniciar Mapeamento</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>

            {/* Privacy Footer */}
            <div 
              className="p-5 text-center spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.5s',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock size={14} className="text-[#9CA3AF]" />
                <p className="ios-caption text-[#4B5563]">Seus padrões permanecem privados</p>
              </div>
              <p className="ios-caption text-[#9CA3AF]">NΞØ Protocol © 2025</p>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // DIMENSIONS PHASE
  if (phase === 'dimensions') {
    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Header Card */}
            <div 
              className="mb-6 p-6 spring-in rounded-3xl bg-white"
              style={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="text-center">
                <h2 className="ios-headline text-[#111827] mb-3 text-3xl font-bold">Suas Dimensões</h2>
                <p className="ios-body text-[#4B5563] text-base">
                  Selecione e preencha livremente. Explore todas ou apenas as que ressoam.
                </p>
              </div>
            </div>

            {/* Dimensions Grid */}
            <div className="space-y-4 mb-6">
              {dimensions.map((dim, idx) => (
                <div key={dim.id} className="space-y-3">
                  <div
                    onClick={() => handleSelectDimension(dim.id)}
                    className="p-6 cursor-pointer transition-all duration-300 spring-in rounded-2xl bg-white"
                    style={{
                      border: selectedDimensions.includes(dim.id)
                        ? '2px solid #06B6D4'
                        : '1px solid #E5E7EB',
                      boxShadow: selectedDimensions.includes(dim.id)
                        ? '0 0 0 3px rgba(34, 211, 238, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)'
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      animationDelay: `${0.1 + idx * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-5xl mb-4 text-[#06B6D4] relative inline-block">
                          <span>{dim.particle}</span>
                          <img 
                            src="/splash/box_intent.png" 
                            alt="NΞØ" 
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                          />
                        </div>
                        {!selectedDimensions.includes(dim.id) ? (
                          <>
                            <p className="text-xl font-semibold text-[#111827] mb-2 leading-tight">{dim.prompt}</p>
                            <p className="text-sm text-[#9CA3AF] uppercase tracking-wide mb-1">{dim.title}</p>
                            <p className="ios-body text-[#4B5563]">{dim.subtitle}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">{dim.title}</h3>
                            <p className="ios-body text-[#4B5563] mb-3">{dim.subtitle}</p>
                          </>
                        )}
                      </div>
                      {selectedDimensions.includes(dim.id) && (
                        <div className="w-10 h-10 rounded-full bg-[#06B6D4] flex items-center justify-center border-2 border-[#06B6D4]">
                          <span className="text-white font-bold text-lg">✓</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDimensions.includes(dim.id) && (
                    <div 
                      className="p-6 ml-4 rounded-2xl bg-white"
                      style={{
                        borderLeft: '3px solid #06B6D4',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      <p className="ios-body text-[#4B5563] mb-4">{dim.prompt}</p>
                      <textarea
                        value={responses[dim.id] || ''}
                        onChange={(e) => handleResponseChange(dim.id, e.target.value)}
                        placeholder="Escreva livremente. Sem filtros. Fluxo de consciência puro..."
                        className="w-full h-40 p-5 rounded-2xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all resize-none font-light leading-relaxed text-base bg-[#F9FAFB] border border-[#E5E7EB]"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => handleRemoveDimension(dim.id)}
                          className="ios-button-secondary ios-compact-xs text-xs"
                        >
                          Remover
                        </button>
                        <span className="ios-caption text-[#9CA3AF]">{(responses[dim.id] || '').length} caracteres</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div 
              className="p-6 mb-6 rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="ios-caption text-[#4B5563]">{selectedDimensions.length} dimensão(ões) selecionada(s)</p>
                  <p className="text-[#06B6D4] font-semibold text-base mt-1">
                    {selectedDimensions.every((d) => responses[d]?.trim())
                      ? '✓ Pronto para mapear'
                      : 'Preencha para continuar'}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPhase('intro');
                      setSelectedDimensions([]);
                      setResponses({});
                      soundManager.playClick();
                    }}
                    className="ios-button-secondary ios-compact"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleGenerateMap}
                    disabled={
                      selectedDimensions.length === 0 ||
                      !selectedDimensions.every((d) => responses[d]?.trim()) ||
                      loading
                    }
                    className="ios-button-primary ios-compact disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#9CA3AF] border-t-[#06B6D4] rounded-full animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        Gerar Mapa
                        <Sparkles size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // RESULT PHASE
  if (phase === 'result' && result) {
    const dimLabels = {
      problem_solving: 'Resolução de Problemas',
      collaboration: 'Conexão & Colaboração',
      creation: 'Criação & Geração',
    };

    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Header */}
            <div 
              className="mb-6 p-6 spring-in rounded-3xl bg-white"
              style={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E7EB',
              }}
            >
              <h2 className="ios-headline text-[#111827] text-center text-4xl font-bold">Seu Mapa Integrado</h2>
            </div>

            {/* Pattern Card - Large */}
            <div 
              className="mb-6 p-8 spring-in rounded-3xl bg-white border-2 border-[#06B6D4]"
              style={{
                boxShadow: '0 8px 24px rgba(34, 211, 238, 0.25)',
                animationDelay: '0.1s',
              }}
            >
              <div className="mb-6">
                <span className="ios-caption text-[#06B6D4] uppercase tracking-widest font-bold">Padrão Integrado</span>
                <h3 className="ios-headline text-[#111827] mt-3 text-3xl font-bold">{result.synergy.name}</h3>
              </div>

              <div className="space-y-4 border-t border-[#E5E7EB] pt-6">
                <p className="ios-body text-[#111827] leading-relaxed text-lg">{result.synergy.intent}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#E5E7EB]">
                <div>
                  <p className="ios-caption text-[#06B6D4] uppercase font-bold mb-3">Superpoder</p>
                  <p className="ios-body text-[#111827]">{result.synergy.power}</p>
                </div>
                <div>
                  <p className="ios-caption text-[#EF4444] uppercase font-bold mb-3">Alerta</p>
                  <p className="ios-body text-[#111827]">{result.synergy.alert}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <p className="ios-caption text-[#06B6D4] uppercase font-bold mb-3">Metáfora Operacional</p>
                <p className="ios-body text-[#4B5563] italic text-base">{result.synergy.metaphor}</p>
              </div>
            </div>

            {/* Núcleos Dimensionais - Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {result.selectedDimensions.map((dimId, idx) => (
                <div 
                  key={dimId} 
                  className="p-5 spring-in rounded-2xl bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #E5E7EB',
                    animationDelay: `${0.2 + idx * 0.1}s`,
                  }}
                >
                  <p className="ios-caption text-[#06B6D4] uppercase font-bold mb-2">Dimensão {idx + 1}</p>
                  <p className="ios-body text-[#111827] font-semibold mb-2 text-lg">{dimLabels[dimId]}</p>
                  <p className="ios-caption text-[#22D3EE]">→ {result.profileData[dimId]?.archetype}</p>
                </div>
              ))}
            </div>

            {/* Mermaid Diagram Card */}
            <div 
              className="p-6 mb-6 spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.5s',
              }}
            >
              <h3 className="ios-headline text-[#111827] mb-5 text-2xl font-bold">Diagrama Visual</h3>
              <div 
                className="p-5 rounded-2xl bg-[#F9FAFB]"
                style={{
                  border: '1px solid #E5E7EB',
                }}
              >
                <MermaidDiagram diagram={result.mermaidDiagram} />
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              className="p-6 mb-6 rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setPhase('dimensions');
                    setSelectedDimensions([]);
                    setResponses({});
                    setResult(null);
                    soundManager.playClick();
                  }}
                  className="flex-1 ios-button-primary ios-compact"
                >
                  Explorar de Novo
                </button>
                <button
                  onClick={() => {
                    setPhase('intro');
                    setSelectedDimensions([]);
                    setResponses({});
                    setResult(null);
                    soundManager.playClick();
                  }}
                  className="flex-1 ios-button-secondary ios-compact"
                >
                  Voltar
                </button>
              </div>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return null;
}

export default function IntentSystemPage() {
  return (
    <AgentProvider>
      <IntentSystemContent />
    </AgentProvider>
  );
}
