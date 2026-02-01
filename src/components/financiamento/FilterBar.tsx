import React, { useState } from 'react';
import { Select, Button, Progress } from 'antd';
import { Search, X, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  return (
    <div className="rounded-lg bg-card p-3 sm:p-4 shadow-sm space-y-3 sm:space-y-4">
      {/* Mobile filter toggle */}
      {isMobile && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm font-medium text-foreground"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      )}

      {/* Filters - collapsible on mobile */}
      {(isExpanded || !isMobile) && (
        <>
          {/* Linha 1: Todos os filtros (Ano, Quadrimestre, Período, Tipo de equipe, Unidade) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-foreground">Ano</label>
              <Select
                defaultValue="2026"
                style={{ width: '100%' }}
                size={isMobile ? 'middle' : 'large'}
                options={[
                  { value: '2026', label: '2026' },
                  { value: '2025', label: '2025' },
                  { value: '2024', label: '2024' },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-foreground">Quadrimestre</label>
              <Select
                defaultValue="1"
                style={{ width: '100%' }}
                size={isMobile ? 'middle' : 'large'}
                options={[
                  { value: '1', label: '1° Quadrimestre' },
                  { value: '2', label: '2° Quadrimestre', disabled: true },
                  { value: '3', label: '3° Quadrimestre', disabled: true },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-foreground">Tipo de equipe</label>
              <Select
                placeholder="Tipo de equipe"
                style={{ width: '100%' }}
                size={isMobile ? 'middle' : 'large'}
                options={[
                  { value: 'esf', label: 'eSF' },
                  { value: 'eap', label: 'eAP' },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-foreground">Unidade</label>
              <Select
                mode="multiple"
                placeholder="Selecione unidade(s)"
                style={{ width: '100%' }}
                size={isMobile ? 'middle' : 'large'}
                maxTagCount={1}
                options={[
                  { value: 'ubs1', label: 'UBS Centro' },
                  { value: 'ubs2', label: 'UBS Norte' },
                  { value: 'ubs3', label: 'UBS Sul' },
                ]}
              />
            </div>
          </div>

          {/* Linha 3: Alerta e Botões */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Progress
                percent={50}
                steps={4}
                size="small"
                showInfo={false}
                strokeColor="hsl(var(--primary))"
                trailColor="hsl(var(--muted))"
                className="[&_.ant-progress-steps-item]:!w-3 sm:[&_.ant-progress-steps-item]:!w-4 [&_.ant-progress-steps-item]:!h-1.5"
              />
              <span className="text-xs sm:text-sm text-muted-foreground">Faltam 30 dias para o fim do quadrimestre</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button onClick={onClear} className="flex-1 sm:flex-none" size={isMobile ? 'middle' : 'large'}>
                Limpar
              </Button>
              <Button type="primary" onClick={onSearch} className="flex-1 sm:flex-none" size={isMobile ? 'middle' : 'large'}>
                Buscar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
