import React from 'react';

interface CadastrosParametroGaugeProps {
  totalCadastros?: number;
  cadastrosAtualizados?: number;
  parametro?: number;
  limiteMaximo?: number;
}

export const CadastrosParametroGauge: React.FC<CadastrosParametroGaugeProps> = ({
  totalCadastros = 15088,
  cadastrosAtualizados = 13358,
  parametro = 19500,
  limiteMaximo = 29250,
}) => {
  const percentAtualizado = (cadastrosAtualizados / limiteMaximo) * 100;
  const percentParametro = (parametro / limiteMaximo) * 100;
  const percentAtualizadoVsTotal = ((cadastrosAtualizados / totalCadastros) * 100).toFixed(1);

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-2">Cadastros de acordo com o parâmetro</h3>
      
      <div className="mt-6 mb-2 text-center">
        <span className="text-sm text-muted-foreground">Total de cadastros</span>
        <p className="text-lg font-semibold text-foreground">{totalCadastros.toLocaleString('pt-BR')}</p>
      </div>

      {/* Gauge bar */}
      <div className="relative mt-4">
        {/* Background track */}
        <div className="h-8 bg-muted rounded-full relative overflow-hidden">
          {/* Filled portion */}
          <div 
            className="absolute left-0 top-0 h-full bg-[#00A65A] rounded-l-full flex items-center justify-end pr-2"
            style={{ width: `${percentAtualizado}%` }}
          >
            <span className="text-xs font-medium text-white">
              {percentAtualizadoVsTotal}%
            </span>
          </div>
          
          {/* Parametro marker */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-foreground"
            style={{ left: `${percentParametro}%` }}
          />
        </div>

        {/* Labels */}
        <div className="relative mt-2 text-xs text-muted-foreground">
          <div 
            className="absolute transform -translate-x-1/2"
            style={{ left: `${percentAtualizado}%` }}
          >
            <span className="font-medium text-foreground">{cadastrosAtualizados.toLocaleString('pt-BR')}</span>
            <p className="text-[10px]">({percentAtualizadoVsTotal}%) pessoas com cadastro atualizado</p>
          </div>
          
          <div 
            className="absolute transform -translate-x-1/2 text-center"
            style={{ left: `${percentParametro}%` }}
          >
            <span className="font-medium text-foreground">{parametro.toLocaleString('pt-BR')}</span>
            <p className="text-[10px]">Parâmetro</p>
          </div>
          
          <div className="absolute right-0 text-right">
            <span className="font-medium text-foreground">{limiteMaximo.toLocaleString('pt-BR')}</span>
            <p className="text-[10px]">Limite máximo</p>
          </div>
        </div>
      </div>
    </div>
  );
};
