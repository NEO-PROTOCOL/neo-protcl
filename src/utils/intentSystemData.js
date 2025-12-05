/**
 * Dados do Sistema de Intenção NΞØ Protocol
 * Arquétipos, sinergias e dimensões de ressonância
 */

// Importar partículas do sistema NΞØ.UI
import { particles } from '../nexo-ui';

export const dimensions = [
  {
    id: 'problem_solving',
    title: 'Resolução de Problemas',
    subtitle: '[ Como você navega no caos? ]',
    particle: particles.null, 
    prompt: 'Imagine que você se depara com um quebra-cabeça crítico, algo que parece não ter uma solução óbvia. Não me conte sobre o problema. Em vez disso, descreva a cena interna. O que acontece dentro de você nos primeiros momentos? Quais impulsos, imagens, raciocínios ou sensações surgem? Como a engrenagem começa a girar?',
    color: 'from-blue-600/20 to-cyan-600/10',
  },
  {
    id: 'collaboration',
    title: 'Conexão & Colaboração',
    subtitle: '[ Como você se vincula? ]',
    particle: particles.null, 
    prompt: 'Pense na última vez que você precisou trabalhar ou criar algo com outras pessoas para um objetivo comum. Não me fale sobre o projeto. Descreva seu papel natural nessa teia. O que você automaticamente faz para que a conexão funcione? Você observa, catalisa, estrutura, protege, desafia? Como você se move nesse campo de energias múltiplas?',
    color: 'from-emerald-600/20 to-teal-600/10',
  },
  {
    id: 'creation',
    title: 'Criação & Geração',
    subtitle: '[ Como você manifesta? ]',
    particle: particles.null, 
    prompt: 'Pense em um momento em que você gerou algo que sentiu como verdadeiramente seu – uma ideia, um projeto, uma solução, uma arte. Ignore o resultado final. Descreva a fagulha e o combustível. De onde veio o impulso inicial? E, mais importante, como ele cresceu? Foi uma explosão, uma montagem lenta, uma decantação? O que o processo pediu de você?',
    color: 'from-purple-600/20 to-pink-600/10',
  },
];

export const archetypeDatabase = {
  problem_solving: {
    'Engenheiro': {
      keywords: ['desmontar', 'partes', 'sistema', 'mapa', 'lógica', 'padrão', 'eficiente', 'peça', 'funcionamento', 'estrutura', 'arquitetura', 'componentes'],
      intent: 'Controlar o caos através da estrutura',
      strengths: 'Clareza analítica, solução escalável',
      risks: 'Paralisia por análise, perda do contexto humano',
    },
    'Contador de Histórias': {
      keywords: ['história', 'analogia', 'significado', 'exemplo', 'metáfora', 'sentido', 'como se fosse', 'personagem', 'reenquadrar', 'narrativa'],
      intent: 'Encontrar sentido para navegar no caos',
      strengths: 'Comunicabilidade, adaptabilidade, resiliência',
      risks: 'Solução muito particular, falta de rigor generalizável',
    },
    'Cirurgião': {
      keywords: ['isolar', 'cortar', 'intervir', 'rápido', 'núcleo', 'pressão', 'fonte', 'doloroso mas necessário', 'extrair', 'disfunção'],
      intent: 'Eliminar a disfunção para restaurar a saúde',
      strengths: 'Decisão, coragem, foco absoluto',
      risks: 'Danos colaterais, visão de curto prazo, trauma',
    },
    'Jardineiro': {
      keywords: ['nutrir', 'ambiente', 'crescer', 'paciência', 'ecossistema', 'processo', 'contexto', 'fertilizar', 'observar', 'cultivar'],
      intent: 'Cultivar condições para que a solução emergia',
      strengths: 'Sustentabilidade, solução orgânica, holismo',
      risks: 'Lentidão, passividade, falta de ação direta',
    },
    'Jogador': {
      keywords: ['desafio', 'regras', 'estratégia', 'vencer', 'tática', 'recompensa', 'movimento', 'oponente', 'partida', 'competição'],
      intent: 'Transformar o caos em um jogo a ser vencido',
      strengths: 'Inovação, motivação alta, pensamento tático',
      risks: 'Banalização, competitividade tóxica, falta de profundidade',
    },
  },
  collaboration: {
    'Catalisador': {
      keywords: ['pergunta óbvia', 'apontar', 'inconsistência', 'desafiar', 'atrito', 'verdade', 'ponto cego', 'lógica', 'inconsistência'],
      intent: 'Acelerar a verdade (ou o conflito) para chegar à clareza',
      strengths: 'Honestidade radical, prevenção de erros grupais',
      risks: 'Criar resistência, ser visto como disruptor negativo',
    },
    'Costureiro': {
      keywords: ['conectar', 'harmonia', 'ouvidos', 'ponte', 'traduzir', 'sentir', 'relacionar', 'grupo', 'teia'],
      intent: 'Criar e fortalecer a rede de conexões',
      strengths: 'Coesão, alta inteligência emocional, mediação',
      risks: 'Evitar conflitos necessários, desgaste emocional',
    },
    'Estrategista': {
      keywords: ['meta clara', 'dividir trabalho', 'eficiência', 'prazo', 'função', 'recursos', 'evitar perda de tempo', 'organizar'],
      intent: 'Otimizar o sistema humano para o resultado',
      strengths: 'Produtividade, foco, organização',
      risks: 'Visão transacional, negligenciar a motivação intrínseca',
    },
    'Especialista Reserva': {
      keywords: ['retaguarda', 'observar', 'entrar quando necessário', 'único', 'técnico', 'específico', 'não forçar participação', 'autonomia'],
      intent: 'Oferecer excelência pontual, preservando autonomia',
      strengths: 'Alta qualidade, foco profundo, sem dispersão',
      risks: 'Isolamento, parecer descomprometido, perda de contexto',
    },
    'Guardião': {
      keywords: ['proteger', 'cuidar', 'alerta', 'integridade', 'valores', 'defender', 'conflito interno', 'lealdade'],
      intent: 'Proteger o grupo de ameaças internas e externas',
      strengths: 'Segurança, confiança, cultura forte',
      risks: 'Desconfiança excessiva, resistência a mudanças',
    },
  },
  creation: {
    'Visionário': {
      keywords: ['imagem', 'visão', 'insight', 'traduzir', 'forma exata', 'fidelidade', 'ver claramente', 'perseguir', 'visão interna perfeita'],
      intent: 'Materializar uma visão interna perfeita',
      strengths: 'Clareza de direção, alta consistência estética/conceitual',
      risks: 'Rigidez, frustração com limitações do mundo real, bloqueio do "não ficou igual"',
    },
    'Alquimista': {
      keywords: ['conexão bizarra', 'juntar cacos', 'colisão', 'soldar', 'união', 'hibridização', 'metamorfose', 'fusão do inesperado'],
      intent: 'Criar através da fusão do inesperado',
      strengths: 'Inovação radical, pensamento lateral, surpreender',
      risks: 'Resultados podem ser caóticos ou incomunicáveis, falta de foco',
    },
    'Agricultor': {
      keywords: ['fermentar', 'semente', 'alimentar', 'processo', 'deixar amadurecer', 'colher no momento certo', 'ecossistema interno', 'maturação orgânica'],
      intent: 'Cultivar ideias até a maturação orgânica',
      strengths: 'Profundidade, timing natural, trabalhos ricos e complexos',
      risks: 'Lentidão extrema, passividade (esperar demais), dificuldade com prazos',
    },
    'Artesão da Jaula': {
      keywords: ['restrição', 'limite', 'forma fixa', 'problema', 'puzzle', 'jogo', 'dançar dentro da jaula', 'estrutura como impulso'],
      intent: 'Encontrar liberdade expressiva dentro dos limites',
      strengths: 'Alta adaptabilidade, criatividade prática, excelência em craft',
      risks: 'Pode se sentir sem direção própria, dependente de briefings externos',
    },
    'Explosivo': {
      keywords: ['pressão', 'explosão', 'urgência', 'tudo de uma vez', 'catártico', 'fluxo intenso', 'não conseguir segurar', 'evento catalítico'],
      intent: 'Liberar energia acumulada em um evento catalítico',
      strengths: 'Potência, impacto emocional, conclusão rápida',
      risks: 'Esgotamento pós-obra, inconsistência, dificuldade em projetos longos',
    },
  },
};

export const synergyTable = {
  // Sinergias existentes (mantidas)
  'Alquimista-Costureiro-Agricultor': {
    name: 'Narrador de Comunidades',
    intent: 'Cultivar significado compartilhado. Histórias que nutrem tecido social.',
    power: 'Coesão Profunda. Pertencimento visceral.',
    alert: 'Inércia. Pode evitar conflitos que nutriam crescimento.',
    metaphor: 'Um guardião de mitos, plantando histórias que colhem culturas.',
  },
  'Artesão da Jaula-Costureiro-Visionário': {
    name: 'Arquiteto de Futuros Comunitários',
    intent: 'Projetar espaços onde visão e comunidade convergem com precisão estrutural.',
    power: 'Materializa utopias com plantas baixas. Concreto + Comunidade.',
    alert: 'Pode priorizar a obra sobre as pessoas. Perfeccionismo coletivo.',
    metaphor: 'Um engenheiro de templos sociais, traçando o futuro em código e consciência.',
  },
  'Artesão da Jaula-Estrategista-Engenheiro': {
    name: 'Arquiteto de Sistemas Vivos',
    intent: 'Projetar estruturas que evoluem sob restrição. Ordem que respira.',
    power: 'Eficiência Adaptativa. Rigidez + Espontaneidade.',
    alert: 'Risco de sufocação. Sistema perfeito pode matar a vida.',
    metaphor: 'Um engenheiro de ecossistemas dançando dentro da própria arquitetura.',
  },
  'Explosivo-Catalisador-Cirurgião': {
    name: 'Agente de Choque Transformacional',
    intent: 'Forçar rupturas que regeneram. Destruição como criação.',
    power: 'Mudança Radical. Transforma em semanas o que levaria anos.',
    alert: 'Trauma. Deixa cicatrizes. Queima pontes.',
    metaphor: 'Um cirurgião de campo em crise, cortando com uma mão e iluminando com a outra.',
  },
  'Visionário-Guardião-Jardineiro': {
    name: 'Custódio do Futuro Vislumbrado',
    intent: 'Proteger e nutrir visão de longo prazo até maturação.',
    power: 'Visão Sustentável. Futuro desejável materializado.',
    alert: 'Dogmatismo. Defesa da visão pode gerar rigidez.',
    metaphor: 'Um profeta pragmático, construindo o jardim do amanhã com vigilância terna.',
  },
  // Novas sinergias adicionadas
  'Jogador-Especialista Reserva-Alquimista': {
    name: 'Mestre do Jogo Oculto',
    intent: 'Dominar sistemas através de manobras pontuais e inesperadas.',
    power: 'Vantagem Inimaginável. Surpreende com soluções de nicho e altamente eficazes.',
    alert: 'Desconexão. O foco em jogos paralelos pode afastá-lo do "jogo principal" do grupo.',
    metaphor: 'Um enxadrista que vence não no tabuleiro principal, mas fundindo regras de jogos diferentes.',
  },
  'Contador de Histórias-Costureiro-Agricultor': {
    name: 'Narrador de Comunidades',
    intent: 'Cultivar significado compartilhado para nutrir o tecido social.',
    power: 'Cohosão Profunda. Cria laços fortes e senso de pertencimento.',
    alert: 'Inércia. Pode evitar conflitos necessários para preservar a "história bonita".',
    metaphor: 'Um guardião de mitos, que planta histórias e colhe cultura grupal.',
  },
  'Engenheiro-Estrategista-Artesão da Jaula': {
    name: 'Arquiteto de Sistemas Vivos',
    intent: 'Projetar estruturas otimizadas que evoluem sob restrição.',
    power: 'Eficiência Adaptativa. Sistemas que são robustos e flexíveis.',
    alert: 'Sufocamento. O foco no sistema perfeito pode matar a espontaneidade orgânica.',
    metaphor: 'Um engenheiro de ecossistemas, que projeta com regras rígidas para gerar vida adaptativa.',
  },
};

/**
 * Analisa texto e retorna o arquétipo com maior ressonância
 */
export function analyzeText(text, dimensionId) {
  const archetypes = archetypeDatabase[dimensionId];
  if (!archetypes) return null;

  const scores = {};
  const lowerText = text.toLowerCase();

  Object.entries(archetypes).forEach(([archetype, data]) => {
    const matchCount = data.keywords.filter((kw) => lowerText.includes(kw)).length;
    scores[archetype] = matchCount;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0] && sorted[0][1] > 0 ? sorted[0][0] : Object.keys(archetypes)[0];
}

/**
 * Gera o padrão integrado (sinergia) baseado nos arquétipos
 */
export function generateSynergy(profileData, selectedDimensions) {
  const archetypeKey = selectedDimensions
    .map((dimId) => profileData[dimId]?.archetype)
    .filter(Boolean)
    .sort()
    .join('-');

  return (
    synergyTable[archetypeKey] || {
      name: 'Padrão Único Emergente',
      intent: 'Uma combinação rara que revela arquitetura estratégica singular.',
      power: 'Criatividade em intersecção. Opera onde ninguém mais consegue.',
      alert: 'Risco de dispersão. Pode ser tudo para todos.',
      metaphor: 'Um navegador de dimensões, operando na intersecção do improvável.',
    }
  );
}

/**
 * Gera diagrama Mermaid do padrão integrado
 */
export function generateMermaidDiagram(profileData, synergy, selectedDimensions) {
  const dimLabels = {
    problem_solving: 'Resolução',
    collaboration: 'Colaboração',
    creation: 'Criação',
  };

  let diagram = 'graph TD\n';
  diagram += '    subgraph NUCLEOS["Seus Núcleos Estratégicos"]\n';

  selectedDimensions.forEach((dimId, idx) => {
    const archetype = profileData[dimId]?.archetype || 'Desconhecido';
    diagram += `        D${idx + 1}["<b>${dimLabels[dimId]}</b><br/>${archetype}"]\n`;
  });

  diagram += '    end\n\n';

  selectedDimensions.forEach((_, idx) => {
    diagram += `    D${idx + 1} -->|Converge| INTEGRADO\n`;
  });

  diagram += `    INTEGRADO["<b>PADRÃO INTEGRADO</b><br/>${synergy.name}<br/><br/><i>${synergy.intent}</i>"]\n`;
  diagram += `    INTEGRADO -->|Potência| POW["${synergy.power}"]\n`;
  diagram += `    INTEGRADO -->|Alerta| ALT["${synergy.alert}"]\n`;

  diagram += '    style INTEGRADO fill:#00CFFF,stroke:#00FF99,stroke-width:3px,color:#0A0A0A,font-weight:bold\n';
  diagram += '    style POW fill:#00FF99,stroke:#00CFFF,color:#0A0A0A\n';
  diagram += '    style ALT fill:#FF6B6B,stroke:#00CFFF,color:#fff\n';

  return diagram;
}

