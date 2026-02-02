/**
 * Radar APS - Component Library
 * 
 * Biblioteca completa de componentes seguindo Atomic Design.
 * 
 * @example
 * // Importação de átomos
 * import { Button, Input, Badge, StatusBadge } from '@/components/atoms';
 * 
 * // Importação de moléculas
 * import { InfoCard, FilterBar, PageHeader } from '@/components/molecules';
 * 
 * // Importação de organismos
 * import { AppHeader, OverviewTable, IndicatorChart } from '@/components/organisms';
 * 
 * // Importação de templates
 * import { AppLayout, DashboardTemplate } from '@/components/templates';
 * 
 * // Ou importação unificada
 * import { Button, InfoCard, AppHeader, AppLayout } from '@/components';
 */

// ============================================================================
// ATOMS - Elementos básicos e indivisíveis
// ============================================================================
export {
  // Button
  Button,
  buttonVariants,
  // Input
  Input,
  // Label
  Label,
  labelVariants,
  // Badge
  Badge,
  badgeVariants,
  // StatusBadge
  StatusBadge,
  // Skeleton
  Skeleton,
  // Separator
  Separator,
} from './atoms';

export type {
  ButtonProps,
  InputProps,
  LabelProps,
  BadgeProps,
  StatusBadgeProps,
  Status,
  SkeletonProps,
  SeparatorProps,
} from './atoms';

// ============================================================================
// MOLECULES - Grupos de átomos funcionando juntos
// ============================================================================
export {
  ClassificationCard,
  InfoCard,
  PeriodSelector,
  FilterBar,
  PageHeader,
  FAQAccordion,
} from './molecules';

export type {
  ClassificationCardProps,
  InfoCardProps,
  InfoCardLink,
  PeriodSelectorProps,
  FilterBarProps,
  PageHeaderProps,
  BreadcrumbItem,
  FAQAccordionProps,
  FAQItem,
} from './molecules';

// ============================================================================
// ORGANISMS - Seções complexas de UI
// ============================================================================
export {
  AppHeader,
  AppSidebar,
  OverviewTable,
  ReportTable,
  ResultadoMunicipio,
  IndicatorChart,
} from './organisms';

export type {
  AppHeaderProps,
} from './organisms';

// ============================================================================
// TEMPLATES - Layouts de página completos
// ============================================================================
export {
  AppLayout,
  DashboardTemplate,
  VisaoGeralTemplate,
  RelatorioTemplate,
} from './templates';

export type {
  AppLayoutProps,
  DashboardTemplateProps,
  DashboardCardConfig,
  VisaoGeralTemplateProps,
  TabConfig,
  RelatorioTemplateProps,
} from './templates';
