import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';

const meta: Meta<typeof AppSidebar> = {
  title: 'Organisms/AppSidebar',
  component: AppSidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="h-screen flex">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Se a sidebar está colapsada',
    },
    isMobile: {
      control: 'boolean',
      description: 'Se está em modo mobile',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    collapsed: false,
    onCollapse: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    onCollapse: () => {},
  },
};

export const Mobile: Story = {
  args: {
    collapsed: false,
    onCollapse: () => {},
    isMobile: true,
    onCloseMobile: () => console.log('Close mobile'),
  },
};
