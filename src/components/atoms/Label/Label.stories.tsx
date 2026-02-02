import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider, Checkbox } from 'antd';
import { Label } from './Label';
import { Input } from '../Input';
import ptBR from '@/lib/antd-locale-pt-BR';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
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
O componente **Label** é usado para rotular campos de formulário.
É um elemento HTML nativo estilizado para manter consistência com o design system.

### Uso básico
\`\`\`tsx
import { Label } from '@/components/atoms/Label';

<Label htmlFor="email">Email</Label>
<Input id="email" />
\`\`\`

### Nota
Para formulários Ant Design, prefira usar \`Form.Item\` com a prop \`label\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID do elemento que o label referencia',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC =====

export const Default: Story = {
  args: {
    children: 'Label de exemplo',
  },
};

// ===== WITH INPUT =====

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Label htmlFor="username">Nome de usuário</Label>
      <Input id="username" placeholder="Digite seu nome" />
    </div>
  ),
};

// ===== REQUIRED FIELD =====

export const RequiredField: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Label htmlFor="required-email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input id="required-email" type="email" placeholder="obrigatório" />
    </div>
  ),
};

// ===== WITH HELPER TEXT =====

export const WithHelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-[300px]">
      <Label htmlFor="password">Senha</Label>
      <Input id="password" type="password" />
      <p className="text-xs text-muted-foreground">
        Mínimo de 8 caracteres.
      </p>
    </div>
  ),
};

// ===== WITH CHECKBOX =====

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos de uso</Label>
    </div>
  ),
};

// ===== DISABLED STATE =====

export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Label htmlFor="disabled-input" className="text-muted-foreground">
        Campo desabilitado
      </Label>
      <Input id="disabled-input" disabled placeholder="Não editável" />
    </div>
  ),
};

// ===== FORM EXAMPLE =====

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="form-name">
          Nome completo <span className="text-red-500">*</span>
        </Label>
        <Input id="form-name" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="form-email2">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="form-email2" type="email" />
        <p className="text-xs text-muted-foreground">
          Usaremos para enviar notificações.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="form-bio">Bio (opcional)</Label>
        <Input id="form-bio" />
      </div>
    </div>
  ),
};
