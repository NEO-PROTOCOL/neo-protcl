/**
 * Tipagens do protocolo LiveTerminal
 * Define estruturas de dados para comandos, zonas e estado do agente
 */

export type CommandResponse = {
  output: string[];
  triggerZone?: string;
  sound?: "confirm" | "error" | "access" | "pulse";
  updateState?: Partial<AgentState>;
  navigate?: string; // Rota para navegar após o comando
};

export type AgentMemoryEntry = {
  type: string;
  data: Record<string, any>;
  timestamp?: number;
};

export type AgentState = {
  resonance: number;
  zonesUnlocked: string[];
  memory: Array<string | AgentMemoryEntry>;
  zone?: string | null;
  coherence?: number;
  alignment?: number;
};

export type Zone = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  component?: React.ComponentType;
};

export type CommandHandler = (
  command: string,
  state: AgentState,
  updateState: (updates: Partial<AgentState>) => void
) => CommandResponse;
