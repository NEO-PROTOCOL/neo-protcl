#!/usr/bin/env node

/**
 * Script para fazer upload do dist-boot para IPFS usando Lighthouse
 * Retorna o CID para atualizar no ENS
 */

import { existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Carregar variáveis de ambiente
dotenv.config({ path: join(rootDir, '.env') });

// Aceita tanto \ (legado) quanto VITE_LIGHTHOUSE_API_KEY
const LIGHTHOUSE_API_KEY = process.env.VITE_LIGHTHOUSE_API_KEY || process.env.IPFS_API_KEY;

if (!LIGHTHOUSE_API_KEY) {
  console.error('❌ Erro: VITE_LIGHTHOUSE_API_KEY ou IPFS_API_KEY não encontrada no .env');
  console.log('💡 Adicione: VITE_LIGHTHOUSE_API_KEY=sua_api_key_no_.env');
  console.log('   (ou IPFS_API_KEY para compatibilidade com versões antigas)');
  process.exit(1);
}

async function uploadToLighthouse() {
  try {
    console.log('🚀 Iniciando upload para Lighthouse IPFS...\n');

    const distBootPath = join(rootDir, 'dist-boot');
    
    if (!existsSync(distBootPath)) {
      console.error('❌ Erro: dist-boot não encontrado!');
      console.log('💡 Execute primeiro: npm run build:boot');
      process.exit(1);
    }

    console.log('📦 Diretório:', distBootPath);
    console.log('🔑 API Key:', LIGHTHOUSE_API_KEY.substring(0, 10) + '...\n');

    // Usar SDK do Lighthouse (método recomendado)
    console.log('📤 Fazendo upload com Lighthouse SDK...\n');
    
    try {
      const lighthouse = await import('@lighthouse-web3/sdk');
      
      const response = await lighthouse.upload(
        distBootPath,
        LIGHTHOUSE_API_KEY
      );
      
      console.log('📤 Resposta do Lighthouse:', JSON.stringify(response, null, 2));
      
      // Extrair CID da resposta
      let cid = response.data?.Hash || 
                response.Hash || 
                response.cid || 
                response.data?.cid ||
                response.data?.hash;
      
      if (!cid) {
        console.error('❌ CID não encontrado na resposta:', JSON.stringify(response, null, 2));
        throw new Error('CID não encontrado na resposta do Lighthouse');
      }

      console.log('\n✅ Upload concluído com sucesso!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📋 CID para atualizar no ENS:');
      console.log(`   ${cid}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      console.log('🔗 Links de acesso:');
      console.log(`   Lighthouse: https://gateway.lighthouse.storage/ipfs/${cid}`);
      console.log(`   IPFS.io: https://ipfs.io/ipfs/${cid}`);
      console.log(`   Cloudflare: https://cloudflare-ipfs.com/ipfs/${cid}`);
      console.log(`   ENS: neoprotocol.eth (após atualizar content hash)\n`);
      
      console.log('📝 Para atualizar no ENS:');
      console.log(`   1. Acesse: https://app.ens.domains/name/neoprotocol.eth/details`);
      console.log(`   2. Vá em "Records" → "Content"`);
      console.log(`   3. Configure: ipfs://${cid}`);
      console.log(`   4. Confirme a transação\n`);

      // Salvar CID em arquivo
      writeFileSync(
        join(rootDir, '.ipfs-cid'),
        cid + '\n',
        'utf-8'
      );
      console.log('💾 CID salvo em .ipfs-cid\n');

      return cid;

    } catch (sdkError) {
      console.error('❌ Erro com SDK do Lighthouse:', sdkError.message);
      console.log('\n💡 Verifique se o SDK está instalado:');
      console.log('   npm install @lighthouse-web3/sdk');
      throw sdkError;
    }

  } catch (error) {
    console.error('\n❌ Erro ao fazer upload:', error.message);
    
    if (error.message.includes('Cannot find module')) {
      console.log('\n💡 Instale as dependências:');
      console.log('   npm install @lighthouse-web3/sdk');
    }
    
    process.exit(1);
  }
}

// Executar
uploadToLighthouse().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
