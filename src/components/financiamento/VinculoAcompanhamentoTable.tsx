import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface MonthData {
  status: Classification;
  value: string;
}

interface DimensaoData {
  id: string;
  name: string;
  janeiro: MonthData;
  fevereiro: MonthData;
  marco: MonthData;
  abril: MonthData;
  resultado: MonthData;
}

interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  notaFinal: number;
  classificacaoFinal: Classification;
  dimensoes: DimensaoData[];
}

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

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

const statusOrder: Record<Classification, number> = {
  otimo: 1,
  bom: 2,
  suficiente: 3,
  regular: 4,
};

interface StatusCellProps {
  data: MonthData;
  showLink?: boolean;
  dimensao?: string;
  month?: string;
  equipeKey?: string;
}

const StatusCell: React.FC<StatusCellProps> = ({ data, showLink = true, dimensao, month, equipeKey }) => {
  const content = (
    <div className={`flex items-center gap-2 ${showLink ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}>
      <span className={`w-2 h-2 rounded-full ${statusColors[data.status]}`} />
      <span className="text-sm">
        {statusLabels[data.status]} | {data.value}
      </span>
      {showLink && (
        <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
      )}
    </div>
  );

  if (showLink && dimensao && month) {
    const params = new URLSearchParams({
      dimensao,
      periodo: month,
    });
    if (equipeKey) {
      params.set('equipe', equipeKey);
    }
    return (
      <Link to={`/financiamento-aps/vinculo-acompanhamento/relatorio?${params.toString()}`}>
        {content}
      </Link>
    );
  }

  return content;
};

const ResultadoCell: React.FC<{ nota: number; classification: Classification }> = ({ nota, classification }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${statusColors[classification]}`} />
      <span className="text-sm">{statusLabels[classification]} | {nota}</span>
    </div>
  );
};

const createDimensoes = (cadastro: Classification, acompanhamento: Classification): DimensaoData[] => [
  {
    id: 'cadastro',
    name: 'Cadastro',
    janeiro: { status: cadastro, value: 'X%' },
    fevereiro: { status: cadastro, value: 'X%' },
    marco: { status: cadastro, value: 'X%' },
    abril: { status: cadastro, value: 'X%' },
    resultado: { status: cadastro, value: 'X%' },
  },
  {
    id: 'acompanhamento',
    name: 'Acompanhamento',
    janeiro: { status: acompanhamento, value: 'X%' },
    fevereiro: { status: acompanhamento, value: 'X%' },
    marco: { status: acompanhamento, value: 'X%' },
    abril: { status: acompanhamento, value: 'X%' },
    resultado: { status: acompanhamento, value: 'X%' },
  },
];

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', notaFinal: 4, classificacaoFinal: 'regular', dimensoes: createDimensoes('bom', 'regular') },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', notaFinal: 4.75, classificacaoFinal: 'regular', dimensoes: createDimensoes('otimo', 'regular') },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', notaFinal: 4.75, classificacaoFinal: 'regular', dimensoes: createDimensoes('otimo', 'regular') },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', notaFinal: 4, classificacaoFinal: 'regular', dimensoes: createDimensoes('bom', 'regular') },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', notaFinal: 6.5, classificacaoFinal: 'suficiente', dimensoes: createDimensoes('otimo', 'suficiente') },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', notaFinal: 6.5, classificacaoFinal: 'suficiente', dimensoes: createDimensoes('otimo', 'suficiente') },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', notaFinal: 6.5, classificacaoFinal: 'suficiente', dimensoes: createDimensoes('otimo', 'suficiente') },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', notaFinal: 8.25, classificacaoFinal: 'bom', dimensoes: createDimensoes('otimo', 'bom') },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', notaFinal: 6.5, classificacaoFinal: 'suficiente', dimensoes: createDimensoes('otimo', 'suficiente') },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', notaFinal: 6.5, classificacaoFinal: 'suficiente', dimensoes: createDimensoes('otimo', 'suficiente') },
];

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    width: '22%',
    render: (text: string) => <span className="font-medium">{text}</span>,
    sorter: (a, b) => a.equipeSaude.localeCompare(b.equipeSaude),
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '22%',
    sorter: (a, b) => a.unidade.localeCompare(b.unidade),
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    width: '12%',
    sorter: (a, b) => a.ine.localeCompare(b.ine),
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    width: '10%',
    sorter: (a, b) => a.cnes.localeCompare(b.cnes),
  },
  {
    title: 'Nota Final',
    dataIndex: 'notaFinal',
    key: 'notaFinal',
    width: '16%',
    filters: statusFilters,
    onFilter: (value, record) => record.classificacaoFinal === value,
    sorter: (a, b) => a.notaFinal - b.notaFinal,
    render: (nota: number, record: VinculoData) => (
      <ResultadoCell nota={nota} classification={record.classificacaoFinal} />
    ),
  },
  {
    title: 'Ação',
    key: 'acao',
    width: '18%',
    render: (_: unknown, record: VinculoData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/vinculo-acompanhamento/relatorio?equipe=${record.key}`}>
          <Button type="default" size="small">Relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/vinculo-acompanhamento/individualizado?equipe=${record.key}`}>
          <Button type="default" size="small">Individualizado</Button>
        </Link>
      </div>
    ),
  },
];

const ExpandedRow: React.FC<{ record: VinculoData }> = ({ record }) => {
  return (
    <div className="bg-muted/20 border-t border-border">
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="indicator-grid min-w-[800px]">
          {/* Header row */}
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground">Dimensão</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Resultado</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Janeiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Fevereiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Março</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Abril</div>
          </div>

          {/* Data rows */}
          {record.dimensoes.map((dimensao) => (
            <div 
              key={dimensao.id} 
              className="indicator-grid-row bg-card"
            >
              <div className="indicator-grid-cell font-medium">{dimensao.name}</div>
              <div className="indicator-grid-cell">
                <StatusCell data={dimensao.resultado} dimensao={dimensao.id} month="resultado" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={dimensao.janeiro} dimensao={dimensao.id} month="janeiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={dimensao.fevereiro} dimensao={dimensao.id} month="fevereiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={dimensao.marco} dimensao={dimensao.id} month="marco" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={dimensao.abril} dimensao={dimensao.id} month="abril" equipeKey={record.key} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VinculoAcompanhamentoTable: React.FC = () => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{sampleData.length}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={sampleData}
        expandable={{
          expandedRowRender: (record) => <ExpandedRow record={record} />,
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
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} equipes`,
          pageSizeOptions: ['10', '20', '50'],
          defaultPageSize: 10,
        }}
        size="middle"
      />
    </div>
  );
};
