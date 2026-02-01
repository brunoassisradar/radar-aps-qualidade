/**
 * Design Tokens - Colors
 * 
 * Sistema de cores baseado em HSL para máxima flexibilidade.
 * Todas as cores devem ser usadas através de variáveis CSS ou classes Tailwind.
 */

export const colors = {
  // Core Colors
  primary: {
    DEFAULT: 'hsl(214, 100%, 50%)',
    foreground: 'hsl(0, 0%, 100%)',
    hsl: '214 100% 50%',
  },
  
  // Neutral Colors
  background: {
    DEFAULT: 'hsl(227, 29%, 96%)',
    hsl: '227 29% 96%',
  },
  foreground: {
    DEFAULT: 'hsl(222, 47%, 11%)',
    hsl: '222 47% 11%',
  },
  card: {
    DEFAULT: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222, 47%, 11%)',
    hsl: '0 0% 100%',
  },
  muted: {
    DEFAULT: 'hsl(220, 14%, 96%)',
    foreground: 'hsl(220, 9%, 46%)',
    hsl: '220 14% 96%',
  },
  
  // Semantic Colors - Status Indicators
  status: {
    otimo: {
      DEFAULT: 'hsl(202, 52%, 49%)',
      bg: 'hsl(202, 52%, 95%)',
      hex: '#3C8DBC',
      hsl: '202 52% 49%',
    },
    bom: {
      DEFAULT: 'hsl(153, 100%, 33%)',
      bg: 'hsl(153, 100%, 95%)',
      hex: '#00A65A',
      hsl: '153 100% 33%',
    },
    suficiente: {
      DEFAULT: 'hsl(35, 85%, 62%)',
      bg: 'hsl(35, 85%, 95%)',
      hex: '#F0AD4E',
      hsl: '35 85% 62%',
    },
    regular: {
      DEFAULT: 'hsl(7, 70%, 54%)',
      bg: 'hsl(7, 70%, 95%)',
      hex: '#DD4B39',
      hsl: '7 70% 54%',
    },
  },
  
  // UI Colors
  border: {
    DEFAULT: 'hsl(220, 13%, 91%)',
    hsl: '220 13% 91%',
  },
  input: {
    DEFAULT: 'hsl(220, 13%, 91%)',
    hsl: '220 13% 91%',
  },
  ring: {
    DEFAULT: 'hsl(214, 100%, 50%)',
    hsl: '214 100% 50%',
  },
  
  // Accent Colors
  accent: {
    DEFAULT: 'hsl(214, 100%, 97%)',
    foreground: 'hsl(214, 100%, 50%)',
    hsl: '214 100% 97%',
  },
  destructive: {
    DEFAULT: 'hsl(0, 84%, 60%)',
    foreground: 'hsl(0, 0%, 100%)',
    hsl: '0 84% 60%',
  },
  
  // Chart Colors
  chart: {
    primary: 'hsl(214, 100%, 50%)',
    secondary: 'hsl(214, 60%, 70%)',
  },
} as const;

export type ColorToken = keyof typeof colors;
export type StatusColor = keyof typeof colors.status;
