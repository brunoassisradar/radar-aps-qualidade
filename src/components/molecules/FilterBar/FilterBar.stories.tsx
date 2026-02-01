import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: {
      action: 'search clicked',
      description: 'Callback quando o botão Buscar é clicado',
    },
    onClear: {
      action: 'clear clicked',
      description: 'Callback quando o botão Limpar é clicado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: () => console.log('Search clicked'),
    onClear: () => console.log('Clear clicked'),
  },
};

export const WithPeriods: Story = {
  args: {
    periods: ['Q1 2024', 'Q2 2024', 'Q3 2024'],
    selectedPeriod: 'Q1 2024',
    onSearch: () => console.log('Search clicked'),
    onClear: () => console.log('Clear clicked'),
  },
};
