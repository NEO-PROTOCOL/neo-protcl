#!/bin/bash

echo "🔐 Verificando Permissões dos Repositórios"
echo "=========================================="
echo ""

# Verificar acesso ao repositório profissional
echo "📋 NEO-PROTOCOL/neo-protcl (Profissional):"
if git ls-remote origin > /dev/null 2>&1; then
  echo "  ✅ Acesso de LEITURA: OK"
  if git push --dry-run origin main > /dev/null 2>&1; then
    echo "  ✅ Acesso de ESCRITA: OK"
  else
    echo "  ⚠️  Acesso de ESCRITA: Verificar permissões"
  fi
else
  echo "  ❌ Acesso: FALHOU"
fi
echo ""

# Verificar acesso ao repositório pessoal
echo "📋 neomello/neo-protcl (Pessoal):"
if git ls-remote personal > /dev/null 2>&1; then
  echo "  ✅ Acesso de LEITURA: OK"
  if git push --dry-run personal main > /dev/null 2>&1; then
    echo "  ✅ Acesso de ESCRITA: OK"
  else
    echo "  ⚠️  Acesso de ESCRITA: Verificar permissões"
  fi
else
  echo "  ⚠️  Repositório não existe mais ou sem acesso"
fi
echo ""

echo "📝 Verificar permissões manualmente:"
echo "   Organização: https://github.com/organizations/NEO-PROTOCOL/people"
echo "   Repositório: https://github.com/NEO-PROTOCOL/neo-protcl/settings/access"

