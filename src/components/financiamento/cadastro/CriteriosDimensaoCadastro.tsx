import React from 'react';
import { Collapse } from 'antd';
import { HelpCircle } from 'lucide-react';
import { CadastroResumo } from './CadastroResumo';
import { FatorMultiplicacaoTable } from './FatorMultiplicacaoTable';
import { PopulacaoParametroTable } from './PopulacaoParametroTable';
import { ClassificacaoCadastro } from './ClassificacaoCadastro';
import { CadastrosParametroGauge } from './CadastrosParametroGauge';
import { PontosAtencaoCards } from './PontosAtencaoCards';
import { CadastrosTempoChart } from './CadastrosTempoChart';

export const CriteriosDimensaoCadastro: React.FC = () => {
  const collapseItems = [
    {
      key: '1',
      label: (
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-primary">Critérios da Dimensão Cadastro</span>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
      ),
      children: (
        <div className="space-y-6 py-2">
          <CadastroResumo />
          <FatorMultiplicacaoTable />
          <PopulacaoParametroTable />
          <ClassificacaoCadastro />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Collapsible criteria section */}
      <Collapse 
        items={collapseItems}
        defaultActiveKey={['1']}
        className="bg-card rounded-lg shadow-sm"
        expandIconPosition="start"
      />

      {/* Gauge bar (outside collapse) */}
      <CadastrosParametroGauge />

      {/* Pontos de Atenção */}
      <PontosAtencaoCards />

      {/* Chart */}
      <CadastrosTempoChart />
    </div>
  );
};
