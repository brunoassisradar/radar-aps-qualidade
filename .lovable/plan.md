

# Biblioteca de Componentes com Atomic Design + Storybook

## Visão Geral

Vamos organizar todos os componentes existentes seguindo a metodologia **Atomic Design** (Brad Frost) e documentá-los usando **Storybook**, criando uma biblioteca reutilizável que pode ser facilmente exportada para outros projetos.

---

## Estrutura Atomic Design

A metodologia divide componentes em 5 níveis hierárquicos:

```text
┌─────────────────────────────────────────────────────────────┐
│                     TEMPLATES (Páginas)                      │
│  Composições completas que formam layouts de página         │
├─────────────────────────────────────────────────────────────┤
│                     ORGANISMS (Organismos)                   │
│  Grupos de moléculas que formam seções distintas            │
├─────────────────────────────────────────────────────────────┤
│                     MOLECULES (Moléculas)                    │
│  Grupos de átomos funcionando juntos                        │
├─────────────────────────────────────────────────────────────┤
│                     ATOMS (Átomos)                          │
│  Elementos básicos: botões, badges, inputs, ícones          │
├─────────────────────────────────────────────────────────────┤
│                     TOKENS (Design Tokens)                   │
│  Cores, tipografia, espaçamentos, sombras                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Mapeamento dos Componentes Existentes

### 1. Design Tokens (Estilos Base)
Documentação dos valores de design extraídos do `index.css`:

| Token | Descrição |
|-------|-----------|
| Colors | Primary (#0064FF), Status (Ótimo, Bom, Suficiente, Regular) |
| Typography | Inter font, tamanhos (xs, sm, base, lg, xl, 2xl) |
| Spacing | Escala Tailwind (0.5, 1, 1.5, 2, 3, 4, 5, 6, 8...) |
| Shadows | shadow-sm, shadow |
| Border Radius | radius (0.5rem), rounded-md, rounded-lg, rounded-full |

### 2. Atoms (Átomos)
Componentes mais básicos e indivisíveis:

| Componente | Arquivo Atual | Descrição |
|------------|---------------|-----------|
| Button | `ui/button.tsx` | Botão com variantes (default, outline, ghost, etc.) |
| Input | `ui/input.tsx` | Campo de entrada de texto |
| Label | `ui/label.tsx` | Rótulo de formulário |
| Badge | `ui/badge.tsx` | Badge/tag pequena |
| StatusBadge | `financiamento/StatusBadge.tsx` | Badge com status colorido |
| Skeleton | `ui/skeleton.tsx` | Placeholder de carregamento |
| Separator | `ui/separator.tsx` | Linha divisória |
| Progress | Ant Design | Barra de progresso |
| Tooltip | Ant Design | Tooltip informativo |

### 3. Molecules (Moléculas)
Combinações de átomos que funcionam juntos:

| Componente | Arquivo Atual | Composição |
|------------|---------------|------------|
| StatusCell | `OverviewTable.tsx` (interno) | StatusBadge + Link + ChevronIcon |
| ResultadoCell | `VinculoTable.tsx` (interno) | Badge + Valor numérico |
| ClassificationCard | `financiamento/ClassificationCard.tsx` | Icon + Label + Count + Description |
| InfoCard | `financiamento/InfoCard.tsx` | Icon + Title + Description + Links |
| PeriodSelector | `financiamento/PeriodSelector.tsx` | Grupo de botões de seleção |
| FilterBar | `financiamento/FilterBar.tsx` | Selects + Buttons + Progress |
| Breadcrumb | `layout/Breadcrumb.tsx` | Links navegacionais |
| PageHeader | `layout/PageHeader.tsx` | Breadcrumb + Title + Actions |
| FAQAccordion | `financiamento/FAQAccordion.tsx` | Accordion com items Q&A |

### 4. Organisms (Organismos)
Seções mais complexas compostas de moléculas:

| Componente | Arquivo Atual | Composição |
|------------|---------------|------------|
| AppHeader | `layout/AppHeader.tsx` | Logo + Navigation + User actions |
| AppSidebar | `layout/AppSidebar.tsx` | Menu hierárquico completo |
| OverviewTable | `financiamento/OverviewTable.tsx` | Table + Filters + Pagination + Expand |
| VinculoAcompanhamentoTable | `financiamento/VinculoTable.tsx` | Table + Charts + Expand |
| ReportTable | `financiamento/ReportTable.tsx` | Table + Badges + Actions |
| ResultadoMunicipio | `financiamento/ResultadoMunicipio.tsx` | Cards + Scores + Classification |
| ComparativoCadastro | `financiamento/ComparativoCadastro.tsx` | Chart + Legend + Stats |
| CriteriosVinculacao | `financiamento/CriteriosVinculacao.tsx` | Multiple calculation cards |
| CadastroResumo | `financiamento/CadastroResumo.tsx` | Charts + Tables + Calculations |
| AcompanhamentoResumo | `financiamento/AcompanhamentoResumo.tsx` | Charts + Tables + Stats |
| IndicatorChart | `financiamento/IndicatorChart.tsx` | Stacked Bar + KPIs + Legend |

### 5. Templates (Layouts de Página)
Composições completas de página:

| Template | Arquivo Atual | Composição |
|----------|---------------|------------|
| AppLayout | `layout/AppLayout.tsx` | Header + Sidebar + Main content area |
| DashboardPage | `pages/FinanciamentoAPS.tsx` | PageHeader + InfoCards grid + FAQ |
| VisaoGeralPage | `pages/QualidadeVisaoGeral.tsx` | PageHeader + Tabs + Filters + Tables |
| RelatorioPage | `pages/QualidadeRelatorio.tsx` | PageHeader + Segmented + Charts + Tables |
| IndividualizadoPage | `pages/QualidadeIndividualizado.tsx` | PageHeader + Segmented + Detailed views |

---

## Nova Estrutura de Pastas

```text
src/
├── lib/
│   └── design-tokens/
│       ├── colors.ts          # Cores do sistema
│       ├── typography.ts      # Tipografia
│       ├── spacing.ts         # Espaçamentos
│       ├── shadows.ts         # Sombras
│       └── index.ts           # Exportação unificada
│
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Badge/
│   │   ├── StatusBadge/
│   │   ├── Skeleton/
│   │   └── index.ts           # Barrel export
│   │
│   ├── molecules/
│   │   ├── StatusCell/
│   │   ├── ClassificationCard/
│   │   ├── InfoCard/
│   │   ├── PeriodSelector/
│   │   ├── FilterBar/
│   │   ├── PageHeader/
│   │   ├── FAQAccordion/
│   │   └── index.ts
│   │
│   ├── organisms/
│   │   ├── AppHeader/
│   │   ├── AppSidebar/
│   │   ├── OverviewTable/
│   │   ├── VinculoTable/
│   │   ├── ReportTable/
│   │   ├── ResultadoMunicipio/
│   │   ├── ComparativoCadastro/
│   │   ├── CriteriosVinculacao/
│   │   ├── CadastroResumo/
│   │   ├── AcompanhamentoResumo/
│   │   ├── IndicatorChart/
│   │   └── index.ts
│   │
│   └── templates/
│       ├── AppLayout/
│       ├── DashboardTemplate/
│       ├── VisaoGeralTemplate/
│       ├── RelatorioTemplate/
│       └── index.ts
│
└── stories/
    └── Introduction.stories.mdx  # Documentação inicial
```

---

## Configuração do Storybook

### Arquivos a Criar

| Arquivo | Propósito |
|---------|-----------|
| `.storybook/main.ts` | Configuração principal do Storybook |
| `.storybook/preview.ts` | Preview global com providers e estilos |
| `.storybook/manager.ts` | Customização do painel do Storybook |

### Estrutura de Stories

Cada componente terá sua própria story com:

1. **Default**: Estado padrão do componente
2. **Variants**: Todas as variantes disponíveis
3. **States**: Estados (hover, focus, disabled, loading)
4. **Responsive**: Comportamento em diferentes breakpoints
5. **Playground**: Controls interativos para experimentação

---

## Ordem de Implementação

### Fase 1: Setup Storybook
1. Instalar dependências do Storybook
2. Configurar `.storybook/main.ts` com Vite
3. Configurar `.storybook/preview.ts` com Ant Design + Tailwind
4. Criar página de introdução com MDX

### Fase 2: Design Tokens
5. Criar documentação visual de cores
6. Criar documentação de tipografia
7. Criar documentação de espaçamentos
8. Criar documentação de sombras e bordas

### Fase 3: Átomos
9. Migrar e documentar Button
10. Migrar e documentar Input
11. Migrar e documentar Label
12. Migrar e documentar Badge
13. Migrar e documentar StatusBadge
14. Migrar e documentar Skeleton

### Fase 4: Moléculas
15. Extrair e documentar StatusCell
16. Migrar e documentar ClassificationCard
17. Migrar e documentar InfoCard
18. Migrar e documentar PeriodSelector
19. Migrar e documentar FilterBar
20. Migrar e documentar PageHeader
21. Migrar e documentar FAQAccordion

### Fase 5: Organismos
22. Migrar e documentar AppHeader
23. Migrar e documentar AppSidebar
24. Migrar e documentar OverviewTable
25. Migrar e documentar VinculoAcompanhamentoTable
26. Migrar e documentar ReportTable
27. Migrar e documentar ResultadoMunicipio
28. Migrar e documentar ComparativoCadastro
29. Migrar e documentar outros organismos

### Fase 6: Templates
30. Documentar AppLayout
31. Documentar templates de página

### Fase 7: Exportação
32. Criar barrel exports para facilitar importação
33. Documentar como usar a biblioteca em outros projetos

---

## Dependências a Instalar

```json
{
  "devDependencies": {
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-links": "^8.0.0",
    "@storybook/addon-viewport": "^8.0.0",
    "@storybook/addon-a11y": "^8.0.0",
    "@storybook/blocks": "^8.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@storybook/test": "^8.0.0",
    "storybook": "^8.0.0"
  }
}
```

---

## Exemplo de Story (Button)

```typescript
// src/components/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

---

## Benefícios da Biblioteca

1. **Documentação Viva**: Storybook serve como documentação sempre atualizada
2. **Testes Visuais**: Facilita identificar regressões visuais
3. **Desenvolvimento Isolado**: Desenvolver componentes sem dependências de página
4. **Reutilização**: Fácil de copiar para outros projetos
5. **Consistência**: Design system unificado
6. **Onboarding**: Novos desenvolvedores entendem rapidamente os componentes

---

## Observações Técnicas

- Todos os componentes continuarão usando **Ant Design v4** como base
- Os estilos customizados do Tailwind serão mantidos
- O Storybook será configurado com suporte ao **Vite** para build rápido
- Cada componente terá **autodocs** gerado automaticamente
- Suporte a **dark mode** será incluído nas stories

