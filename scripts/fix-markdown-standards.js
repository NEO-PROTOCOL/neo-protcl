#!/usr/bin/env node

/**
 * Script de Correção Automática de Padrões Markdown
 * 
 * Corrige automaticamente:
 * - Adiciona linha em branco após cada header (###, ##, #)
 * - Garante linha final em branco
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', 'dist-boot', '.git'].includes(file)) {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function fixMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const fixedLines = [];
  let modified = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeader = /^#{1,4}\s/.test(line);
    
    fixedLines.push(line);
    
    // Se é header e próxima linha não é vazia e não é outro header
    if (isHeader && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (nextLine.trim() !== '' && !nextLine.startsWith('#')) {
        fixedLines.push('');
        modified = true;
      }
    }
  }
  
  // Garantir linha final em branco
  let fixedContent = fixedLines.join('\n');
  if (!fixedContent.endsWith('\n')) {
    fixedContent += '\n';
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    return true;
  }
  
  return false;
}

function main() {
  const rootDir = path.join(__dirname, '..');
  const mdFiles = findMarkdownFiles(rootDir);
  
  console.log(`\n🔧 Corrigindo ${mdFiles.length} arquivos Markdown...\n`);
  
  let fixedCount = 0;
  
  mdFiles.forEach(file => {
    if (fixMarkdownFile(file)) {
      fixedCount++;
      console.log(`✅ Corrigido: ${path.relative(rootDir, file)}`);
    }
  });
  
  if (fixedCount === 0) {
    console.log('✅ Todos os arquivos já estão conformes!\n');
  } else {
    console.log(`\n✅ ${fixedCount} arquivo(s) corrigido(s)\n`);
  }
}

main();
