import type { Preview } from '@storybook/react';
import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from '../src/lib/antd-locale-pt-BR';
import '../src/index.css';
import 'antd/dist/antd.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'hsl(227, 29%, 96%)',
        },
        {
          name: 'dark',
          value: 'hsl(222, 47%, 11%)',
        },
        {
          name: 'card',
          value: 'hsl(0, 0%, 100%)',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={ptBR}>
        <Story />
      </ConfigProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
