import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ConfigProvider } from 'antd';
import { Mail, ChevronRight, Plus, Trash2, Download } from 'lucide-react';
import { Button } from './Button';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
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
O componente **Button** é o átomo mais fundamental para ações do usuário.
Baseado no Ant Design v4 Button, suporta múltiplas variantes visuais e tamanhos.

### Uso básico
\`\`\`tsx
import { Button } from '@/components/atoms/Button';

<Button variant="default">Clique aqui</Button>
\`\`\`

### Mapeamento de variantes
- \`default\` → \`type="primary"\`
- \`secondary\` → \`type="default"\`
- \`outline\` → \`type="default"\`
- \`destructive\` → \`type="primary" danger\`
- \`ghost\` → \`type="text"\`
- \`link\` → \`type="link"\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Variante visual do botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Tamanho do botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC STORIES =====

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="h-4 w-4" />
        Enviar Email
      </>
    ),
  },
};

export const IconRight: Story = {
  args: {
    children: (
      <>
        Próximo
        <ChevronRight className="h-4 w-4" />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Plus className="h-4 w-4" />,
  },
};

// ===== VARIANTS =====

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes visuais disponíveis para o Button.',
      },
    },
  },
};

export const Destructive: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="destructive">
        <Trash2 className="h-4 w-4" />
        Excluir
      </Button>
      <Button variant="destructive" size="sm">
        <Trash2 className="h-4 w-4" />
        Remover
      </Button>
    </div>
  ),
};

// ===== SIZES =====

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// ===== STATES =====

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>Disabled Default</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
    </div>
  ),
};

// ===== USE CASES =====

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">
        Salvar
      </Button>
      <Button variant="outline">
        Cancelar
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de botões de ação primária e secundária.',
      },
    },
  },
};

export const ToolbarButtons: Story = {
  render: () => (
    <div className="flex gap-1 rounded-lg border border-border p-1">
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Mail className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botões ghost são ideais para barras de ferramentas.',
      },
    },
  },
};
