import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { PeriodSelector } from '@/components/financiamento/PeriodSelector';
import { OverviewTable } from '@/components/financiamento/OverviewTable';

const periods = ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'];

const QualidadeVisaoGeral: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Consolidado');

  return (
    <div>
      <PageHeader
        title="Visão geral de Qualidade eSF/eAP"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: 'Qualidade eSF/eAP' },
        ]}
      />

      <div className="space-y-6">
        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ClassificationCard
            classification="otimo"
            count={0}
            description="Ótimo: > 50 e ≤ 70"
          />
          <ClassificationCard
            classification="bom"
            count={36}
            description="Bom: > 30 e ≤ 50"
          />
          <ClassificationCard
            classification="suficiente"
            count={68}
            description="Suficiente: > 10 e ≤ 30"
          />
          <ClassificationCard
            classification="regular"
            count={304}
            description="Regular: ≤ 10 ou > 70"
          />
        </div>

        <div className="flex items-center justify-between">
          <PeriodSelector
            periods={periods}
            selectedPeriod={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>

        <OverviewTable />
      </div>
    </div>
  );
};

export default QualidadeVisaoGeral;
