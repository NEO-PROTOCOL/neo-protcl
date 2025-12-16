#!/usr/bin/env node

/**
 * Script para verificar o status do ENS e propagação do content hash
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Carregar variáveis de ambiente
dotenv.config({ path: join(rootDir, '.env') });
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || 'gateway.pinata.cloud';

async function checkENSStatus() {
  const domain = 'neoprotocol.eth';
  
  console.log('🔍 Verificando status do ENS...\n');
  console.log(`📋 Domínio: ${domain}\n`);

  // Ler CID salvo se existir
  const cidFile = join(rootDir, '.ipfs-cid');
  let savedCid = null;
  if (existsSync(cidFile)) {
    savedCid = readFileSync(cidFile, 'utf-8').trim();
    console.log(`💾 CID salvo localmente: ${savedCid}\n`);
  }

  // Verificar via diferentes gateways ENS
  const gateways = [
    { name: 'ENS Link (.link)', url: `https://${domain}.link` },
    { name: 'ENS Limo (.limo)', url: `https://${domain}.limo` },
    { name: 'ENS Direct', url: `https://${domain}` },
  ];

  console.log('🌐 Testando gateways ENS:\n');
  
  for (const gateway of gateways) {
    try {
      const response = await fetch(gateway.url, { 
        method: 'HEAD',
        redirect: 'follow',
        timeout: 10000
      });
      
      const status = response.ok ? '✅' : '❌';
      const statusText = response.ok ? 'OK' : `Erro ${response.status}`;
      
      console.log(`${status} ${gateway.name.padEnd(20)} ${statusText}`);
      
      if (response.ok) {
        const finalUrl = response.url;
        console.log(`   → ${finalUrl}\n`);
      }
    } catch (error) {
      console.log(`❌ ${gateway.name.padEnd(20)} Erro: ${error.message}`);
    }
  }

  // Verificar content hash via API pública do ENS
  console.log('\n📡 Verificando content hash no ENS...\n');
  
  try {
    // Usar API pública do ENS para verificar content hash
    const ensApiUrl = `https://api.ensideas.com/ens/resolve/${domain}`;
    const response = await fetch(ensApiUrl);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.address) {
        console.log(`✅ Domínio resolvido para: ${data.address}`);
      }
      
      if (data.contentHash) {
        console.log(`✅ Content Hash configurado: ${data.contentHash}`);
        
        // Extrair CID se for IPFS
        if (data.contentHash.startsWith('ipfs://')) {
          const cid = data.contentHash.replace('ipfs://', '');
          console.log(`   CID: ${cid}`);
          
          if (savedCid && cid !== savedCid) {
            console.log(`\n⚠️  ATENÇÃO: CID no ENS (${cid}) é diferente do CID salvo (${savedCid})`);
            console.log(`   Você pode precisar atualizar o ENS com o novo CID.`);
          } else if (savedCid && cid === savedCid) {
            console.log(`\n✅ CID corresponde ao arquivo salvo!`);
          }
          
          console.log(`\n🔗 Teste os links diretos do IPFS:`);
          const pinataGatewayUrl = PINATA_GATEWAY && PINATA_GATEWAY !== 'gateway.pinata.cloud'
            ? `https://${PINATA_GATEWAY}/ipfs/${cid}`
            : `https://gateway.pinata.cloud/ipfs/${cid}`;
          console.log(`   Pinata Gateway: ${pinataGatewayUrl}`);
          console.log(`   https://gateway.lighthouse.storage/ipfs/${cid}`);
          console.log(`   https://ipfs.io/ipfs/${cid}`);
          console.log(`   https://cloudflare-ipfs.com/ipfs/${cid}`);
        }
      } else {
        console.log(`⚠️  Content Hash não configurado no ENS`);
        console.log(`\n💡 Configure o content hash:`);
        console.log(`   1. Acesse: https://app.ens.domains/name/${domain}/details`);
        console.log(`   2. Vá em "Records" → "Content"`);
        if (savedCid) {
          console.log(`   3. Configure: ipfs://${savedCid}`);
        } else {
          console.log(`   3. Configure: ipfs://SEU_CID`);
        }
        console.log(`   4. Confirme a transação`);
      }
    }
  } catch (error) {
    console.log(`⚠️  Não foi possível verificar via API: ${error.message}`);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⏱️  TEMPO DE PROPAGAÇÃO:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Após atualizar o content hash no ENS:');
  console.log('   • Propagação básica: 2-5 minutos');
  console.log('   • Propagação completa: 10-30 minutos');
  console.log('   • Alguns gateways podem levar até 1 hora\n');
  
  console.log('💡 DICAS:');
  console.log('   • Tente diferentes gateways (.link, .limo)');
  console.log('   • Limpe o cache do navegador (Cmd+Shift+R)');
  console.log('   • Teste em modo anônimo');
  console.log('   • Verifique se o CID está correto no ENS\n');
}

// Executar
checkENSStatus().catch(error => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});

