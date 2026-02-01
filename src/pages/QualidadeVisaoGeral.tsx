import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { OverviewTable } from '@/components/financiamento/OverviewTable';
import { VinculoAcompanhamentoTable } from '@/components/financiamento/VinculoAcompanhamentoTable';
import { ResultadoMunicipio } from '@/components/financiamento/ResultadoMunicipio';
import { ComparativoCadastro } from '@/components/financiamento/ComparativoCadastro';
import { CriteriosVinculacao } from '@/components/financiamento/CriteriosVinculacao';
import { Button } from '@/components/ui/button';

const QualidadeVisaoGeral: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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
      key: 'tab1',
      label: 'Tab 1',
      children: (
        <div className="space-y-6 pt-4">
          <div className="rounded-lg bg-card p-8 shadow-sm text-center">
            <p className="text-muted-foreground">Conteúdo da Tab 1 (em desenvolvimento)</p>
          </div>
        </div>
      ),
    },
    {
      key: 'tab2',
      label: 'Tab 2',
      children: (
        <div className="space-y-6 pt-4">
          <div className="rounded-lg bg-card p-8 shadow-sm text-center">
            <p className="text-muted-foreground">Conteúdo da Tab 2 (em desenvolvimento)</p>
          </div>
        </div>
      ),
    },
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: (
        <div className="space-y-4 sm:space-y-6 pt-4">
          <FilterBar />
          <ResultadoMunicipio
            escoreCadastro={3}
            escoreAcompanhamento={3.5}
            notaFinal={6.5}
            classificacao="suficiente"
          />
          <ComparativoCadastro
            municipio="Lorem ipsum"
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
        <div className="space-y-4 sm:space-y-6 pt-4">
          <FilterBar />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
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
    {
      key: 'tab5',
      label: 'Tab 5',
      children: (
        <div className="space-y-6 pt-4">
          <div className="rounded-lg bg-card p-8 shadow-sm text-center">
            <p className="text-muted-foreground">Conteúdo da Tab 5 (em desenvolvimento)</p>
          </div>
        </div>
      ),
    },
    {
      key: 'tab6',
      label: 'Tab 6',
      children: (
        <div className="space-y-6 pt-4">
          <div className="rounded-lg bg-card p-8 shadow-sm text-center">
            <p className="text-muted-foreground">Conteúdo da Tab 6 (em desenvolvimento)</p>
          </div>
        </div>
      ),
    },
  ];

  const breadcrumbLabel = activeTab === 'vinculo' ? 'Vínculo e Acompanhamento' : 'Qualidade eSF/eAP';
  
  const relatorioPath = `/financiamento-aps/qualidade-esf-eap/relatorio?tab=${activeTab}`;
  const individualizadoPath = `/financiamento-aps/qualidade-esf-eap/individualizado?tab=${activeTab}`;

  const headerActions = (
    <Button 
      variant="outline" 
      size="sm"
      className="border-primary text-primary hover:bg-primary/5"
      onClick={() => navigate(individualizadoPath)}
    >
      Busca ativa
    </Button>
  );

  const pageTitle = activeTab === 'vinculo' ? 'Visão geral de Vínculo e Acompanhamento' : 'Visão geral de Qualidade eSF/eAP';

  return (
    <div>
      <PageHeader
        title={pageTitle}
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel },
        ]}
        actions={headerActions}
      />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        size="large"
        className="financiamento-tabs"
      >
        {tabItems.map(item => (
          <Tabs.TabPane key={item.key} tab={item.label}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default QualidadeVisaoGeral;
