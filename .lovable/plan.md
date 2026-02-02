

## Migracao 100% para Ant Design v4

### Visao Geral

Este plano detalha a migracao completa do projeto para usar exclusivamente Ant Design v4, removendo todas as dependencias de shadcn/ui e Radix UI. A migracao sera feita de forma gradual e segura para garantir que nada quebre.

### Principios da Migracao

1. **Seguranca em primeiro lugar**: Cada arquivo sera migrado individualmente e testado
2. **Manter funcionalidade**: Todas as props e comportamentos existentes serao preservados
3. **Ant Design v4**: Usar APIs da v4 (ex: `visible` em vez de `open` para Modals)
4. **Estilos via CSS**: Ant Design v4 nao suporta token system, estilizacao via CSS/Less

---

### Mapeamento de Componentes

| Atual (shadcn/Radix) | Novo (Ant Design v4) |
|---------------------|---------------------|
| Button | Button |
| Input | Input |
| Label | Form.Item (label prop) |
| Badge | Badge / Tag |
| Card | Card |
| Alert | Alert |
| Accordion | Collapse |
| Tabs | Tabs |
| Checkbox | Checkbox |
| Dialog/Modal | Modal |
| Tooltip | Tooltip |
| Progress | Progress |
| Separator | Divider |
| Skeleton | Skeleton |
| Toast/Sonner | message / notification |

---

### Fase 1: Preparacao (Sem quebrar nada)

**1.1 Atualizar App.tsx**

Remover imports de componentes shadcn globais:

```tsx
// REMOVER
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// MANTER
import { ConfigProvider } from 'antd';
import ptBR from '@/lib/antd-locale-pt-BR';
```

**1.2 Criar wrapper de notificacao Ant Design**

Substituir Sonner/Toast por `message` e `notification` do Ant Design.

---

### Fase 2: Migrar Atoms

**2.1 Button (src/components/atoms/Button)**

De:
```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
```

Para:
```tsx
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
```

Mapeamento de variantes:
- `default` -> `type="primary"`
- `secondary` -> `type="default"`
- `outline` -> `type="default" ghost`
- `destructive` -> `danger`
- `ghost` -> `type="text"`
- `link` -> `type="link"`

**2.2 Input (src/components/atoms/Input)**

De:
```tsx
<input className={cn(...)} />
```

Para:
```tsx
import { Input as AntInput } from 'antd';
<AntInput />
```

**2.3 Badge (src/components/atoms/Badge)**

De:
```tsx
import { cva } from "class-variance-authority";
```

Para:
```tsx
import { Tag, Badge as AntBadge } from 'antd';
```

**2.4 StatusBadge**

Manter logica atual mas usar `Tag` do Ant Design com cores customizadas.

**2.5 Skeleton**

De:
```tsx
<div className="animate-pulse bg-muted" />
```

Para:
```tsx
import { Skeleton as AntSkeleton } from 'antd';
```

**2.6 Separator**

De:
```tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
```

Para:
```tsx
import { Divider } from 'antd';
```

**2.7 Label**

De:
```tsx
import * as LabelPrimitive from "@radix-ui/react-label";
```

Para: Usar `Form.Item` com prop `label` ou texto simples com classes Tailwind.

---

### Fase 3: Migrar Molecules

**3.1 FAQAccordion**

De:
```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
```

Para:
```tsx
import { Collapse } from 'antd';
const { Panel } = Collapse;
```

**3.2 InfoCard**

Manter estrutura atual mas garantir que nao use componentes shadcn.

**3.3 ClassificationCard**

Ja usa apenas Tailwind + Lucide icons. Manter como esta.

---

### Fase 4: Migrar Paginas

**4.1 Login.tsx**

Migrar de:
```tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
```

Para:
```tsx
import { Card, Input, Button, Alert, Form } from 'antd';
```

---

### Fase 5: Atualizar Exports

**5.1 src/components/atoms/index.ts**

Atualizar para exportar componentes Ant Design wrapper.

**5.2 src/components/index.ts**

Atualizar barrel exports.

---

### Fase 6: Limpar Dependencias

**6.1 package.json**

Remover dependencias nao utilizadas:
```json
// REMOVER
"@radix-ui/react-accordion": "^1.2.11",
"@radix-ui/react-alert-dialog": "^1.1.14",
"@radix-ui/react-checkbox": "^1.3.2",
"@radix-ui/react-dialog": "^1.1.14",
"@radix-ui/react-label": "^2.1.7",
"@radix-ui/react-popover": "^1.1.14",
"@radix-ui/react-progress": "^1.1.7",
"@radix-ui/react-separator": "^1.1.7",
"@radix-ui/react-slot": "^1.2.3",
"@radix-ui/react-tabs": "^1.1.12",
"@radix-ui/react-toast": "^1.2.14",
"@radix-ui/react-tooltip": "^1.2.7",
"class-variance-authority": "^0.7.1",
"cmdk": "^1.1.1",
"input-otp": "^1.4.2",
"sonner": "^1.7.4",
"vaul": "^0.9.9"
```

**6.2 Remover arquivos nao utilizados**

Apos migracao, remover pasta `src/components/ui/` inteira.

---

### Fase 7: Atualizar Storybook

**7.1 Atualizar stories**

Atualizar todos os arquivos `.stories.tsx` para usar os novos componentes Ant Design.

**7.2 Atualizar decorators**

Garantir que o Storybook tenha o ConfigProvider do Ant Design.

---

### Ordem de Execucao

1. **Criar wrappers Ant Design** para manter compatibilidade de API
2. **Migrar atoms** um por um
3. **Migrar molecules** um por um
4. **Migrar paginas** uma por uma
5. **Testar cada componente** no Storybook e na aplicacao
6. **Remover arquivos e dependencias** nao utilizados

---

### Arquivos a Modificar

| Arquivo | Acao |
|---------|------|
| `src/App.tsx` | Remover Toaster, Sonner, TooltipProvider |
| `src/components/atoms/Button/Button.tsx` | Migrar para Ant Design Button |
| `src/components/atoms/Input/Input.tsx` | Migrar para Ant Design Input |
| `src/components/atoms/Badge/Badge.tsx` | Migrar para Ant Design Tag |
| `src/components/atoms/StatusBadge/StatusBadge.tsx` | Migrar para Ant Design Tag |
| `src/components/atoms/Skeleton/Skeleton.tsx` | Migrar para Ant Design Skeleton |
| `src/components/atoms/Separator/Separator.tsx` | Migrar para Ant Design Divider |
| `src/components/atoms/Label/Label.tsx` | Simplificar ou remover |
| `src/components/molecules/FAQAccordion/FAQAccordion.tsx` | Migrar para Ant Design Collapse |
| `src/components/financiamento/FAQAccordion.tsx` | Migrar para Ant Design Collapse |
| `src/pages/Login.tsx` | Migrar todos os componentes UI |
| `src/components/layout/AppHeader.tsx` | Migrar Button |
| `src/components/organisms/AppHeader/AppHeader.tsx` | Migrar Button |
| `src/main.tsx` | Manter import de antd/dist/antd.css |
| `package.json` | Remover dependencias Radix/shadcn |

---

### Riscos e Mitigacoes

| Risco | Mitigacao |
|-------|-----------|
| Estilos quebrados | Testar cada componente visualmente |
| Props incompativeis | Criar wrappers que mapeiam props |
| Perda de funcionalidade | Documentar diferenças e adaptar |
| Breaking changes | Migrar gradualmente, arquivo por arquivo |

---

### Estimativa

- **Fase 1-2** (Atoms): ~15-20 arquivos
- **Fase 3-4** (Molecules + Pages): ~10-15 arquivos
- **Fase 5-7** (Cleanup): ~10-15 arquivos

**Total**: ~40-50 arquivos modificados

