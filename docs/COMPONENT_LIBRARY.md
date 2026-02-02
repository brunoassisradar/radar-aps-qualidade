# Radar APS - Biblioteca de Componentes

Biblioteca de componentes React construída seguindo a metodologia **Atomic Design** com documentação completa via **Storybook**.

## 📋 Sumário

- [Instalação](#instalação)
- [Estrutura](#estrutura)
- [Uso](#uso)
- [Design Tokens](#design-tokens)
- [Componentes](#componentes)
- [Storybook](#storybook)
- [Contribuindo](#contribuindo)

---

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Rodar Storybook em desenvolvimento
npm run storybook

# Build do Storybook para produção
npm run build-storybook
```

---

## 📁 Estrutura

```
src/
├── components/
│   ├── atoms/           # Elementos básicos (Button, Input, Badge...)
│   ├── molecules/       # Combinações de átomos (FilterBar, PageHeader...)
│   ├── organisms/       # Seções complexas (AppSidebar, OverviewTable...)
│   ├── templates/       # Layouts de página (AppLayout, DashboardTemplate...)
│   ├── ui/              # Componentes base shadcn/ui
│   └── index.ts         # Barrel export unificado
│
├── lib/
│   └── design-tokens/   # Tokens de design (cores, tipografia, espaçamentos)
│
└── stories/
    ├── Introduction.mdx # Página inicial do Storybook
    └── DesignTokens/    # Documentação visual dos tokens
```

---

## 💻 Uso

### Importação por Nível (Recomendado)

```tsx
// Átomos
import { Button, Input, Badge, StatusBadge } from '@/components/atoms';

// Moléculas
import { InfoCard, FilterBar, PageHeader } from '@/components/molecules';

// Organismos
import { AppHeader, AppSidebar, OverviewTable } from '@/components/organisms';

// Templates
import { AppLayout, DashboardTemplate } from '@/components/templates';
```

### Importação Unificada

```tsx
import { 
  Button, 
  InfoCard, 
  AppHeader, 
  AppLayout 
} from '@/components';
```

### Design Tokens

```tsx
import { colors, typography, spacing, shadows } from '@/lib/design-tokens';

// Acessar valores
colors.status.otimo.hex      // "#3C8DBC"
colors.status.bom.hex        // "#00A65A"
typography.fontSize.base     // "1rem"
spacing.scale[4]             // "1rem"
```

---

## 🎨 Design Tokens

### Cores de Status

| Status | Variável CSS | Hex | Uso |
|--------|--------------|-----|-----|
| Ótimo | `--status-otimo` | #3C8DBC | Meta alcançada com excelência |
| Bom | `--status-bom` | #00A65A | Meta alcançada |
| Suficiente | `--status-suficiente` | #F0AD4E | Próximo da meta |
| Regular | `--status-regular` | #DD4B39 | Abaixo da meta |

### Cores do Sistema

| Token | Uso |
|-------|-----|
| `--primary` | Ações principais |
| `--secondary` | Ações secundárias |
| `--muted` | Elementos desabilitados |
| `--accent` | Destaques sutis |
| `--destructive` | Ações destrutivas |

---

## 🧱 Componentes

### Atoms (7)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `Button` | Botão com variantes | `variant`, `size`, `disabled` |
| `Input` | Campo de texto | `type`, `placeholder`, `disabled` |
| `Label` | Rótulo de form | `variant`, `htmlFor` |
| `Badge` | Tag pequena | `variant` |
| `StatusBadge` | Badge de status | `status`, `value` |
| `Skeleton` | Loading placeholder | `className` |
| `Separator` | Linha divisória | `orientation` |

### Molecules (6)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `ClassificationCard` | Card de classificação | `status`, `count`, `description` |
| `InfoCard` | Card informativo | `icon`, `title`, `description`, `links` |
| `PeriodSelector` | Seletor de período | `periods`, `selected`, `onChange` |
| `FilterBar` | Barra de filtros | `filters`, `onSearch`, `progress` |
| `PageHeader` | Cabeçalho de página | `breadcrumbItems`, `title`, `actions` |
| `FAQAccordion` | Acordeão de FAQ | `items` |

### Organisms (6)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `AppHeader` | Header da aplicação | `onMenuToggle`, `userName` |
| `AppSidebar` | Menu lateral | `collapsed`, `menuItems` |
| `OverviewTable` | Tabela com expansão | `data`, `columns`, `onRowClick` |
| `ReportTable` | Tabela de relatórios | `data`, `onViewDetails` |
| `ResultadoMunicipio` | Card de resultado | `cadastro`, `acompanhamento`, `classificacao` |
| `IndicatorChart` | Gráfico de indicadores | `data`, `type` |

### Templates (4)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `AppLayout` | Layout principal | `children`, `sidebarCollapsed` |
| `DashboardTemplate` | Dashboard com cards | `cards`, `faqItems`, `title` |
| `VisaoGeralTemplate` | Template com tabs | `tabs`, `defaultActiveTab` |
| `RelatorioTemplate` | Template de relatório | `segments`, `actions` |

---

## 📖 Storybook

### Executar Localmente

```bash
npm run storybook
```

Acesse `http://localhost:6006` para visualizar todos os componentes.

### Estrutura das Stories

Cada componente tem:

1. **Default** - Estado padrão
2. **AllVariants** - Todas as variantes disponíveis
3. **Sizes** - Tamanhos disponíveis (se aplicável)
4. **Interactive** - Playground com controls

### Exemplo de Story

```tsx
// src/components/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
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
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

---

## 🤝 Contribuindo

### Adicionando um Novo Componente

1. Identifique o nível (atom, molecule, organism, template)
2. Crie a pasta: `src/components/{level}/{ComponentName}/`
3. Adicione os arquivos:
   - `{ComponentName}.tsx` - Componente
   - `{ComponentName}.stories.tsx` - Stories do Storybook
   - `index.ts` - Barrel export
4. Exporte no `index.ts` do nível correspondente
5. Adicione tipos exportados se necessário

### Convenções

- Use **TypeScript** para tipagem
- Use **CVA** para variantes de componentes
- Use **Tailwind CSS** com tokens semânticos
- Exporte todos os tipos relevantes
- Documente props com JSDoc quando complexas

---

## 📄 Licença

Desenvolvido para o sistema **Radar APS** - Monitoramento da Atenção Primária à Saúde.
