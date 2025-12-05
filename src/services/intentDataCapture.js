/**
 * Serviço de Captura de Dados do Intent System para IPFS
 * Salva dados anonimizados no IPFS via Lighthouse
 */

/**
 * Gera hash simples de uma string (para anonimização)
 * @param {string} str - String para hashear
 * @returns {string} Hash hexadecimal
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Anonimiza endereço de wallet (mantém apenas hash)
 * @param {string} walletAddress - Endereço da wallet
 * @returns {string} Hash anonimizado
 */
function hashWallet(walletAddress) {
  if (!walletAddress) return null;
  // Usar apenas primeiros 6 e últimos 4 caracteres + hash
  const prefix = walletAddress.substring(0, 6);
  const suffix = walletAddress.substring(walletAddress.length - 4);
  const hash = hashString(walletAddress);
  return `${prefix}...${suffix}_${hash.substring(0, 8)}`;
}

/**
 * Gera hash do código Mermaid (para referência sem salvar o código completo)
 * @param {string} mermaidCode - Código Mermaid
 * @returns {string} Hash do código
 */
function hashMermaid(mermaidCode) {
  if (!mermaidCode) return null;
  return hashString(mermaidCode).substring(0, 16);
}

/**
 * Anonimiza dados do Intent antes de salvar no IPFS
 * Remove texto livre e mantém apenas padrões identificados
 * @param {Object} intentData - Dados completos do Intent
 * @param {string} walletAddress - Endereço da wallet (opcional)
 * @returns {Object} Dados anonimizados
 */
export function anonymizeIntentData(intentData, walletAddress = null) {
  const anonymized = {
    version: '1.0',
    timestamp: Date.now(),
    privacy: {
      textResponses: false, // Nunca salvar texto livre
      anonymized: true,
      consentGiven: true
    }
  };

  // Hash do wallet (anonimizado)
  if (walletAddress) {
    anonymized.userHash = hashWallet(walletAddress);
  }

  // Dados de contato (se fornecidos - apenas para "Ver Completo")
  if (intentData.userData) {
    anonymized.contact = {
      email: intentData.userData.email,
      phone: intentData.userData.phone || null,
      github: intentData.userData.github || null,
    };
    // Marcar que este é um mapeamento completo
    anonymized.complete = true;
  }

  // Arquétipos identificados (sem texto livre)
  anonymized.archetypes = Object.keys(intentData.profileData || {}).map(dimId => ({
    dimension: dimId,
    archetype: intentData.profileData[dimId]?.archetype || null,
    intent: intentData.profileData[dimId]?.intent || null
  }));

  // Padrão integrado (synergy)
  if (intentData.synergy) {
    anonymized.synergy = {
      name: intentData.synergy.name,
      intent: intentData.synergy.intent,
      power: intentData.synergy.power,
      alert: intentData.synergy.alert,
      metaphor: intentData.synergy.metaphor
    };
  }

  // Dimensões selecionadas
  anonymized.dimensions = intentData.selectedDimensions || [];

  // Hash do código Mermaid (não o código completo)
  if (intentData.mermaidDiagram) {
    anonymized.mermaidHash = hashMermaid(intentData.mermaidDiagram);
  }

  return anonymized;
}

/**
 * Salva dados anonimizados do Intent no IPFS via Lighthouse
 * @param {Object} intentData - Dados completos do Intent
 * @param {string} walletAddress - Endereço da wallet (opcional, para anonimização)
 * @returns {Promise<string>} CID do IPFS
 */
export async function saveIntentToIPFS(intentData, walletAddress = null) {
  const lighthouseApiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY;

  if (!lighthouseApiKey) {
    throw new Error('VITE_LIGHTHOUSE_API_KEY não configurada. Configure no .env');
  }

  try {
    // Anonimizar dados
    const anonymizedData = anonymizeIntentData(intentData, walletAddress);

    // Converter para JSON
    const jsonData = JSON.stringify(anonymizedData, null, 2);

    // Importar SDK do Lighthouse
    const lighthouse = await import('@lighthouse-web3/sdk');

    // Criar Blob do JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const file = new File([blob], `intent-${Date.now()}.json`, {
      type: 'application/json'
    });

    // Fazer upload para IPFS
    // O método upload do Lighthouse aceita File ou diretório
    const response = await lighthouse.upload(
      file,
      lighthouseApiKey
    );

    // Extrair CID da resposta
    const cid = response.data?.Hash || 
                response.Hash || 
                response.cid || 
                response.data?.cid ||
                response.data?.hash;

    if (!cid) {
      console.error('Resposta do Lighthouse:', response);
      throw new Error('CID não encontrado na resposta do Lighthouse');
    }

    console.log('✅ Intent salvo no IPFS:', cid);
    console.log('🔗 Acesse:', `https://gateway.lighthouse.storage/ipfs/${cid}`);

    return cid;

  } catch (error) {
    console.error('❌ Erro ao salvar Intent no IPFS:', error);
    throw error;
  }
}

/**
 * Verifica se o Lighthouse está configurado
 * @returns {boolean} true se configurado
 */
export function isLighthouseConfigured() {
  return !!import.meta.env.VITE_LIGHTHOUSE_API_KEY;
}

/**
 * Obtém link do gateway IPFS para um CID
 * @param {string} cid - CID do IPFS
 * @returns {string} URL do gateway
 */
export function getIPFSGatewayUrl(cid) {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
}

