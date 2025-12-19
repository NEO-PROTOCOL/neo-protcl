#!/usr/bin/env node

/**
 * Script de Validação de Padrões Markdown
 * 
 * Verifica se todos os arquivos .md seguem o padrão:
 * - Linha em branco após cada header (###, ##, #)
 * - Indentação de 2 espaços
 * - Linha final em branco
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STANDARDS = {
  blankLineAfterHeader: true,
  twoSpaceIndent: true,
  finalNewline: true,
};

function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorar node_modules, dist, etc
      if (!['node_modules', 'dist', 'dist-boot', '.git'].includes(file)) {
        findMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function validateMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  
  // Verificar linha em branco após headers
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeader = /^#{1,4}\s/.test(line);
    
    if (isHeader && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      // Próxima linha não deve ser vazia se for outro header ou se não houver linha em branco
      if (nextLine.trim() !== '' && !nextLine.startsWith('#')) {
        errors.push({
          line: i + 1,
          type: 'missing_blank_line_after_header',
          header: line.trim(),
          file: filePath
        });
      }
    }
  }
  
  // Verificar linha final em branco
  if (content.length > 0 && !content.endsWith('\n')) {
    errors.push({
      line: lines.length,
      type: 'missing_final_newline',
      file: filePath
    });
  }
  
  return errors;
}

function main() {
  const rootDir = path.join(__dirname, '..');
  const mdFiles = findMarkdownFiles(rootDir);
  
  console.log(`\n🔍 Validando ${mdFiles.length} arquivos Markdown...\n`);
  
  let totalErrors = 0;
  const filesWithErrors = [];
  
  mdFiles.forEach(file => {
    const errors = validateMarkdownFile(file);
    
    if (errors.length > 0) {
      totalErrors += errors.length;
      filesWithErrors.push({ file, errors });
      
      console.log(`❌ ${path.relative(rootDir, file)}`);
      errors.forEach(err => {
        if (err.type === 'missing_blank_line_after_header') {
          console.log(`   Linha ${err.line}: Falta linha em branco após header: ${err.header.substring(0, 50)}...`);
        } else if (err.type === 'missing_final_newline') {
          console.log(`   Linha ${err.line}: Falta linha final em branco`);
        }
      });
      console.log('');
    }
  });
  
  if (totalErrors === 0) {
    console.log('✅ Todos os arquivos Markdown estão conformes com os padrões!\n');
    process.exit(0);
  } else {
    console.log(`\n⚠️  Encontrados ${totalErrors} erro(s) em ${filesWithErrors.length} arquivo(s)\n`);
    console.log('Para corrigir automaticamente, execute:');
    console.log('  node scripts/fix-markdown-standards.js\n');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateMarkdownFile, findMarkdownFiles };
