import React from 'react';
import { PageHeader } from '@/components/molecules/PageHeader';
import { InfoCard } from '@/components/molecules/InfoCard';
import { FAQAccordion, FAQItem } from '@/components/molecules/FAQAccordion';

export interface DashboardCardConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  links?: { label: string; path: string }[];
  variant?: 'default' | 'primary';
}

export interface DashboardTemplateProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
  cards: DashboardCardConfig[];
  faqItems?: FAQItem[];
  faqTitle?: string;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  title,
  breadcrumbs,
  cards,
  faqItems = [],
  faqTitle = 'Perguntas frequentes',
}) => {
  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />

      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(cards.length, 3)} gap-6 mb-8`}>
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            links={card.links}
            variant={card.variant}
          />
        ))}
      </div>

      {faqItems.length > 0 && (
        <FAQAccordion items={faqItems} title={faqTitle} />
      )}
    </div>
  );
};
