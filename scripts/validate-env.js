#!/usr/bin/env node

/**
 * Validação de Variáveis de Ambiente para Build de Produção
 *
 * Este script valida se as variáveis de ambiente críticas estão configuradas
 * antes de permitir o build de produção.
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Carregar variáveis de ambiente
config({ path: join(rootDir, '.env') })

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production')
const isCI =
  process.env.CI === 'true' ||
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.CIRCLECI === 'true'

/**
 * Valida se uma string é um endereço Ethereum válido
 * @param {string} address - Endereço para validar
 * @returns {boolean}
 */
function isValidEthereumAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Valida se um valor não é um placeholder genérico
 * @param {string} value - Valor para validar
 * @returns {boolean}
 */
function isPlaceholder(value) {
  if (!value) return true
  const lowerValue = value.toLowerCase()
  return (
    lowerValue.includes('your-') ||
    lowerValue.includes('here') ||
    lowerValue.includes('example') ||
    lowerValue.includes('replace') ||
    lowerValue.includes('placeholder') ||
    lowerValue.includes('0x0000000000000000000000000000000000000000') ||
    lowerValue.includes('0xcon') ||
    lowerValue.trim() === ''
  )
}

// Variáveis obrigatórias para produção (bloqueiam build)
// Nota: VITE_THIRDWEB_CLIENT_ID agora é opcional - aplicação usa clientId de dev como fallback
const REQUIRED_VARS = {
  // Removido VITE_THIRDWEB_CLIENT_ID - agora é opcional (aplicação funciona sem ele)
}

// Variáveis críticas para funcionalidades específicas (bloqueiam build se requeridas)
const CRITICAL_VARS = {
  VITE_LIGHTHOUSE_API_KEY: {
    required: false, // Pode ser opcional dependendo do uso
    message: 'VITE_LIGHTHOUSE_API_KEY não configurada - Intent System não funcionará (upload IPFS)',
    validate: value => {
      if (!value || isPlaceholder(value)) return false
      // API keys geralmente têm formato específico
      return value.length > 10
    },
    formatMessage: 'deve ser uma API key válida do Lighthouse',
  },
}

// Variáveis recomendadas (não bloqueiam build, mas geram avisos)
const RECOMMENDED_VARS = {
  VITE_THIRDWEB_CLIENT_ID: {
    message:
      'VITE_THIRDWEB_CLIENT_ID não configurado - usando clientId de desenvolvimento (funcionalidades limitadas)',
    validate: value => {
      if (!value || isPlaceholder(value)) return false
      // Client ID geralmente tem formato específico ou é uma string não vazia
      return value && value.length > 5
    },
    formatMessage: 'deve ser um Client ID válido do Thirdweb (string não vazia)',
  },
  VITE_GEMINI_API_KEY: {
    message: 'VITE_GEMINI_API_KEY não configurado - funcionalidades de IA não funcionarão',
    validate: value => {
      if (!value || isPlaceholder(value)) return false
      return value.length > 10
    },
  },
  VITE_NODE_DESIGNER_REVIEW_ADDRESS: {
    message:
      'VITE_NODE_DESIGNER_REVIEW_ADDRESS não configurado - funcionalidades de revisão podem não funcionar',
    validate: value => {
      if (!value || isPlaceholder(value)) return false
      return isValidEthereumAddress(value)
    },
    formatMessage: 'deve ser um endereço Ethereum válido (0x...)',
  },
  VITE_NEO_TOKEN_ADDRESS_POLYGON: {
    message: 'VITE_NEO_TOKEN_ADDRESS_POLYGON não configurado - Swap widget pode não funcionar',
    validate: value => {
      if (!value || isPlaceholder(value)) return false
      return isValidEthereumAddress(value)
    },
    formatMessage: 'deve ser um endereço Ethereum válido (0x...)',
  },
}

function validateEnv() {
  const errors = []
  const warnings = []

  // Verificar se .env existe
  const envPath = join(rootDir, '.env')
  if (!existsSync(envPath)) {
    if (isProduction && !isCI) {
      errors.push('Arquivo .env não encontrado. Copie .env.example para .env e configure.')
    } else if (isCI) {
      // Em CI, avisos são aceitáveis (variáveis podem estar em secrets)
      warnings.push('Arquivo .env não encontrado em CI. Usando variáveis de ambiente do CI.')
    } else {
      warnings.push('Arquivo .env não encontrado. Usando variáveis do sistema.')
    }
  }

  // Validar variáveis obrigatórias
  for (const [varName, config] of Object.entries(REQUIRED_VARS)) {
    const value = process.env[varName]

    if (!value || isPlaceholder(value)) {
      if (isProduction && !isCI) {
        errors.push(`❌ ${varName}: ${config.message}`)
      } else {
        warnings.push(`⚠️  ${varName}: ${config.message}`)
      }
    } else if (config.validate && !config.validate(value)) {
      const formatMsg = config.formatMessage ? ` (${config.formatMessage})` : ''
      if (isProduction && !isCI) {
        errors.push(`❌ ${varName}: Valor inválido${formatMsg}`)
      } else {
        warnings.push(`⚠️  ${varName}: Valor pode ser inválido${formatMsg}`)
      }
    }
  }

  // Validar variáveis críticas (requeridas apenas em produção)
  for (const [varName, config] of Object.entries(CRITICAL_VARS)) {
    const value = process.env[varName]

    if (!value || isPlaceholder(value)) {
      if (config.required && isProduction && !isCI) {
        errors.push(`❌ ${varName}: ${config.message}`)
      } else {
        warnings.push(`⚠️  ${varName}: ${config.message}`)
      }
    } else if (config.validate && !config.validate(value)) {
      const formatMsg = config.formatMessage ? ` (${config.formatMessage})` : ''
      if (config.required && isProduction && !isCI) {
        errors.push(`❌ ${varName}: Valor inválido${formatMsg}`)
      } else {
        warnings.push(`⚠️  ${varName}: Valor pode ser inválido${formatMsg}`)
      }
    }
  }

  // Validar variáveis recomendadas
  for (const [varName, config] of Object.entries(RECOMMENDED_VARS)) {
    const value = process.env[varName]

    if (!value || isPlaceholder(value)) {
      warnings.push(`⚠️  ${varName}: ${config.message}`)
    } else if (config.validate && !config.validate(value)) {
      const formatMsg = config.formatMessage ? ` (${config.formatMessage})` : ''
      warnings.push(`⚠️  ${varName}: Valor pode ser inválido${formatMsg}`)
    }
  }

  // Exibir resultados
  if (warnings.length > 0) {
    console.log('\n⚠️  Avisos de Configuração:\n')
    warnings.forEach(w => console.log(`  ${w}`))
  }

  if (errors.length > 0) {
    console.error('\n❌ Erros Críticos de Validação:\n')
    errors.forEach(e => console.error(`  ${e}`))
    console.error('\n💡 Solução:')
    console.error('  1. Copie .env.example para .env (se existir)')
    console.error('  2. Configure todas as variáveis obrigatórias com valores válidos')
    console.error('  3. Verifique se os valores não são placeholders (ex: "your-key-here")')
    console.error('  4. Execute o build novamente\n')
    process.exit(1)
  }

  if (warnings.length === 0 && errors.length === 0) {
    console.log('✅ Todas as variáveis de ambiente estão configuradas corretamente')
  }

  return errors.length === 0
}

// Executar validação
try {
  validateEnv()
} catch (error) {
  console.error('Erro ao validar variáveis de ambiente:', error)
  process.exit(1)
}
