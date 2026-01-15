import React, { useState } from 'react';
import { Tabs, Anchor } from 'antd';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
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

  const anchorItems = indicadores.map((ind) => ({
    key: ind.value,
    href: `#${ind.value}`,
    title: ind.label,
  }));

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string }
  ) => {
    e.preventDefault();
    const indicadorValue = link.href.replace('#', '');
    setSelectedIndicador(indicadorValue);
  };

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
        <FilterBar 
          periods={periods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de indicadores */}
          <div className="shrink-0">
            <Anchor
              affix={false}
              onClick={handleAnchorClick}
              getCurrentAnchor={() => `#${selectedIndicador}`}
              items={anchorItems}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 space-y-6">
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
