import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from 'antd';

type ClassificationType = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ClassificacaoCadastroProps {
  valorIndividual?: number;
  valorCompleto?: number;
  parametro?: number;
  resultado?: number;
  classificacao?: ClassificationType;
}

const statusConfig: Record<ClassificationType, { label: string; color: string; bgColor: string }> = {
  otimo: { label: 'ÓTIMO', color: '#3C8DBC', bgColor: 'bg-[#3C8DBC]/10' },
  bom: { label: 'BOM', color: '#00A65A', bgColor: 'bg-[#00A65A]/10' },
  suficiente: { label: 'SUFICIENTE', color: '#F0AD4E', bgColor: 'bg-[#F0AD4E]/10' },
  regular: { label: 'REGULAR', color: '#DD4B39', bgColor: 'bg-[#DD4B39]/10' },
};

export const ClassificacaoCadastro: React.FC<ClassificacaoCadastroProps> = ({
  valorIndividual = 780,
  valorCompleto = 18475,
  parametro = 19500,
  resultado = 107,
  classificacao = 'otimo',
}) => {
  const config = statusConfig[classificacao];
  const soma = valorIndividual + valorCompleto;

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-base font-semibold text-foreground">3. Classificação do município na dimensão cadastro</h3>
        <Tooltip title="A classificação é calculada pela fórmula: ((Valor Individual + Valor Completo) / Parâmetro) × 100">
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </Tooltip>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-3 text-lg">
        {/* Fração */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 border-b border-foreground pb-1">
            <span className="px-3 py-1 bg-muted rounded text-sm font-medium">{valorIndividual.toLocaleString('pt-BR')}</span>
            <span className="text-muted-foreground">+</span>
            <span className="px-3 py-1 bg-muted rounded text-sm font-medium">{valorCompleto.toLocaleString('pt-BR')}</span>
          </div>
          <span className="px-3 py-1 text-sm text-muted-foreground mt-1">
            {parametro.toLocaleString('pt-BR')} (Parâmetro calculado pelas equipes)
          </span>
        </div>

        <span className="text-muted-foreground text-xl">×</span>
        
        <span className="px-3 py-1 bg-muted rounded text-sm font-medium">100</span>
        
        <span className="text-muted-foreground text-xl">=</span>
        
        <span className="px-3 py-1 bg-muted rounded text-sm font-medium">{resultado}</span>

        {/* Badge de classificação */}
        <div 
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-full ${config.bgColor}`}
          style={{ border: `2px solid ${config.color}` }}
        >
          <span className="text-xs font-bold" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
      </div>
    </div>
  );
};
