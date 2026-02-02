import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { Badge } from './Badge';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <ConfigProvider locale={ptBR}>
        <Story />
      </ConfigProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **Badge** é usado para exibir status, categorias ou contadores.
Baseado no Ant Design v4 Tag, inclui variantes semânticas para indicadores de saúde.

### Uso básico
\`\`\`tsx
import { Badge } from '@/components/atoms/Badge';

<Badge variant="default">Novo</Badge>
<Badge variant="otimo">Ótimo</Badge>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'otimo', 'bom', 'suficiente', 'regular'],
      description: 'Variante visual do badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

// ===== CORE VARIANTS =====

export const CoreVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Variantes base do componente Badge.',
      },
    },
  },
};

// ===== STATUS VARIANTS =====

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="otimo">Ótimo</Badge>
      <Badge variant="bom">Bom</Badge>
      <Badge variant="suficiente">Suficiente</Badge>
      <Badge variant="regular">Regular</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Variantes de status para indicadores de saúde/qualidade da APS.',
      },
    },
  },
};

// ===== WITH VALUES =====

export const WithValues: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="otimo">Ótimo 85%</Badge>
      <Badge variant="bom">Bom 72%</Badge>
      <Badge variant="suficiente">Suficiente 58%</Badge>
      <Badge variant="regular">Regular 35%</Badge>
    </div>
  ),
};

// ===== USE CASES =====

export const InCard: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <h4 className="font-medium">Indicador de Qualidade</h4>
        <p className="text-sm text-muted-foreground">Pré-natal - Gestantes cadastradas</p>
      </div>
      <Badge variant="otimo">85%</Badge>
    </div>
  ),
};

export const InTable: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border">
      <div className="flex items-center justify-between border-b p-3 bg-muted/50">
        <span className="text-sm font-medium">Equipe</span>
        <span className="text-sm font-medium">Status</span>
      </div>
      <div className="flex items-center justify-between p-3 border-b">
        <span className="text-sm">ESF Centro</span>
        <Badge variant="otimo">Ótimo</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border-b">
        <span className="text-sm">ESF Norte</span>
        <Badge variant="bom">Bom</Badge>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-sm">ESF Sul</span>
        <Badge variant="regular">Regular</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges usados em contexto de tabela para indicar status.',
      },
    },
  },
};

export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Notificações</span>
      <Badge variant="destructive">12</Badge>
    </div>
  ),
};

export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Tailwind</Badge>
      <Badge variant="secondary">Storybook</Badge>
    </div>
  ),
};
