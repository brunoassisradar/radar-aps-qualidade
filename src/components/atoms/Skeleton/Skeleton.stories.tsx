import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { Skeleton } from './Skeleton';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
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
O componente **Skeleton** é usado como placeholder durante carregamento.
Exibe uma animação de pulse para indicar que conteúdo está sendo carregado.

### Uso básico
\`\`\`tsx
import { Skeleton } from '@/components/atoms/Skeleton';

<Skeleton className="h-4 w-[200px]" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {
    className: 'h-4 w-[200px]',
  },
};

// ===== SHAPES =====

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-12 w-12 rounded-md" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-10 w-10" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes formas de Skeleton: círculo, quadrado arredondado, linha e quadrado.',
      },
    },
  },
};

// ===== CARD SKELETON =====

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para um card com avatar e texto.',
      },
    },
  },
};

// ===== TABLE SKELETON =====

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border">
      {/* Header */}
      <div className="flex gap-4 border-b bg-muted/50 p-3">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      {/* Rows */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 border-b p-3 last:border-0">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para tabela com header e linhas.',
      },
    },
  },
};

// ===== LIST SKELETON =====

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-[300px] space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ===== CHART SKELETON =====

export const ChartSkeleton: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border p-4">
      <Skeleton className="h-5 w-[150px] mb-4" />
      <div className="flex items-end gap-2 h-[200px]">
        <Skeleton className="flex-1 h-[60%]" />
        <Skeleton className="flex-1 h-[80%]" />
        <Skeleton className="flex-1 h-[45%]" />
        <Skeleton className="flex-1 h-[90%]" />
        <Skeleton className="flex-1 h-[70%]" />
        <Skeleton className="flex-1 h-[55%]" />
      </div>
      <div className="flex justify-between mt-2">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para gráfico de barras.',
      },
    },
  },
};

// ===== STATS SKELETON =====

export const StatsSkeleton: Story = {
  render: () => (
    <div className="flex gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-[140px] rounded-lg border p-4">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  ),
};

// ===== PAGE SKELETON =====

export const PageSkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-3 w-24" />
      </div>
      
      {/* Title */}
      <Skeleton className="h-8 w-[250px]" />
      
      {/* Content */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="rounded-lg border p-4 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para página completa com breadcrumb, título e cards.',
      },
    },
  },
};
