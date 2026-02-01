import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O **StatusBadge** é um badge especializado para indicadores de qualidade da APS.
Exibe status de classificação (Ótimo, Bom, Suficiente, Regular) com cores semânticas.

### Uso básico
\`\`\`tsx
import { StatusBadge } from '@/components/atoms/StatusBadge';

<StatusBadge status="otimo" />
<StatusBadge status="bom" value="72%" />
\`\`\`

### Cores de Status
- **Ótimo**: Azul (#3C8DBC) - Meta alcançada
- **Bom**: Verde (#00A65A) - Próximo da meta
- **Suficiente**: Amarelo (#F0AD4E) - Precisa atenção
- **Regular**: Vermelho (#DD4B39) - Ação necessária
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['otimo', 'bom', 'suficiente', 'regular'],
      description: 'Status de classificação',
    },
    value: {
      control: 'text',
      description: 'Valor opcional a exibir junto ao status',
    },
    showLabel: {
      control: 'boolean',
      description: 'Exibir ou ocultar o label do status',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {
    status: 'otimo',
  },
};

export const WithValue: Story = {
  args: {
    status: 'bom',
    value: '72%',
  },
};

// ===== ALL STATUS =====

export const AllStatus: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatusBadge status="otimo" />
      <StatusBadge status="bom" />
      <StatusBadge status="suficiente" />
      <StatusBadge status="regular" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todos os status disponíveis para classificação de indicadores.',
      },
    },
  },
};

export const AllStatusWithValues: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatusBadge status="otimo" value="85%" />
      <StatusBadge status="bom" value="72%" />
      <StatusBadge status="suficiente" value="58%" />
      <StatusBadge status="regular" value="35%" />
    </div>
  ),
};

// ===== LABEL OPTIONS =====

export const LabelOnly: Story = {
  args: {
    status: 'otimo',
    showLabel: true,
  },
};

export const ValueOnly: Story = {
  args: {
    status: 'bom',
    value: '72%',
    showLabel: false,
  },
};

// ===== USE CASES =====

export const InIndicatorRow: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <span className="text-sm">Pré-natal (1º indicador)</span>
        <StatusBadge status="otimo" value="85%" />
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <span className="text-sm">Saúde da Criança (2º indicador)</span>
        <StatusBadge status="bom" value="72%" />
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <span className="text-sm">Doenças Crônicas (3º indicador)</span>
        <StatusBadge status="suficiente" value="58%" />
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <span className="text-sm">Saúde Mental (4º indicador)</span>
        <StatusBadge status="regular" value="35%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatusBadge usado em linhas de indicadores com valores percentuais.',
      },
    },
  },
};

export const CompactComparison: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Janeiro</p>
        <StatusBadge status="regular" value="35%" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Fevereiro</p>
        <StatusBadge status="suficiente" value="52%" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Março</p>
        <StatusBadge status="bom" value="68%" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Abril</p>
        <StatusBadge status="otimo" value="85%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de evolução mensal usando StatusBadges.',
      },
    },
  },
};
