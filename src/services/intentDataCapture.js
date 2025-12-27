/**
 * Serviço de Captura de Dados do Intent System para IPFS
 * Salva dados anonimizados no IPFS via Lighthouse
 */

/**
 * Valida e sanitiza string antes de hashear
 * @param {string} str - String para validar
 * @returns {string} String validada
 */
function validateString(str) {
  if (typeof str !== 'string') return ''
  // Limitar tamanho para prevenir DoS
  const MAX_LENGTH = 10000
  return str.substring(0, MAX_LENGTH)
}

/**
 * Gera hash simples de uma string (para anonimização)
 * @param {string} str - String para hashear
 * @returns {string} Hash hexadecimal
 */
function hashString(str) {
  const validated = validateString(str)
  if (!validated) return '0'
  
  let hash = 0
  for (let i = 0; i < validated.length; i++) {
    const char = validated.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}

/**
 * Anonimiza endereço de wallet (mantém apenas hash)
 * @param {string} walletAddress - Endereço da wallet
 * @returns {string} Hash anonimizado
 */
function hashWallet(walletAddress) {
  if (!walletAddress) return null
  // Usar apenas primeiros 6 e últimos 4 caracteres + hash
  const prefix = walletAddress.substring(0, 6)
  const suffix = walletAddress.substring(walletAddress.length - 4)
  const hash = hashString(walletAddress)
  return `${prefix}...${suffix}_${hash.substring(0, 8)}`
}

/**
 * Gera hash do código Mermaid (para referência sem salvar o código completo)
 * @param {string} mermaidCode - Código Mermaid
 * @returns {string} Hash do código
 */
function hashMermaid(mermaidCode) {
  if (!mermaidCode) return null
  return hashString(mermaidCode).substring(0, 16)
}

/**
 * Formata dados do Intent antes de salvar no IPFS
 * Mantém padrões identificados e pode incluir texto bruto se solicitado
 * @param {Object} intentData - Dados completos do Intent
 * @param {string} walletAddress - Endereço da wallet (opcional)
 * @param {boolean} complete - Indica se é um mapeamento completo (com dados de contato)
 * @param {Object} contactData - Dados de contato (email, phone, github) se for completo
 * @param {boolean} includeRawText - Se true, inclui respostas em texto livre
 * @returns {Object} Dados anonimizados
 */
export function anonymizeIntentData(
  intentData,
  walletAddress = null,
  complete = false,
  contactData = null,
  includeRawText = true
) {
  const timestamp = intentData?.timestamp || Date.now()

  const anonymized = {
    version: '1.0',
    timestamp,
    privacy: {
      textResponses: includeRawText,
      anonymized: !includeRawText,
      consentGiven: true,
      completeMapping: complete,
    },
  }

  // Hash do wallet (anonimizado)
  if (walletAddress) {
    anonymized.userHash = hashWallet(walletAddress)
  }

  // Dados de contato (se fornecidos - apenas para "Ver Completo")
  if (complete && contactData) {
    anonymized.contact = {
      emailHash: contactData.email ? hashString(contactData.email.toLowerCase()) : null,
      phoneHash: contactData.phone ? hashString(contactData.phone) : null,
      githubHash: contactData.github ? hashString(contactData.github.toLowerCase()) : null,
    }
    anonymized.complete = true
  } else if (intentData.userData) {
    // Compatibilidade com formato antigo
    anonymized.contact = {
      emailHash: intentData.userData.email
        ? hashString(intentData.userData.email.toLowerCase())
        : null,
      phoneHash: intentData.userData.phone ? hashString(intentData.userData.phone) : null,
      githubHash: intentData.userData.github
        ? hashString(intentData.userData.github.toLowerCase())
        : null,
    }
    anonymized.complete = true
  }

  // Arquétipos identificados (sem texto livre)
  anonymized.archetypes = Object.keys(intentData.profileData || {}).map(dimId => ({
    dimension: dimId,
    archetype: intentData.profileData[dimId]?.archetype || null,
    intent: intentData.profileData[dimId]?.intent || null,
  }))

  // Padrão integrado (synergy)
  if (intentData.synergy) {
    anonymized.synergy = {
      name: intentData.synergy.name,
      intent: intentData.synergy.intent,
      power: intentData.synergy.power,
      alert: intentData.synergy.alert,
      metaphor: intentData.synergy.metaphor,
    }
  }

  // Dimensões selecionadas
  anonymized.dimensions = intentData.selectedDimensions || []

  // Hash do código Mermaid (não o código completo)
  if (intentData.mermaidDiagram) {
    anonymized.mermaidHash = hashMermaid(intentData.mermaidDiagram)
  }

  // Dados crus (somente se permitido)
  if (includeRawText) {
    anonymized.raw = {
      responses: intentData.responses || null,
      prompts: intentData.prompts || null,
      profileData: intentData.profileData || null,
      synergy: intentData.synergy || null,
      mermaidDiagram: intentData.mermaidDiagram || null,
      selectedDimensions: intentData.selectedDimensions || [],
      runId: intentData.runId || null,
      timestamp,
    }
  }

  return anonymized
}

/**
 * Salva dados anonimizados do Intent no IPFS via Lighthouse
 * @param {Object} intentData - Dados completos do Intent
 * @param {string} walletAddress - Endereço da wallet (opcional, para anonimização)
 * @param {boolean} complete - Indica se é um mapeamento completo (com dados de contato)
 * @param {Object} contactData - Dados de contato (email, phone, github) se for completo
 * @param {boolean} includeRawText - Se true, inclui respostas em texto livre
 * @returns {Promise<string>} CID do IPFS
 */
/**
 * Valida dados de intent antes de processar
 * @param {Object} intentData - Dados do intent
 * @returns {Object} Dados validados
 */
function validateIntentData(intentData) {
  if (!intentData || typeof intentData !== 'object') {
    throw new Error('Dados de intent inválidos')
  }

  // Limitar tamanho de arrays para prevenir memory issues
  const validated = { ...intentData }

  if (validated.responses && Array.isArray(validated.responses)) {
    validated.responses = validated.responses.slice(0, 100)
  }

  if (validated.prompts && Array.isArray(validated.prompts)) {
    validated.prompts = validated.prompts.slice(0, 100)
  }

  if (validated.selectedDimensions && Array.isArray(validated.selectedDimensions)) {
    validated.selectedDimensions = validated.selectedDimensions.slice(0, 50)
  }

  return validated
}

export async function saveIntentToIPFS(
  intentData,
  walletAddress = null,
  complete = false,
  contactData = null,
  includeRawText = true
) {
  const lighthouseApiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY

  if (!lighthouseApiKey) {
    throw new Error('VITE_LIGHTHOUSE_API_KEY não configurada. Configure no .env')
  }

  // Validar dados antes de processar
  const validatedIntentData = validateIntentData(intentData)

  // Validar wallet address
  if (walletAddress && typeof walletAddress === 'string') {
    // Validar formato básico de endereço Ethereum
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      throw new Error('Endereço de wallet inválido')
    }
  }

  try {
    if (import.meta.env.DEV) {
      console.log('📤 Iniciando upload para IPFS...')
    }

    // Anonimizar ou não, conforme flag
    const anonymizedData = anonymizeIntentData(
      validatedIntentData,
      walletAddress,
      complete,
      contactData,
      includeRawText
    )

    // Converter para JSON com limite de tamanho
    const jsonData = JSON.stringify(anonymizedData, null, 2)
    
    // Validar tamanho do JSON (prevenir DoS)
    const MAX_JSON_SIZE = 10 * 1024 * 1024 // 10MB
    if (jsonData.length > MAX_JSON_SIZE) {
      throw new Error(`Dados muito grandes (máximo ${MAX_JSON_SIZE / 1024 / 1024}MB)`)
    }

    if (import.meta.env.DEV) {
      console.log('📋 Dados anonimizados preparados:', {
        version: anonymizedData.version,
        timestamp: anonymizedData.timestamp,
        archetypes: anonymizedData.archetypes?.length || 0,
        hasSynergy: !!anonymizedData.synergy,
        complete: anonymizedData.complete || false,
      })
    }

    // Buffer já está disponível globalmente via main.jsx
    // Não é necessário import dinâmico aqui

    // Importar SDK do Lighthouse com timeout
    const lighthousePromise = import('@lighthouse-web3/sdk')
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout ao importar SDK do Lighthouse')), 10000)
    })

    const lighthouse = await Promise.race([lighthousePromise, timeoutPromise])
    
    if (import.meta.env.DEV) {
      console.log('✅ SDK do Lighthouse importado')
    }

    // Criar Blob do JSON
    const blob = new Blob([jsonData], { type: 'application/json' })
    const file = new File([blob], `intent-${Date.now()}.json`, {
      type: 'application/json',
    })
    
    if (import.meta.env.DEV) {
      console.log('📦 Arquivo criado:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`)
    }

    // Fazer upload para IPFS com timeout
    if (import.meta.env.DEV) {
      console.log('🚀 Fazendo upload para Lighthouse...')
    }
    
    // SDK no browser espera um FileList/array; enviar array evita erro "files2 is not iterable"
    const uploadPromise = lighthouse.upload([file], lighthouseApiKey)
    const uploadTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout ao fazer upload para IPFS')), 60000) // 60 segundos
    })

    const response = await Promise.race([uploadPromise, uploadTimeoutPromise])

    if (import.meta.env.DEV) {
      console.log('📥 Resposta do Lighthouse recebida:', {
        hasData: !!response.data,
        hasHash: !!response.Hash,
        keys: Object.keys(response),
      })
    }

    // Extrair CID da resposta
    const cid =
      response.data?.Hash ||
      response.Hash ||
      response.cid ||
      response.data?.cid ||
      response.data?.hash

    if (!cid) {
      if (import.meta.env.DEV) {
        console.error('❌ Resposta completa do Lighthouse:', JSON.stringify(response, null, 2))
      }
      throw new Error(
        `CID não encontrado na resposta do Lighthouse. Estrutura: ${Object.keys(response).join(', ')}`
      )
    }

    if (import.meta.env.DEV) {
      console.log('✅ Intent salvo no IPFS:', cid)
      console.log('🔗 Acesse:', `https://cloudflare-ipfs.com/ipfs/${cid}`)
    }

    return cid
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('❌ Erro ao salvar Intent no IPFS:', error)
    }

    // Melhorar mensagem de erro para o usuário
    let errorMessage = 'Erro ao salvar no IPFS'

    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      errorMessage = 'API Key inválida ou expirada. Verifique VITE_LIGHTHOUSE_API_KEY'
    } else if (error.message.toLowerCase().includes('trial')) {
      errorMessage =
        'Trial do Lighthouse expirou. Gere uma nova API Key em lighthouse.storage e atualize VITE_LIGHTHOUSE_API_KEY'
    } else if (error.message.includes('Network') || error.message.includes('fetch')) {
      errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente'
    } else if (error.message.includes('CID não encontrado')) {
      errorMessage = 'Resposta inesperada do Lighthouse. Tente novamente'
    } else {
      errorMessage = error.message || 'Erro desconhecido ao salvar no IPFS'
    }

    throw new Error(errorMessage)
  }
}

/**
 * Verifica se o Lighthouse está configurado
 * @returns {boolean} true se configurado
 */
export function isLighthouseConfigured() {
  return !!import.meta.env.VITE_LIGHTHOUSE_API_KEY
}

/**
 * Obtém link do gateway IPFS para um CID
 * Prioriza o Gateway Dedicado do .env (Pinata) e usa Cloudflare como fallback
 * @param {string} cid - CID do IPFS
 * @returns {string} URL do gateway
 */
export function getIPFSGatewayUrl(cid) {
  if (!cid) return ''

  // Limpar CID se vier com prefixo ipfs://
  const cleanCid = cid.replace('ipfs://', '')

  const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY

  // Se houver gateway dedicado configurado, usa ele
  if (pinataGateway && pinataGateway.trim().length > 0) {
    return `https://${pinataGateway}/ipfs/${cleanCid}`
  }

  // Fallback para Cloudflare (Público)
  return `https://cloudflare-ipfs.com/ipfs/${cleanCid}`
}
