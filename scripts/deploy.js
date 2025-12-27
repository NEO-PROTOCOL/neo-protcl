import hre from 'hardhat'
import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Script de Deploy dos Contratos NΞØ Protocol
 *
 * REQUISITOS:
 * - .env configurado com PRIVATE_KEY e RPC_URL
 * - Wallet com ETH suficiente para gas
 * - Endereço do Guardian (para NodeRegistry)
 */

async function main() {
  const { ethers: hreEthers } = hre

  console.log('🚀 Iniciando deploy dos contratos NΞØ Protocol...\n')

  // Verificar variáveis de ambiente
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) {
    throw new Error('❌ PRIVATE_KEY não configurada no .env')
  }

  const network = await hreEthers.provider.getNetwork()
  console.log(`📡 Rede: ${network.name} (Chain ID: ${network.chainId})\n`)

  // Obter signer
  const [deployer] = await hreEthers.getSigners()
  console.log(`👤 Deployer: ${deployer.address}`)
  const balance = await hreEthers.provider.getBalance(deployer.address)
  console.log(`💰 Saldo: ${ethers.utils.formatEther(balance)} ETH\n`)

  if (balance === 0n) {
    throw new Error('❌ Wallet sem saldo. Adicione ETH para gas.')
  }

  // ============================================
  // 1. NodeRegistry (NHIP-001)
  // ============================================
  console.log('📝 Deployando NodeRegistry...')

  // Guardian: endereço que controlará o registro
  // Pode ser o deployer ou outro endereço confiável
  const GUARDIAN_ADDRESS =
    process.env.NODE_REGISTRY_GUARDIAN || deployer.address

  console.log(`   Guardian: ${GUARDIAN_ADDRESS}`)

  const NodeRegistry = await hreEthers.getContractFactory('NodeRegistry')
  const nodeRegistry = await NodeRegistry.deploy(GUARDIAN_ADDRESS)

  await nodeRegistry.deployed()
  const nodeRegistryAddress = nodeRegistry.address

  console.log(`✅ NodeRegistry deployed to: ${nodeRegistryAddress}\n`)

  // ============================================
  // 2. ReputationBootstrap
  // ============================================
  console.log('📝 Deployando ReputationBootstrap...')

  const ReputationBootstrap = await hreEthers.getContractFactory(
    'ReputationBootstrap'
  )
  const reputationBootstrap = await ReputationBootstrap.deploy()

  await reputationBootstrap.deployed()
  const reputationBootstrapAddress = reputationBootstrap.address

  console.log(
    `✅ ReputationBootstrap deployed to: ${reputationBootstrapAddress}\n`
  )

  // ============================================
  // 3. NodeAdmission (depende de ReputationBootstrap)
  // ============================================
  console.log('📝 Deployando NodeAdmission...')

  const NodeAdmission = await hreEthers.getContractFactory('NodeAdmission')
  const nodeAdmission = await NodeAdmission.deploy(
    reputationBootstrapAddress
  )

  await nodeAdmission.deployed()
  const nodeAdmissionAddress = nodeAdmission.address

  console.log(`✅ NodeAdmission deployed to: ${nodeAdmissionAddress}\n`)

  // ============================================
  // 4. NodeDesignerReview
  // ============================================
  console.log('📝 Deployando NodeDesignerReview...')

  const NodeDesignerReview = await hreEthers.getContractFactory(
    'NodeDesignerReview'
  )
  const nodeDesignerReview = await NodeDesignerReview.deploy()

  await nodeDesignerReview.deployed()
  const nodeDesignerReviewAddress = nodeDesignerReview.address

  console.log(
    `✅ NodeDesignerReview deployed to: ${nodeDesignerReviewAddress}\n`
  )

  // ============================================
  // 5. NeoNodeAdmission
  // ============================================
  console.log('📝 Deployando NeoNodeAdmission...')

  const NeoNodeAdmission = await hreEthers.getContractFactory(
    'NeoNodeAdmission'
  )
  const neoNodeAdmission = await NeoNodeAdmission.deploy()

  await neoNodeAdmission.deployed()
  const neoNodeAdmissionAddress = neoNodeAdmission.address

  console.log(
    `✅ NeoNodeAdmission deployed to: ${neoNodeAdmissionAddress}\n`
  )

  // ============================================
  // Resumo Final
  // ============================================
  console.log('='.repeat(60))
  console.log('📋 RESUMO DO DEPLOY')
  console.log('='.repeat(60))
  console.log(`Rede: ${network.name} (Chain ID: ${network.chainId})`)
  console.log(`Deployer: ${deployer.address}`)
  console.log(`Guardian: ${GUARDIAN_ADDRESS}`)
  console.log('')
  console.log('Endereços dos Contratos:')
  console.log('─'.repeat(60))
  console.log(`NodeRegistry:           ${nodeRegistryAddress}`)
  console.log(`ReputationBootstrap:    ${reputationBootstrapAddress}`)
  console.log(`NodeAdmission:          ${nodeAdmissionAddress}`)
  console.log(`NodeDesignerReview:     ${nodeDesignerReviewAddress}`)
  console.log(`NeoNodeAdmission:       ${neoNodeAdmissionAddress}`)
  console.log('='.repeat(60))
  console.log('')

  // Salvar em arquivo .env.local (opcional)
  console.log('💾 Copie os endereços acima para seu .env ou .env.local:')
  console.log('')
  console.log(`NODE_REGISTRY_ADDRESS=${nodeRegistryAddress}`)
  console.log(
    `REPUTATION_BOOTSTRAP_ADDRESS=${reputationBootstrapAddress}`
  )
  console.log(`NODE_ADMISSION_ADDRESS=${nodeAdmissionAddress}`)
  console.log(
    `NODE_DESIGNER_REVIEW_ADDRESS=${nodeDesignerReviewAddress}`
  )
  console.log(
    `NEO_NODE_ADMISSION_ADDRESS=${neoNodeAdmissionAddress}`
  )
  console.log('')
  console.log('⚠️  IMPORTANTE: Guarde esses endereços com segurança!')
  console.log('')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Erro no deploy:', error)
    process.exit(1)
  })

