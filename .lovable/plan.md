

# Plano de Correção: Ant Design v4 - Estilos Faltando

## Diagnóstico do Problema

Após a migração de Ant Design v6 para v4, os componentes estão "quebrados" visualmente porque:

1. **Estilos CSS não carregados**: No Ant Design v5/v6, os estilos são injetados automaticamente via CSS-in-JS. No v4, é necessário importar os estilos CSS manualmente.

2. **O componente Segmented está renderizando como radio buttons** sem estilização adequada, conforme observado na screenshot do browser.

---

## Solução

### 1. Importar CSS do Ant Design v4

Adicionar a importação do CSS do Ant Design no arquivo `src/main.tsx`:

```typescript
import 'antd/dist/antd.css';
```

### 2. Criar arquivo local de locale (opcional mas recomendado)

A memória do projeto indica que a importação via `antd/lib/locale/pt_BR` pode causar erros 504 no Vite. Criar um arquivo local para o locale:

**Criar arquivo**: `src/lib/antd-locale-pt-BR.ts`

Este arquivo exportará a configuração de locale pt-BR diretamente, evitando problemas de cache/importação.

### 3. Atualizar App.tsx

Alterar a importação do locale para usar o arquivo local:

```typescript
// De:
import ptBR from "antd/lib/locale/pt_BR";

// Para:
import ptBR from "@/lib/antd-locale-pt-BR";
```

---

## Arquivos a Modificar

| Arquivo | Ação |
|---------|------|
| `src/main.tsx` | Adicionar `import 'antd/dist/antd.css';` |
| `src/lib/antd-locale-pt-BR.ts` | Criar arquivo local com locale pt-BR |
| `src/App.tsx` | Alterar importação do locale para arquivo local |

---

## Impacto

- Os componentes Ant Design (Tabs, Table, Modal, Segmented, Button, etc.) voltarão a exibir corretamente com os estilos do framework
- O Segmented voltará a ter o visual de "pill buttons" em vez de radio buttons sem estilo
- Os estilos customizados no `index.css` para `.ant-segmented-*` continuarão funcionando em cima dos estilos base

