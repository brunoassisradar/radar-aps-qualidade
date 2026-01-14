import React, { useState } from 'react';
import { Select, Tabs } from 'antd';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { PeriodSelector } from '@/components/financiamento/PeriodSelector';
import { IndicatorChart } from '@/components/financiamento/IndicatorChart';
import { ReportTable } from '@/components/financiamento/ReportTable';

const periods = ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'];

const indicadores = [
  { value: 'c1', label: 'C1 - Mais acesso' },
  { value: 'c2', label: 'C2 - Cuidado Infantil' },
  { value: 'c3', label: 'C3 - Gestante e Puérpera' },
  { value: 'c4', label: 'C4 - Pessoa com Diabetes' },
  { value: 'c5', label: 'C5 - Pessoa com Hipertensão' },
  { value: 'c6', label: 'C6 - Pessoa Idosa' },
  { value: 'c7', label: 'C7 - Cuidado da mulher' },
];

const QualidadeRelatorio: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Consolidado');
  const [selectedIndicador, setSelectedIndicador] = useState('c3');
  const [activeTab, setActiveTab] = useState('boas-praticas');

  return (
    <div>
      <PageHeader
        title="Relatório de Qualidade eSF/eAP"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: 'Qualidade eSF/eAP', path: '/financiamento-aps/qualidade-esf-eap' },
          { label: 'Relatório' },
        ]}
      />

      <div className="space-y-6">
        <FilterBar />

        <div className="flex flex-wrap items-center gap-4">
          <PeriodSelector
            periods={periods}
            selectedPeriod={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de indicadores */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-card p-4 shadow-sm">
              <div className="space-y-1">
                {indicadores.map((ind) => (
                  <button
                    key={ind.value}
                    onClick={() => setSelectedIndicador(ind.value)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                      selectedIndicador === ind.value
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-lg bg-card shadow-sm overflow-hidden">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="px-4 pt-2"
                items={[
                  {
                    key: 'boas-praticas',
                    label: 'Boas práticas',
                    children: (
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">
                          {indicadores.find((i) => i.value === selectedIndicador)?.label}
                        </h3>
                        <IndicatorChart />
                      </div>
                    ),
                  },
                  {
                    key: 'classificacao',
                    label: 'Classificação equipe',
                    children: (
                      <div className="p-4">
                        <ReportTable />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualidadeRelatorio;
