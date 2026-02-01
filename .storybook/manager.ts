import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Radar APS - Design System',
  brandUrl: 'https://radar-aps-qualidade.lovable.app',
  colorPrimary: '#0064FF',
  colorSecondary: '#0064FF',
  
  // UI
  appBg: '#F4F5F8',
  appContentBg: '#ffffff',
  appBorderColor: '#E5E7EB',
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: 'monospace',
  
  // Text colors
  textColor: '#1E293B',
  textInverseColor: '#ffffff',
  
  // Toolbar default and active colors
  barTextColor: '#64748B',
  barSelectedColor: '#0064FF',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#E5E7EB',
  inputTextColor: '#1E293B',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
