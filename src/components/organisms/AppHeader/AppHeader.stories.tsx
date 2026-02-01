import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleSidebar: {
      action: 'sidebar toggled',
      description: 'Callback quando o botão de menu é clicado',
    },
    logoSrc: {
      control: 'text',
      description: 'URL do logotipo',
    },
    logoAlt: {
      control: 'text',
      description: 'Texto alternativo do logotipo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onToggleSidebar: () => console.log('Toggle sidebar'),
  },
};

export const CustomLogo: Story = {
  args: {
    onToggleSidebar: () => console.log('Toggle sidebar'),
    logoSrc: 'https://via.placeholder.com/120x40?text=Logo',
    logoAlt: 'Custom Logo',
  },
};
