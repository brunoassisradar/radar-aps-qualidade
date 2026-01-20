import React, { useState, useEffect } from 'react';
import { Segmented } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { IndicatorChart } from '@/components/financiamento/IndicatorChart';
import { ReportTable } from '@/components/financiamento/ReportTable';
import { cn } from '@/lib/utils';
import { Users, Baby, Heart, Activity, Stethoscope, UserCheck, Flower2 } from 'lucide-react';

const periods = ['Consolidado', 'Janeiro', 'Fevereiro', 'Março', 'Abril'];

const indicadores = [{
  value: 'c1',
  label: 'Mais acesso',
  shortLabel: 'C1',
  icon: Users
}, {
  value: 'c2',
  label: 'Cuidado Infantil',
  shortLabel: 'C2',
  icon: Baby
}, {
  value: 'c3',
  label: 'Gestante e Puérpera',
  shortLabel: 'C3',
  icon: Heart
}, {
  value: 'c4',
  label: 'Pessoa com Diabetes',
  shortLabel: 'C4',
  icon: Activity
}, {
  value: 'c5',
  label: 'Pessoa com Hipertensão',
  shortLabel: 'C5',
  icon: Stethoscope
}, {
  value: 'c6',
  label: 'Pessoa Idosa',
  shortLabel: 'C6',
  icon: UserCheck
}, {
  value: 'c7',
  label: 'Cuidado da mulher',
  shortLabel: 'C7',
  icon: Flower2
}];

const QualidadeRelatorio: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Get initial values from URL params
  const initialIndicador = searchParams.get('indicador') || 'c1';
  const initialPeriodo = searchParams.get('periodo') || 'Consolidado';
  
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriodo);
  const [selectedIndicador, setSelectedIndicador] = useState(initialIndicador);
  
  // Update state when URL params change
  useEffect(() => {
    const indicadorParam = searchParams.get('indicador');
    const periodoParam = searchParams.get('periodo');
    
    if (indicadorParam && indicadores.some(i => i.value === indicadorParam)) {
      setSelectedIndicador(indicadorParam);
    }
    if (periodoParam && periods.includes(periodoParam)) {
      setSelectedPeriod(periodoParam);
    }
  }, [searchParams]);
  const selectedIndicadorData = indicadores.find(i => i.value === selectedIndicador);
  return <div>
      <PageHeader title="Relatório de Qualidade eSF/eAP" breadcrumbs={[{
      label: 'Financiamento APS',
      path: '/financiamento-aps'
    }, {
      label: 'Qualidade eSF/eAP',
      path: '/financiamento-aps/qualidade-esf-eap'
    }, {
      label: 'Relatório'
    }]} />

      <div className="space-y-6">
        {/* Filtros colapsados em um card clean */}
        <FilterBar periods={periods} selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

        {/* Seletor de período - visual melhorado */}
        <div className="rounded-lg bg-card p-1 shadow-sm">
          <Segmented block value={selectedPeriod} onChange={value => setSelectedPeriod(value as string)} options={periods} className="!bg-transparent" />
        </div>

        {/* Layout principal com navegação de indicadores */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de indicadores - redesenhada */}
          <nav className="shrink-0 lg:w-64">
            <div className="rounded-lg bg-card shadow-sm p-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
                Indicadores
              </p>
              <div className="space-y-1">
                {indicadores.map(ind => {
                const Icon = ind.icon;
                const isSelected = selectedIndicador === ind.value;
                return <button key={ind.value} onClick={() => setSelectedIndicador(ind.value)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150", "hover:bg-muted/50", isSelected ? "bg-primary/8 border-l-[3px] border-primary shadow-sm" : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent")}>
                      <span className={cn("flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold shrink-0 transition-colors", isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                        {ind.shortLabel}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-medium truncate", isSelected ? "text-foreground" : "")}>
                          {ind.label}
                        </p>
                      </div>
                    </button>;
              })}
              </div>
            </div>
          </nav>

          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Card de Boas Práticas */}
            <div className="rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  {selectedIndicadorData && <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                      <selectedIndicadorData.icon className="w-5 h-5" />
                    </span>}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Boas práticas
                    </p>
                    <h2 className="text-lg font-semibold text-foreground">
                      {selectedIndicadorData?.label}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <IndicatorChart 
                  selectedIndicador={selectedIndicador}
                  kpiValues={{ primary: 50, secondary: 40 }}
                />
              </div>
            </div>

            {/* Card de Classificação Equipe */}
            <div className="rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                    <Users className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">GESTANTE E PUÉRPERA</p>
                    <h2 className="text-lg font-semibold text-foreground">Classificação de equipes</h2>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <ReportTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default QualidadeRelatorio;