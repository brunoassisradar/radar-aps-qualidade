import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PeriodSelector } from './PeriodSelector';

const meta: Meta<typeof PeriodSelector> = {
  title: 'Molecules/PeriodSelector',
  component: PeriodSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    periods: {
      control: 'object',
      description: 'Array de períodos disponíveis para seleção',
    },
    selectedPeriod: {
      control: 'text',
      description: 'Período atualmente selecionado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    periods: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    selectedPeriod: 'Q1 2024',
    onChange: () => {},
  },
};

export const Quadrimestres: Story = {
  args: {
    periods: ['1° Quadrimestre', '2° Quadrimestre', '3° Quadrimestre'],
    selectedPeriod: '1° Quadrimestre',
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState('Janeiro');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
    
    return (
      <div className="w-[400px]">
        <PeriodSelector
          periods={months}
          selectedPeriod={selected}
          onChange={setSelected}
        />
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Selecionado: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const TwoPeriods: Story = {
  args: {
    periods: ['Atual', 'Anterior'],
    selectedPeriod: 'Atual',
    onChange: () => {},
  },
};
