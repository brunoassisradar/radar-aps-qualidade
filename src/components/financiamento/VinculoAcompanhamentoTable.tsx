import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface CadastroDetails {
  cadastroCompletoAtualizado: number;
  somenteCadastroIndividualAtualizado: number;
  semCadastroIndividualAtualizado: number;
}

interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  dimensaoCadastro: Classification;
  dimensaoAcompanhamento: Classification;
  notaFinal: number;
  classificacaoFinal: Classification;
  cadastroDetails: CadastroDetails;
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

const StatusCell: React.FC<{ classification: Classification }> = ({ classification }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${statusColors[classification]}`} />
      <span className="text-sm">{statusLabels[classification]}</span>
    </div>
  );
};

const ResultadoCell: React.FC<{ nota: number; classification: Classification }> = ({ nota, classification }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${statusColors[classification]}`} />
      <span className="text-sm">{statusLabels[classification]} | {nota}</span>
    </div>
  );
};

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', notaFinal: 4, classificacaoFinal: 'regular', cadastroDetails: { cadastroCompletoAtualizado: 850, somenteCadastroIndividualAtualizado: 120, semCadastroIndividualAtualizado: 45 } },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', notaFinal: 4.75, classificacaoFinal: 'regular', cadastroDetails: { cadastroCompletoAtualizado: 920, somenteCadastroIndividualAtualizado: 80, semCadastroIndividualAtualizado: 15 } },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', notaFinal: 4.75, classificacaoFinal: 'regular', cadastroDetails: { cadastroCompletoAtualizado: 780, somenteCadastroIndividualAtualizado: 150, semCadastroIndividualAtualizado: 70 } },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', notaFinal: 4, classificacaoFinal: 'regular', cadastroDetails: { cadastroCompletoAtualizado: 650, somenteCadastroIndividualAtualizado: 200, semCadastroIndividualAtualizado: 100 } },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente', cadastroDetails: { cadastroCompletoAtualizado: 880, somenteCadastroIndividualAtualizado: 90, semCadastroIndividualAtualizado: 30 } },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente', cadastroDetails: { cadastroCompletoAtualizado: 910, somenteCadastroIndividualAtualizado: 60, semCadastroIndividualAtualizado: 20 } },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente', cadastroDetails: { cadastroCompletoAtualizado: 870, somenteCadastroIndividualAtualizado: 100, semCadastroIndividualAtualizado: 35 } },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'bom', notaFinal: 8.25, classificacaoFinal: 'bom', cadastroDetails: { cadastroCompletoAtualizado: 950, somenteCadastroIndividualAtualizado: 40, semCadastroIndividualAtualizado: 10 } },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente', cadastroDetails: { cadastroCompletoAtualizado: 890, somenteCadastroIndividualAtualizado: 85, semCadastroIndividualAtualizado: 25 } },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'suficiente', notaFinal: 6.5, classificacaoFinal: 'suficiente', cadastroDetails: { cadastroCompletoAtualizado: 860, somenteCadastroIndividualAtualizado: 95, semCadastroIndividualAtualizado: 40 } },
];

const statusOrder: Record<Classification, number> = {
  otimo: 1,
  bom: 2,
  suficiente: 3,
  regular: 4,
};

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    width: '18%',
    render: (text: string) => <span className="font-medium">{text}</span>,
    sorter: (a, b) => a.equipeSaude.localeCompare(b.equipeSaude),
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '18%',
    sorter: (a, b) => a.unidade.localeCompare(b.unidade),
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    width: '10%',
    sorter: (a, b) => a.ine.localeCompare(b.ine),
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    width: '8%',
    sorter: (a, b) => a.cnes.localeCompare(b.cnes),
  },
  {
    title: 'Dimensão Cadastro',
    dataIndex: 'dimensaoCadastro',
    key: 'dimensaoCadastro',
    width: '12%',
    filters: statusFilters,
    onFilter: (value, record) => record.dimensaoCadastro === value,
    sorter: (a, b) => statusOrder[a.dimensaoCadastro] - statusOrder[b.dimensaoCadastro],
    render: (classification: Classification) => <StatusCell classification={classification} />,
  },
  {
    title: 'Acompanhamento',
    dataIndex: 'dimensaoAcompanhamento',
    key: 'dimensaoAcompanhamento',
    width: '14%',
    filters: statusFilters,
    onFilter: (value, record) => record.dimensaoAcompanhamento === value,
    sorter: (a, b) => statusOrder[a.dimensaoAcompanhamento] - statusOrder[b.dimensaoAcompanhamento],
    render: (classification: Classification) => <StatusCell classification={classification} />,
  },
  {
    title: 'Nota Final',
    dataIndex: 'notaFinal',
    key: 'notaFinal',
    width: '10%',
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
    width: '10%',
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
  const details = record.cadastroDetails;

  return (
    <div className="bg-muted/20 border-t border-border">
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="min-w-[600px]">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-muted/30 border-b border-border">
            <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Pessoas com cadastro completo e atualizado
            </div>
            <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Pessoas com somente cadastro individual atualizado
            </div>
            <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Pessoas sem cadastro individual atualizado
            </div>
          </div>

          {/* Data row */}
          <div className="grid grid-cols-3 bg-card">
            <div className="px-4 py-3 text-sm font-semibold">
              {details.cadastroCompletoAtualizado.toLocaleString('pt-BR')}
            </div>
            <div className="px-4 py-3 text-sm font-semibold">
              {details.somenteCadastroIndividualAtualizado.toLocaleString('pt-BR')}
            </div>
            <div className="px-4 py-3 text-sm font-semibold">
              {details.semCadastroIndividualAtualizado.toLocaleString('pt-BR')}
            </div>
          </div>
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
