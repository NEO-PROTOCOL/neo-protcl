# Symbolic Layer — NΞØ Protocol

**Status:** Marker, not governance

---

## Contrato

`NeoSymbolicNode.sol` - Contrato mínimo para registro simbólico de nós.

---

## Funções

1. `signAsNode(nodeType)` - Assina como nó (uma vez por endereço)
2. `isNode(address)` - Verifica se endereço assinou

---

## Evento

```
NodeSymbolicallySigned(
    address indexed node,
    uint8 indexed nodeType,
    bytes32 indexed protocolId,
    uint256 timestamp
)
```

---

## Deploy

Base Mainnet. Simples. Sem gasless. Sem automação.

---

**Arquitetura pode ser refeita. Eventos não.**
