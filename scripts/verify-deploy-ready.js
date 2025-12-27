import dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

/**
 * Script para verificar se está tudo pronto para deploy
 */

async function main() {
  console.log('🔍 Verificando configuração para deploy...\n')

  // 1. Verificar PRIVATE_KEY
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) {
    console.error('❌ PRIVATE_KEY não configurada no .env')
    process.exit(1)
  }

  // Validar formato
  if (!/^0x[a-fA-F0-9]{64}$/.test(privateKey)) {
    console.error('❌ PRIVATE_KEY com formato inválido')
    console.error('   Deve ser: 0x + 64 caracteres hexadecimais')
    process.exit(1)
  }

  console.log('✅ PRIVATE_KEY configurada e válida')

  // 2. Verificar RPC URL
  const baseRpc = process.env.BASE_RPC_URL
  const polygonRpc = process.env.POLYGON_RPC_URL
  const monadRpc = process.env.MONAD_RPC_URL

  if (!baseRpc && !polygonRpc && !monadRpc) {
    console.error('❌ Nenhuma RPC_URL configurada')
    console.error('   Configure BASE_RPC_URL, POLYGON_RPC_URL ou MONAD_RPC_URL')
    process.exit(1)
  }

  if (baseRpc) console.log('✅ BASE_RPC_URL configurada')
  if (polygonRpc) console.log('✅ POLYGON_RPC_URL configurada')
  if (monadRpc) console.log('✅ MONAD_RPC_URL configurada')

  // 3. Verificar Guardian
  const guardian = process.env.NODE_REGISTRY_GUARDIAN
  if (guardian) {
    if (!ethers.isAddress(guardian)) {
      console.error('❌ NODE_REGISTRY_GUARDIAN com formato inválido')
      process.exit(1)
    }
    console.log(`✅ NODE_REGISTRY_GUARDIAN configurado: ${guardian}`)
  } else {
    // Calcular endereço do deployer
    try {
      const wallet = new ethers.Wallet(privateKey)
      console.log(
        `✅ Guardian: Usará deployer (${wallet.address}) - padrão`
      )
    } catch (e) {
      console.log('✅ Guardian: Usará deployer (padrão)')
    }
  }

  // 4. Verificar saldo (se RPC disponível)
  if (baseRpc || polygonRpc || monadRpc) {
    const rpcUrl = baseRpc || polygonRpc || monadRpc
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl)
      const wallet = new ethers.Wallet(privateKey, provider)
      const balance = await provider.getBalance(wallet.address)

      console.log(`\n💰 Wallet: ${wallet.address}`)
      console.log(`💰 Saldo: ${ethers.formatEther(balance)} ETH`)

      if (balance === 0n) {
        console.warn('⚠️  Wallet sem saldo! Adicione ETH para gas fees.')
      } else {
        console.log('✅ Saldo suficiente para deploy')
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível verificar saldo:', error.message)
    }
  }

  // 5. Verificar compilação
  console.log('\n📦 Verificando compilação...')
  try {
    const { execSync } = await import('child_process')
    execSync('npx hardhat compile', { stdio: 'ignore' })
    console.log('✅ Contratos compilados com sucesso')
  } catch (error) {
    console.error('❌ Erro na compilação. Execute: npx hardhat compile')
    process.exit(1)
  }

  console.log('\n✅ Tudo pronto para deploy!')
  console.log('\n📝 Próximos passos:')
  console.log('   1. npx hardhat run scripts/deploy.js --network base')
  console.log('   2. Copiar endereços dos contratos')
  console.log('   3. Salvar em .env.local')
}

main().catch(error => {
  console.error('❌ Erro:', error.message)
  process.exit(1)
})

