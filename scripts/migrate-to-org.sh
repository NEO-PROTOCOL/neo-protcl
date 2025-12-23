#!/bin/bash

# Script para migrar repositório para organização NEO-PROTOCOL
# Execute após transferir/criar o repositório na organização

set -e

ORG="NEO-PROTOCOL"
REPO="neo-protcl"
NEW_REMOTE="https://github.com/${ORG}/${REPO}.git"

echo "🔄 Configurando repositório para organização ${ORG}..."

# Verificar se já está configurado
CURRENT_REMOTE=$(git config --get remote.origin.url)
if [[ "$CURRENT_REMOTE" == *"${ORG}"* ]]; then
  echo "✅ Repositório já está configurado para ${ORG}"
  exit 0
fi

# Verificar se o repositório existe na organização
echo "🔍 Verificando se repositório existe na organização..."
if curl -s -o /dev/null -w "%{http_code}" "https://api.github.com/repos/${ORG}/${REPO}" | grep -q "200"; then
  echo "✅ Repositório encontrado na organização ${ORG}"
else
  echo "❌ Repositório não encontrado na organização ${ORG}"
  echo ""
  echo "📋 ANTES DE CONTINUAR:"
  echo "   1. Transfira o repositório de neomello/neo-protcl para ${ORG}/neo-protcl"
  echo "      OU"
  echo "   2. Crie um novo repositório vazio em ${ORG}/neo-protcl"
  echo ""
  echo "   Transferir: https://github.com/neomello/neo-protcl/settings (Danger Zone)"
  echo "   Criar novo: https://github.com/organizations/${ORG}/repositories/new"
  echo ""
  read -p "Pressione Enter quando o repositório estiver criado/transferido..."
fi

# Alterar remote origin
echo "🔧 Alterando remote origin..."
git remote set-url origin "${NEW_REMOTE}"

# Verificar configuração
echo "✅ Remote configurado:"
git remote -v

# Fazer push
echo ""
echo "📤 Fazendo push para ${ORG}/${REPO}..."
read -p "Deseja fazer push agora? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
  git push -u origin main
  echo "✅ Push concluído!"
else
  echo "⏭️  Push cancelado. Execute manualmente quando estiver pronto:"
  echo "   git push -u origin main"
fi

echo ""
echo "✅ Configuração concluída!"
echo "   Repositório: ${NEW_REMOTE}"

