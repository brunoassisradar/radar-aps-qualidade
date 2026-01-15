import React from 'react';
import { Select, Button } from 'antd';
import { Search, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onSearch?: () => void;
  onClear?: () => void;
  periods?: string[];
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearch, 
  onClear,
  periods = [],
  selectedPeriod = '',
  onPeriodChange,
}) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
      {/* Linha 1: Todos os filtros (Ano, Quadrimestre, Período, Tipo de equipe, Unidade) */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Ano</label>
          <Select
            defaultValue="2026"
            style={{ width: 120 }}
            options={[
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Quadrimestre</label>
          <Select
            defaultValue="1"
            style={{ width: 160 }}
            options={[
              { value: '1', label: '1° Quadrimestre' },
              { value: '2', label: '2° Quadrimestre' },
              { value: '3', label: '3° Quadrimestre' },
            ]}
          />
        </div>

        {periods.length > 0 && onPeriodChange && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Período</label>
            <div className="flex rounded-md bg-muted p-1">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => onPeriodChange(period)}
                  className={cn(
                    'px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                    selectedPeriod === period
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Tipo de equipe</label>
          <Select
            placeholder="Tipo de equipe"
            style={{ width: 180 }}
            options={[
              { value: 'esf', label: 'eSF' },
              { value: 'eap', label: 'eAP' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-foreground">Unidade</label>
          <Select
            mode="multiple"
            placeholder="Selecione uma ou mais unidade"
            style={{ width: '100%' }}
            maxTagCount={2}
            options={[
              { value: 'ubs1', label: 'UBS Centro' },
              { value: 'ubs2', label: 'UBS Norte' },
              { value: 'ubs3', label: 'UBS Sul' },
            ]}
          />
        </div>
      </div>

      {/* Linha 3: Alerta e Botões */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-md bg-status-suficiente-bg px-3 py-2 text-sm">
          <AlertCircle className="h-4 w-4 text-status-suficiente" />
          <span className="text-status-suficiente font-medium">Faltam 30 dias para o fim do quadrimestre</span>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onClear} icon={<X className="h-4 w-4" />}>
            Limpar filtros
          </Button>
          <Button type="primary" onClick={onSearch} icon={<Search className="h-4 w-4" />}>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};
