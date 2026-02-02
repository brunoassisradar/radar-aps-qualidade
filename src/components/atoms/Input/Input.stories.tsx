import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ConfigProvider } from 'antd';
import { Search, Mail, Eye, EyeOff, Calendar } from 'lucide-react';
import { Input } from './Input';
import { Label } from '../Label';
import { Button } from '../Button';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
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
O componente **Input** é usado para entrada de dados do usuário.
Baseado no Ant Design v4 Input, suporta todos os tipos de input HTML.

### Uso básico
\`\`\`tsx
import { Input } from '@/components/atoms/Input';

<Input placeholder="Digite aqui..." />
\`\`\`

### Tipos especiais
- \`type="password"\` → usa Input.Password
- \`type="search"\` → usa Input.Search
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date'],
      description: 'Tipo do input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Conteúdo do input',
  },
};

// ===== TYPES =====

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="text" placeholder="Texto" />
      <Input type="email" placeholder="email@exemplo.com" />
      <Input type="password" placeholder="Senha" />
      <Input type="number" placeholder="123" />
      <Input type="search" placeholder="Buscar..." />
    </div>
  ),
};

// ===== STATES =====

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input placeholder="Normal" />
      <Input placeholder="Com valor" defaultValue="Texto digitado" />
      <Input placeholder="Desabilitado" disabled />
      <Input placeholder="Somente leitura" readOnly value="Não editável" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Campo desabilitado',
    disabled: true,
  },
};

// ===== WITH LABEL =====

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
};

export const FormField: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-[300px]">
      <Label htmlFor="username">Nome de usuário</Label>
      <Input id="username" placeholder="johndoe" />
      <p className="text-xs text-muted-foreground">
        Seu nome de usuário público.
      </p>
    </div>
  ),
};

// ===== WITH PREFIX/SUFFIX =====

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input 
        prefix={<Search className="h-4 w-4 text-gray-400" />}
        placeholder="Buscar..." 
      />
      <Input 
        prefix={<Mail className="h-4 w-4 text-gray-400" />}
        type="email" 
        placeholder="Email" 
      />
      <Input 
        type="password"
        placeholder="Senha" 
      />
    </div>
  ),
};

// ===== SIZES COMPARISON =====

export const InForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px] p-6 border rounded-lg">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" placeholder="João da Silva" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" placeholder="joao@email.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
      </div>
      <Button className="mt-2">Enviar</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de inputs em um formulário completo.',
      },
    },
  },
};
