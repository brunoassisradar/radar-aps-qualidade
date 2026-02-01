/**
 * Design Tokens - Unified Export
 * 
 * Biblioteca completa de tokens de design para o sistema Radar APS.
 * Importação: import { colors, typography, spacing, shadows } from '@/lib/design-tokens';
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// Re-export for convenience
export { colors } from './colors';
export { typography, textStyles } from './typography';
export { spacing, semanticSpacing } from './spacing';
export { shadows, borderRadius, transitions, opacity } from './shadows';
