# Workflow para Trabalhar em Dois Repositórios

## Configuração Atual

- **Origin (Profissional)**: `NEO-PROTOCOL/neo-protcl`
- **Personal (Pessoal)**: `neomello/neo-protcl` (se ainda existir)

## Comandos Úteis

### Verificar status de ambos
```bash
git remote -v
```

### Push para organização profissional (padrão)
```bash
git push origin main
# ou simplesmente
git push
```

### Push para repositório pessoal (se necessário)
```bash
git push personal main
```

### Verificar permissões
```bash
# Testar acesso ao repositório profissional
git ls-remote origin

# Testar acesso ao repositório pessoal (se existir)
git ls-remote personal
```

### Sincronizar ambos (se necessário)
```bash
# Push para profissional
git push origin main

# Push para pessoal (se ainda existir)
git push personal main
```

## Verificar Permissões na Organização

1. Acesse: https://github.com/organizations/NEO-PROTOCOL/people
2. Verifique se seu usuário está listado como membro
3. Verifique suas permissões no repositório:
   - https://github.com/NEO-PROTOCOL/neo-protcl/settings/access

## Troubleshooting

### Se não conseguir fazer push:
1. Verifique se está autenticado: `gh auth status`
2. Verifique permissões na organização
3. Use SSH se HTTPS falhar: `git remote set-url origin git@github.com:NEO-PROTOCOL/neo-protcl.git`

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
