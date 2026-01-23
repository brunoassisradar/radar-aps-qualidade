import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { OverviewTable } from '@/components/financiamento/OverviewTable';
import { VinculoAcompanhamentoTable } from '@/components/financiamento/VinculoAcompanhamentoTable';
import { ResultadoMunicipio } from '@/components/financiamento/ResultadoMunicipio';
import { ComparativoCadastro } from '@/components/financiamento/ComparativoCadastro';
import { CriteriosVinculacao } from '@/components/financiamento/CriteriosVinculacao';

const QualidadeVisaoGeral: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'vinculo';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync state with URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['vinculo', 'qualidade'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', key);
    setSearchParams(newParams, { replace: true });
  };

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: (
        <div className="space-y-6 pt-4">
          <FilterBar />
          <ResultadoMunicipio
            escoreCadastro={3}
            escoreAcompanhamento={3.5}
            notaFinal={6.5}
            classificacao="suficiente"
          />
          <ComparativoCadastro
            municipio="Fortaleza - CE"
            pessoasCadastradas={2339333}
            pessoasCadastroAtualizado={1500703}
            pessoasAcompanhadas={825242}
            populacaoIBGE={2800000}
            populacaoLimite={3200000}
          />
          <VinculoAcompanhamentoTable />
          <CriteriosVinculacao />
        </div>
      ),
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: (
        <div className="space-y-6 pt-4">
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

          <OverviewTable />
        </div>
      ),
    },
  ];

  const breadcrumbLabel = activeTab === 'vinculo' ? 'Vínculo e Acompanhamento' : 'Qualidade eSF/eAP';

  return (
    <div>
      <PageHeader
        title="Visão geral do Financiamento APS"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel },
        ]}
      />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      />
    </div>
  );
};

export default QualidadeVisaoGeral;
