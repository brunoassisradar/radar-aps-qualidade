/**
 * Atoms - Barrel Export
 * 
 * Exportação unificada de todos os componentes atômicos.
 * Importação: import { Button, Input, Badge } from '@/components/atoms';
 */

// Button
export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button';

// Input
export { Input } from './Input';
export type { InputProps } from './Input';

// Label
export { Label, labelVariants } from './Label';
export type { LabelProps } from './Label';

// Badge
export { Badge, badgeVariants } from './Badge';
export type { BadgeProps } from './Badge';

// StatusBadge
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, Status } from './StatusBadge';

// Skeleton
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

// Separator
export { Separator } from './Separator';
export type { SeparatorProps } from './Separator';
