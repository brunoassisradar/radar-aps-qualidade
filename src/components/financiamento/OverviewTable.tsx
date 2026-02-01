import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface MonthData {
  status: Classification;
  value: string;
}

interface IndicatorData {
  id: string;
  name: string;
  janeiro: MonthData;
  fevereiro: MonthData;
  marco: MonthData;
  abril: MonthData;
  consolidado: MonthData;
}

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  tipoEquipe: string;
  consolidado: MonthData;
  indicadores: IndicatorData[];
}

interface OverviewTableProps {
  data?: TeamData[];
  totalEquipes?: number;
}

const sampleIndicators: IndicatorData[] = [
  {
    id: 'c1',
    name: 'C1 - Mais acesso (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c2',
    name: 'C2 - Cuidado Infantil (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c3',
    name: 'C3 - Gestante e Puérpera (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c4',
    name: 'C4 - Pessoa com Diabetes (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c5',
    name: 'C5 - Pessoa com Hipertensão (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c6',
    name: 'C6 - Pessoa Idosa (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c7',
    name: 'C7 - Cuidado da mulher (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
];

const sampleData: TeamData[] = [
  {
    key: '1',
    equipe: 'ESF Vila Nova',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '2',
    equipe: 'ESF Jardim América',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '3',
    equipe: 'ESF Centro',
    unidade: 'UBS Sul',
    tipoEquipe: 'eAP',
    consolidado: { status: 'bom', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '4',
    equipe: 'ESF Parque Industrial',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'suficiente', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '5',
    equipe: 'ESF Bela Vista',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
];

const statusColors: Record<Classification, string> = {
  otimo: 'bg-[#3C8DBC]',
  bom: 'bg-[#00A65A]',
  suficiente: 'bg-[#F0AD4E]',
  regular: 'bg-[#DD4B39]',
};

const statusLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

interface StatusCellProps {
  data: MonthData;
  showLink?: boolean;
  indicador?: string;
  month?: string;
  equipeKey?: string;
  compact?: boolean;
}

const monthToParam: Record<string, string> = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
  consolidado: 'Consolidado',
};

const indicatorToParam: Record<string, string> = {
  c1: 'c1',
  c2: 'c2',
  c3: 'c3',
  c4: 'c4',
  c5: 'c5',
  c6: 'c6',
  c7: 'c7',
};

const StatusCell: React.FC<StatusCellProps> = ({ data, showLink = true, indicador, month, equipeKey, compact = false }) => {
  const content = (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${showLink ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${statusColors[data.status]}`} />
      <span className={compact ? "text-xs" : "text-xs sm:text-sm"}>
        {statusLabels[data.status]} | {data.value}
      </span>
      {showLink && (
        <ChevronRightIcon className="h-3 w-3 text-muted-foreground shrink-0" />
      )}
    </div>
  );

  if (showLink && indicador && month) {
    const params = new URLSearchParams({
      tab: 'qualidade',
      indicador: indicatorToParam[indicador] || indicador,
      periodo: monthToParam[month] || month,
    });
    if (equipeKey) {
      params.set('equipe', equipeKey);
    }
    return (
      <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?${params.toString()}`}>
        {content}
      </Link>
    );
  }

  return content;
};

const statusOrder: Record<Classification, number> = {
  otimo: 1,
  bom: 2,
  suficiente: 3,
  regular: 4,
};

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

// Mobile card component for each team
const MobileTeamCard: React.FC<{ record: TeamData }> = ({ record }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="bg-card rounded-lg border border-border p-3 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{record.equipe}</p>
          <p className="text-xs text-muted-foreground truncate">{record.unidade}</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-muted rounded text-xs">{record.tipoEquipe}</span>
        </div>
        <StatusCell data={record.consolidado} showLink={false} compact />
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade&equipe=${record.key}`} className="flex-1">
          <Button type="default" size="small" block>Relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/individualizado?equipe=${record.key}`} className="flex-1">
          <Button type="default" size="small" block>Individual</Button>
        </Link>
        <Button 
          type="text" 
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          icon={isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        />
      </div>
      
      {/* Expanded content - Indicators */}
      {isExpanded && (
        <div className="pt-3 border-t border-border space-y-2">
          {record.indicadores.map((indicador) => (
            <div key={indicador.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground flex-1 mr-2">{indicador.name}</span>
              <StatusCell 
                data={indicador.consolidado} 
                indicador={indicador.id} 
                month="consolidado" 
                equipeKey={record.key}
                compact
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getColumns = (onHelpClick: () => void): ColumnsType<TeamData> => [
  {
    title: 'Equipe',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '25%',
    render: (text: string) => <span className="font-medium text-sm">{text}</span>,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '20%',
    responsive: ['lg'],
  },
  {
    title: 'Tipo',
    dataIndex: 'tipoEquipe',
    key: 'tipoEquipe',
    width: '10%',
    responsive: ['md'],
  },
  {
    title: (
      <div className="flex items-center gap-1">
        <span className="hidden sm:inline">Conceito obtido</span>
        <span className="sm:hidden">Conceito</span>
        <HelpCircle 
          className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            onHelpClick();
          }}
        />
      </div>
    ),
    dataIndex: 'consolidado',
    key: 'consolidado',
    width: '25%',
    filters: statusFilters,
    onFilter: (value, record) => record.consolidado.status === value,
    sorter: (a, b) => statusOrder[a.consolidado.status] - statusOrder[b.consolidado.status],
    render: (data: MonthData) => <StatusCell data={data} showLink={false} />,
  },
  {
    title: 'Ação',
    key: 'acao',
    width: '20%',
    render: (_: unknown, record: TeamData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade&equipe=${record.key}`}>
          <Button type="default" size="small">Relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/individualizado?equipe=${record.key}`} className="hidden lg:block">
          <Button type="default" size="small">Individual</Button>
        </Link>
      </div>
    ),
  },
];

const ExpandedRow: React.FC<{ record: TeamData }> = ({ record }) => {
  return (
    <div className="bg-muted/20 border-t border-border">
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="indicator-grid min-w-[700px]">
          {/* Header row */}
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Indicador</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Consolidado</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Jan</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Fev</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Mar</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground text-xs sm:text-sm">Abr</div>
          </div>

          {/* Data rows */}
          {record.indicadores.map((indicador) => (
            <div 
              key={indicador.id} 
              className="indicator-grid-row bg-card"
            >
              <div className="indicator-grid-cell font-medium text-xs sm:text-sm">{indicador.name}</div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.consolidado} indicador={indicador.id} month="consolidado" equipeKey={record.key} compact />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.janeiro} indicador={indicador.id} month="janeiro" equipeKey={record.key} compact />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.fevereiro} indicador={indicador.id} month="fevereiro" equipeKey={record.key} compact />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.marco} indicador={indicador.id} month="marco" equipeKey={record.key} compact />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.abril} indicador={indicador.id} month="abril" equipeKey={record.key} compact />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OverviewTable: React.FC<OverviewTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
}) => {
  const isMobile = useIsMobile();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const columns = getColumns(() => setIsHelpModalOpen(true));

  // Mobile view with cards
  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Total: <strong className="text-foreground">{totalEquipes}</strong> equipes
          </span>
          <Button icon={<Download className="h-4 w-4" />} size="small">Exportar</Button>
        </div>
        <div className="space-y-3">
          {data.map((record) => (
            <MobileTeamCard key={record.key} record={record} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs sm:text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{totalEquipes}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => <ExpandedRow record={record} />,
            defaultExpandedRowKeys: [data[0]?.key],
            expandIcon: ({ expanded, onExpand, record }) => (
              <span 
                className="inline-flex cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLElement>)}
              >
                {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
            ),
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
            size: 'small',
          }}
          size="small"
          scroll={{ x: 700 }}
        />
      </div>

      <Modal
        title="Conceito Geral Obtido"
        visible={isHelpModalOpen}
        onCancel={() => setIsHelpModalOpen(false)}
        width={window.innerWidth < 640 ? '95%' : 520}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsHelpModalOpen(false)}>
            Entendi
          </Button>
        ]}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            O conceito geral obtido representa a classificação consolidada da equipe no quadrimestre.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3C8DBC]" />
              <span className="text-sm"><strong>Ótimo:</strong> &gt; 50 e ≤ 70</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00A65A]" />
              <span className="text-sm"><strong>Bom:</strong> &gt; 30 e ≤ 50</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F0AD4E]" />
              <span className="text-sm"><strong>Suficiente:</strong> &gt; 10 e ≤ 30</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DD4B39]" />
              <span className="text-sm"><strong>Regular:</strong> ≤ 10 ou &gt; 70</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
