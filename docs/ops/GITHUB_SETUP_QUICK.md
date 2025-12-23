# Configuração Rápida - GitHub NEO-PROTOCOL

Guia rápido para configurar tudo que o GitHub sugere.

## ✅ 1. Issue Templates (JÁ CONFIGURADO)

Os templates já estão criados em `.github/ISSUE_TEMPLATE/`:
- ✅ `bug_report.md`
- ✅ `feature_request.md`
- ✅ `config.yml` (com links para Discussions)

**Status:** Pronto! O GitHub detectará automaticamente.

## ✅ 2. Discussions (CONFIGURAR NO GITHUB)

### Passo 1: Ativar Discussions
1. Acesse: https://github.com/NEO-PROTOCOL/neo-protcl/settings
2. Role até "Features"
3. Ative "Discussions"
4. Clique em "Set up discussions"

### Passo 2: Configurar Categorias
Após ativar, crie estas categorias:

1. **General** (Discussões Gerais)
   - Template: Usar `.github/DISCUSSION_TEMPLATE/general.yml`

2. **Q&A** (Perguntas e Respostas)
   - Template: Usar `.github/DISCUSSION_TEMPLATE/q-and-a.yml`

3. **Ideas** (Ideias e Sugestões)
   - Template: Usar `.github/DISCUSSION_TEMPLATE/ideas.yml`

**Templates criados:**
- ✅ `.github/DISCUSSION_TEMPLATE/general.yml`
- ✅ `.github/DISCUSSION_TEMPLATE/q-and-a.yml`
- ✅ `.github/DISCUSSION_TEMPLATE/ideas.yml`

## ✅ 3. Default Commit Messages (CONFIGURAR NO GITHUB)

### Passo 1: Acessar Configurações
1. Acesse: https://github.com/NEO-PROTOCOL/neo-protcl/settings
2. Role até "Pull Requests"
3. Encontre "Default commit message"

### Passo 2: Configurar Merge Commit Message

**Template criado:** `.github/merge_message_template.md`

Cole este conteúdo em "Merge commits":

```
Merge pull request #$NUMBER from $AUTHOR

$TITLE

$DESCRIPTION

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

### Passo 3: Configurar Squash Merge Message

**Template criado:** `.github/squash_merge_message_template.md`

Cole este conteúdo em "Squash merges":

```
$TITLE

$DESCRIPTION

Co-authored-by: $AUTHOR <$EMAIL>

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
```

## 📋 Checklist Completo

### Issue Templates
- [x] Templates criados
- [x] Config.yml com links
- [ ] GitHub detectará automaticamente após commit

### Discussions
- [x] Templates criados
- [ ] Ativar Discussions no GitHub (Settings > Features)
- [ ] Configurar categorias

### Commit Messages
- [x] Templates criados
- [ ] Configurar no GitHub (Settings > Pull Requests)

## 🔗 Links Diretos

- **Settings:** https://github.com/NEO-PROTOCOL/neo-protcl/settings
- **Features:** https://github.com/NEO-PROTOCOL/neo-protcl/settings#features
- **Pull Requests:** https://github.com/NEO-PROTOCOL/neo-protcl/settings#pull_requests
- **Discussions:** https://github.com/NEO-PROTOCOL/neo-protcl/discussions (após ativar)

## 📝 Próximos Passos

1. Fazer commit e push dos arquivos criados
2. Ativar Discussions no GitHub
3. Configurar mensagens de commit padrão
4. Verificar se Issue Templates aparecem

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.

