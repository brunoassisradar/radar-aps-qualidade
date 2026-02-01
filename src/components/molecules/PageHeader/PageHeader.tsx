import React from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, actions }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">{title}</h1>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </div>
  );
};
