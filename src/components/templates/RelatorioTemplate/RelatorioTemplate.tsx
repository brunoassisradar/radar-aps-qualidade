import React from 'react';
import { Segmented } from 'antd';
import { PageHeader } from '@/components/molecules/PageHeader';

export interface RelatorioTemplateProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
  periodOptions: string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export const RelatorioTemplate: React.FC<RelatorioTemplateProps> = ({
  title,
  breadcrumbs,
  periodOptions,
  selectedPeriod,
  onPeriodChange,
  headerActions,
  children,
}) => {
  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        actions={headerActions}
      />

      <div className="mb-6">
        <Segmented
          options={periodOptions}
          value={selectedPeriod}
          onChange={(value) => onPeriodChange(value as string)}
          size="large"
          className="w-full sm:w-auto"
        />
      </div>

      {children}
    </div>
  );
};
