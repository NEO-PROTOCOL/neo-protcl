/**
 * Sistema de sons estilo MIDI/8-bit para o NΞØ Protocol
 * Usa Web Audio API para gerar sons sintéticos estilo anos 90
 */

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.volume = 0.3;
    this.userInteracted = false; // Flag para rastrear se o usuário já interagiu
    this.init();
  }

  init() {
    // Inicializar AudioContext apenas quando necessário (após interação do usuário)
    if (typeof window !== 'undefined' && window.AudioContext) {
      // Criar contexto após qualquer interação REAL do usuário
      const initContext = async (event) => {
        // Só criar se ainda não foi criado e se for uma interação real
        if (!this.audioContext && event && event.isTrusted) {
          try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.userInteracted = true; // Marcar que o usuário interagiu
            
            // Tentar resumir imediatamente após criação (se suspenso)
            if (this.audioContext.state === 'suspended') {
              await this.audioContext.resume();
            }
          } catch (e) {
            // Ignorar erro silenciosamente - AudioContext será criado na próxima interação
            console.debug('AudioContext initialization deferred:', e.message);
          }
        }
      };
      
      // Tentar múltiplos eventos para garantir inicialização
      // Usar { once: true } para garantir que só cria uma vez
      document.addEventListener('click', initContext, { once: true, passive: true });
      document.addEventListener('touchstart', initContext, { once: true, passive: true });
      document.addEventListener('keydown', initContext, { once: true, passive: true });
      document.addEventListener('mousedown', initContext, { once: true, passive: true });
    }
  }

  ensureContext() {
    // Não criar AudioContext aqui - só usar se já foi criado por interação do usuário
    if (!this.audioContext) {
      // Tentar criar se ainda não foi criado (mas só se já houve interação)
      if (this.userInteracted) {
        try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          return false; // Falha ao criar contexto
        }
      } else {
        return false; // Contexto não disponível ainda - aguardando interação do usuário
      }
    }
    
    // Só tentar resumir se já foi interagido com a página
    if (this.audioContext.state === 'suspended') {
      // Tentar resumir silenciosamente, mas não mostrar erro se falhar
      this.audioContext.resume().catch(() => {
        // AudioContext será resumido na próxima interação do usuário
      });
    }
    
    return this.audioContext.state === 'running'; // Só retornar true se estiver rodando
  }

  // Gerar tom beep estilo terminal/retro (mais suave)
  playBeep(frequency = 800, duration = 50, type = 'sine') {
    if (!this.enabled) return;
    
    // Verificar se o contexto está disponível antes de tentar tocar
    if (!this.ensureContext()) {
      return; // Contexto não disponível - silenciosamente retorna
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Envelope mais suave (fade in/out mais gradual)
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.005);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + duration / 2000);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Sound error:', error);
    }
  }

  // Som de clique (beep suave e curto - estilo terminal)
  playClick() {
    this.playBeep(800, 15, 'sine');
  }

  // Som de navegação (beep médio e suave - estilo terminal)
  playNavigate() {
    this.playBeep(500, 40, 'sine');
  }

  // Som de confirmação (beep único mais longo)
  playConfirm() {
    this.playBeep(600, 80, 'sine');
  }

  // Som de erro (beep grave e curto)
  playError() {
    this.playBeep(300, 60, 'sawtooth');
  }

  // Som de página carregada (beep único suave)
  // Só toca se AudioContext já foi ativado por interação do usuário
  playPageLoad() {
    // Só tocar se o usuário já interagiu e o contexto está disponível e rodando
    if (!this.userInteracted || !this.audioContext) {
      return; // Aguardar interação do usuário
    }
    
    // Garantir que o contexto está rodando antes de tocar
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        // Tocar após resumir
        this.playBeep(400, 50, 'sine');
      }).catch(() => {
        // Silenciosamente ignorar se não conseguir resumir
      });
    } else if (this.audioContext.state === 'running') {
      this.playBeep(400, 50, 'sine');
    }
  }

  // Som de hover (beep muito curto e suave)
  playHover() {
    this.playBeep(900, 10, 'sine');
  }

  // Som de acesso (beep médio)
  playAccess() {
    this.playBeep(700, 60, 'sine');
  }

  // Som de pulso (beep longo e suave)
  playPulse() {
    this.playBeep(500, 100, 'sine');
  }

  // Som temático de descoberta
  playDiscovery() {
    if (!this.enabled) return;
    if (!this.ensureContext()) return;
    this.playBeep(880, 120, 'triangle');
    setTimeout(() => this.playBeep(720, 80, 'sine'), 120);
  }

  // Som de integração sistêmica
  playIntegration() {
    if (!this.enabled) return;
    if (!this.ensureContext()) return;
    this.playBeep(520, 180, 'sine');
    setTimeout(() => this.playBeep(640, 100, 'triangle'), 160);
  }

  // Método genérico para tocar sons por nome
  play(soundName) {
    switch (soundName) {
      case 'confirm':
        this.playConfirm();
        break;
      case 'error':
        this.playError();
        break;
      case 'access':
        this.playAccess();
        break;
      case 'pulse':
        this.playPulse();
        break;
      default:
        this.playClick();
    }
  }

  // Som da cabeça da impressora (tick a cada caractere)
  playPrinterHead() {
    if (!this.enabled) return;
    
    // Verificar se o contexto está disponível antes de tentar tocar
    if (!this.ensureContext()) {
      return; // Contexto não disponível - silenciosamente retorna
    }
    
    try {
      
      // Criar um "tick" curto e agudo (mas não muito)
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      // Filtro passa-banda para som de impacto mecânico
      filter.type = 'bandpass';
      filter.frequency.value = 1200; // Frequência média
      filter.Q.value = 2;
      
      oscillator.type = 'square'; // Onda quadrada para som mais "mecânico"
      oscillator.frequency.value = 800;
      
      // Envelope muito curto (tick rápido)
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.008);
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + 0.008);
    } catch (error) {
      console.warn('Printer head sound error:', error);
    }
  }

  // Som do papel avançando (quando linha completa)
  playPaperAdvance() {
    if (!this.enabled) return;
    
    // Verificar se o contexto está disponível antes de tentar tocar
    if (!this.ensureContext()) {
      return; // Contexto não disponível - silenciosamente retorna
    }
    
    try {
      
      // Criar som de papel sendo puxado (ruído filtrado)
      const bufferSize = this.audioContext.sampleRate * 0.05; // 50ms de ruído
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5; // Ruído mais suave
      }
      
      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      
      // Filtro passa-baixa para som mais grave (papel)
      const lowpass = this.audioContext.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 400; // Frequência baixa
      lowpass.Q.value = 1;
      
      const gainNode = this.audioContext.createGain();
      
      // Envelope com fade in/out
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, now + 0.01);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.08, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      noise.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      noise.start(now);
      noise.stop(now + 0.05);
    } catch (error) {
      console.warn('Paper advance sound error:', error);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

// Instância singleton
export const soundManager = new SoundManager();

// Hook para usar em componentes React
export function useSounds() {
  return {
    playClick: () => soundManager.playClick(),
    playNavigate: () => soundManager.playNavigate(),
    playConfirm: () => soundManager.playConfirm(),
    playError: () => soundManager.playError(),
    playPageLoad: () => soundManager.playPageLoad(),
    playHover: () => soundManager.playHover(),
    playPrinterHead: () => soundManager.playPrinterHead(),
    playPaperAdvance: () => soundManager.playPaperAdvance(),
    playDiscovery: () => soundManager.playDiscovery(),
    playIntegration: () => soundManager.playIntegration(),
    toggle: () => soundManager.toggle(),
    enabled: soundManager.enabled
  };
}
