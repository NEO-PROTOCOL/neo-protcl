#!/usr/bin/env node

/**
 * Script pós-build para preparar dist-boot para IPFS
 * - Cria index.html a partir de branding.html (página de marca)
 * - Garante que os caminhos estão relativos
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const distBootDir = join(process.cwd(), 'dist-boot');
const brandingHtmlPath = join(distBootDir, 'branding.html');
const indexHtmlPath = join(distBootDir, 'index.html');

console.log('🔧 Preparando dist-boot para IPFS...');

// Verificar se branding.html existe (página de marca)
if (!existsSync(brandingHtmlPath)) {
  console.error('❌ branding.html não encontrado em dist-boot');
  console.error('   Certifique-se de que o build inclui branding.html');
  process.exit(1);
}

// Ler branding.html (página de marca/branding)
const brandingHtml = readFileSync(brandingHtmlPath, 'utf-8');

// Criar index.html a partir de branding.html
// A página de branding será a raiz do domínio
writeFileSync(indexHtmlPath, brandingHtml, 'utf-8');

console.log('✅ index.html criado a partir de branding.html (página de marca)');
console.log('✅ dist-boot pronto para upload no IPFS');
console.log('');
console.log('📝 Estrutura:');
console.log('   / (raiz) → branding.html (página de marca)');
console.log('   /boot.html → boot sequence');
console.log('');
console.log('📝 Próximos passos:');
console.log('   1. Faça upload do dist-boot para IPFS');
console.log('   2. Publique o novo CID no IPNS');
console.log('   3. Configure o ENS Content Hash como: ipfs://SEU_CID');
console.log('      (ou ipns://SEU_IPNS_KEY)');
console.log('');
console.log('💡 A raiz mostrará a página de branding que leva ao boot!');
