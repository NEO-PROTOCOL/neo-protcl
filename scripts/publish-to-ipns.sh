#!/bin/bash

# Script para publicar dist-boot no IPNS
# Uso: ./scripts/publish-to-ipns.sh

set -e

echo "🚀 Publicando dist-boot no IPNS..."
echo ""

# Verificar se dist-boot existe
if [ ! -d "dist-boot" ]; then
    echo "❌ Erro: dist-boot não encontrado!"
    echo "   Execute primeiro: npm run build:boot"
    exit 1
fi

# Verificar se IPFS está rodando
if ! ipfs id > /dev/null 2>&1; then
    echo "⚠️  IPFS daemon não está rodando!"
    echo "   Inicie em outro terminal: ipfs daemon"
    echo ""
    read -p "Deseja continuar mesmo assim? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

echo "📤 Fazendo upload do dist-boot para IPFS..."
echo ""

# Fazer upload e pegar o CID do diretório (última linha)
CID=$(ipfs add -r -Q dist-boot)

if [ -z "$CID" ]; then
    echo "❌ Erro: Falha ao fazer upload para IPFS"
    exit 1
fi

echo "✅ Upload concluído!"
echo "   CID: $CID"
echo ""

# IPNS key (você pode mudar se tiver uma chave específica)
IPNS_KEY="k51qzi5uqu5dla3pz2kb3xc2w51x2k8jbnxhp4p02dxj28qfwnpmp8zk6wo4kz"

echo "📢 Publicando no IPNS..."
echo "   IPNS: $IPNS_KEY"
echo "   CID:  $CID"
echo ""

# Publicar no IPNS
PUBLISH_OUTPUT=$(ipfs name publish /ipfs/$CID 2>&1)

if [ $? -eq 0 ]; then
    echo "✅ Publicado com sucesso!"
    echo ""
    echo "$PUBLISH_OUTPUT"
    echo ""
    echo "🧪 Verificando..."
    RESOLVED=$(ipfs name resolve $IPNS_KEY 2>/dev/null || echo "Ainda propagando...")
    echo "   Resolve para: $RESOLVED"
    echo ""
    echo "🌐 Teste no navegador:"
    echo "   https://ipfs.io/ipns/$IPNS_KEY"
    echo ""
    echo "📝 Configure o ENS com:"
    echo "   ipns://$IPNS_KEY"
else
    echo "❌ Erro ao publicar no IPNS"
    echo "$PUBLISH_OUTPUT"
    exit 1
fi

