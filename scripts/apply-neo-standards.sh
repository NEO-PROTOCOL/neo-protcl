#!/bin/bash

# Script para aplicar padrões NEØ em novos projetos
# Uso: ./apply-neo-standards.sh [caminho-do-projeto]

set -e

NEO_TEMPLATE_DIR="$HOME/neo-protcl"
PROJECT_DIR="${1:-$(pwd)}"

if [ ! -d "$NEO_TEMPLATE_DIR" ]; then
  echo "❌ Template NEØ não encontrado em: $NEO_TEMPLATE_DIR"
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Diretório do projeto não encontrado: $PROJECT_DIR"
  exit 1
fi

echo "🚀 Aplicando padrões NEØ em: $PROJECT_DIR"
echo ""

# Criar estrutura .cursor/standards se não existir
if [ ! -d "$PROJECT_DIR/.cursor/standards" ]; then
  echo "📁 Criando .cursor/standards..."
  mkdir -p "$PROJECT_DIR/.cursor/standards"
fi

# Copiar standards
if [ -d "$NEO_TEMPLATE_DIR/standards" ]; then
  echo "📋 Copiando standards..."
  cp -r "$NEO_TEMPLATE_DIR/standards"/* "$PROJECT_DIR/.cursor/standards/" 2>/dev/null || true
fi

# Copiar .cursorrules se não existir
if [ ! -f "$PROJECT_DIR/.cursorrules" ]; then
  echo "📝 Copiando .cursorrules..."
  cp "$NEO_TEMPLATE_DIR/.cursorrules" "$PROJECT_DIR/.cursorrules"
fi

# Copiar .editorconfig se não existir
if [ ! -f "$PROJECT_DIR/.editorconfig" ]; then
  echo "⚙️  Copiando .editorconfig..."
  cp "$NEO_TEMPLATE_DIR/.editorconfig" "$PROJECT_DIR/.editorconfig"
fi

# Criar .github/workflows se não existir
if [ ! -d "$PROJECT_DIR/.github/workflows" ]; then
  echo "🔧 Criando .github/workflows..."
  mkdir -p "$PROJECT_DIR/.github/workflows"
fi

# Copiar workflows (opcional - não sobrescreve existentes)
if [ -d "$NEO_TEMPLATE_DIR/.github/workflows" ]; then
  echo "⚙️  Copiando workflows..."
  for workflow in "$NEO_TEMPLATE_DIR/.github/workflows"/*.yml; do
    if [ -f "$workflow" ]; then
      filename=$(basename "$workflow")
      if [ ! -f "$PROJECT_DIR/.github/workflows/$filename" ]; then
        cp "$workflow" "$PROJECT_DIR/.github/workflows/$filename"
      fi
    fi
  done
fi

# Copiar outros arquivos de configuração
for file in .markdownlint.json .prettierrc.json .prettierignore .markdownlintignore; do
  if [ -f "$NEO_TEMPLATE_DIR/$file" ] && [ ! -f "$PROJECT_DIR/$file" ]; then
    echo "📄 Copiando $file..."
    cp "$NEO_TEMPLATE_DIR/$file" "$PROJECT_DIR/$file"
  fi
done

echo ""
echo "✅ Padrões NEØ aplicados com sucesso!"
echo ""
echo "Próximos passos:"
echo "  1. Revise os arquivos copiados"
echo "  2. Ajuste conforme necessário"
echo "  3. Commit as mudanças"
