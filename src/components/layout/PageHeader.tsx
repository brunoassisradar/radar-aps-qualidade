import React from 'react';
import { Breadcrumb } from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="mb-6">
      <Breadcrumb items={breadcrumbs} />
      <h1 className="mt-2 text-2xl font-semibold text-foreground">{title}</h1>
    </div>
  );
};
