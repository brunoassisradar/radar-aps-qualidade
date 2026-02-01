import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Search, Mail, Eye, EyeOff, Calendar } from 'lucide-react';
import { Input } from './Input';
import { Label } from '../Label';
import { Button } from '../Button';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **Input** é usado para entrada de dados do usuário.
Suporta todos os tipos de input HTML nativos e integra com o design system.

### Uso básico
\`\`\`tsx
import { Input } from '@/components/atoms/Input';

<Input placeholder="Digite aqui..." />
\`\`\`
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
      <Input type="date" />
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
      <Input placeholder="Somente leitura" readOnly defaultValue="Não editável" />
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

// ===== WITH ICONS =====

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Buscar..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" type="email" placeholder="Email" />
      </div>
      <div className="relative">
        <Input className="pr-10" type="password" placeholder="Senha" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};

// ===== FILE INPUT =====

export const FileInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Label htmlFor="file">Documento</Label>
      <Input id="file" type="file" />
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
