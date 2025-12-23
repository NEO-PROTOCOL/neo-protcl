# Política de Segurança - NΞØ Protocol

## 🔒 Reportando Vulnerabilidades

Se você descobriu uma vulnerabilidade de segurança, **NÃO** abra uma issue pública.

### Como Reportar

1. **Email de Segurança:** `neo@neoprotocol.space`
2. **GitHub Security Advisory:** https://github.com/NEO-PROTOCOL/neo-protcl/security/advisories/new

### O que Incluir

- Descrição detalhada da vulnerabilidade
- Passos para reproduzir
- Impacto potencial
- Sugestões de correção (se houver)

### Processo

1. Você reporta a vulnerabilidade
2. Nós confirmamos o recebimento em até 48 horas
3. Investigamos e avaliamos o impacto
4. Desenvolvemos e testamos a correção
5. Publicamos a correção e creditamos o descobridor (se desejado)

### Escopo

Esta política se aplica a:
- Código do repositório `neo-protcl`
- Contratos Solidity
- Infraestrutura de deploy
- Dependências críticas

### Exclusões

- Vulnerabilidades em dependências de terceiros (reporte diretamente aos mantenedores)
- Problemas de configuração de ambiente local
- Issues de UI/UX que não afetam segurança

## 🛡️ Boas Práticas de Segurança

### Para Desenvolvedores

- Nunca commite secrets ou chaves privadas
- Use variáveis de ambiente para configurações sensíveis
- Revise código antes de fazer merge
- Mantenha dependências atualizadas
- Use `npm audit` regularmente

### Para Contribuidores

- Siga as diretrizes de contribuição
- Não exponha informações sensíveis em PRs
- Reporte vulnerabilidades através dos canais apropriados

## 📊 Status de Vulnerabilidades

Para informações sobre vulnerabilidades conhecidas em dependências, consulte:
- `docs/ops/vulnerabilities-status.md`
- `npm audit` para verificação local

## 🔐 Chaves e Secrets

- **NUNCA** commite arquivos `.env`
- Use GitHub Secrets para CI/CD
- Rotacione chaves regularmente
- Use diferentes chaves para dev/staging/prod

## 📞 Contato

- **Email de Segurança:** neo@neoprotocol.space
- **GitHub Security:** https://github.com/NEO-PROTOCOL/neo-protcl/security

---

**Última atualização:** Dezembro 2025

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.

