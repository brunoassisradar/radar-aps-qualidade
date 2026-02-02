import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { Separator } from './Separator';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
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
O componente **Separator** é usado para dividir visualmente seções de conteúdo.
Baseado no Ant Design v4 Divider, pode ser horizontal ou vertical.

### Uso básico
\`\`\`tsx
import { Separator } from '@/components/atoms/Separator';

<Separator />
<Separator orientation="vertical" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do separador',
    },
    decorative: {
      control: 'boolean',
      description: 'Se é puramente decorativo (acessibilidade)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="text-sm">Conteúdo acima</div>
      <Separator />
      <div className="text-sm">Conteúdo abaixo</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4">
      <span className="text-sm">Item 1</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Item 2</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Item 3</span>
    </div>
  ),
};

// ===== USE CASES =====

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <h4 className="font-medium">Título do Card</h4>
      <p className="text-sm text-muted-foreground">Descrição do conteúdo</p>
      <Separator className="my-4" />
      <div className="flex justify-between text-sm">
        <span>Total</span>
        <span className="font-medium">R$ 150,00</span>
      </div>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-[200px] rounded-lg border p-2">
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Perfil</div>
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer">Configurações</div>
      <Separator className="my-2" />
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded cursor-pointer text-destructive">Sair</div>
    </div>
  ),
};

export const InBreadcrumb: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Home</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="text-muted-foreground">Qualidade</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Visão Geral</span>
    </div>
  ),
};

export const InStats: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8">
      <div className="text-center">
        <div className="text-2xl font-bold">128</div>
        <div className="text-xs text-muted-foreground">Equipes</div>
      </div>
      <Separator orientation="vertical" className="h-12" />
      <div className="text-center">
        <div className="text-2xl font-bold">85%</div>
        <div className="text-xs text-muted-foreground">Meta</div>
      </div>
      <Separator orientation="vertical" className="h-12" />
      <div className="text-center">
        <div className="text-2xl font-bold">42</div>
        <div className="text-xs text-muted-foreground">Ótimo</div>
      </div>
    </div>
  ),
};
