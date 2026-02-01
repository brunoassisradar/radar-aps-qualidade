import React from 'react';
import { Tabs } from 'antd';
import { PageHeader } from '@/components/molecules/PageHeader';

export interface TabConfig {
  key: string;
  label: string;
  children: React.ReactNode;
}

export interface VisaoGeralTemplateProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (key: string) => void;
  headerActions?: React.ReactNode;
}

export const VisaoGeralTemplate: React.FC<VisaoGeralTemplateProps> = ({
  title,
  breadcrumbs,
  tabs,
  activeTab,
  onTabChange,
  headerActions,
}) => {
  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        actions={headerActions}
      />

      <Tabs
        activeKey={activeTab}
        onChange={onTabChange}
        size="large"
        className="financiamento-tabs"
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} tab={tab.label}>
            {tab.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
