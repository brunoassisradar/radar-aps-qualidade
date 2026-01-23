import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from 'antd';
import { FileText } from 'lucide-react';

interface PontoAtencao {
  titulo: string;
  valor: number;
  showLink?: boolean;
  helpText?: string;
}

interface PontosAtencaoCardsProps {
  pontos?: PontoAtencao[];
}

const defaultPontos: PontoAtencao[] = [
  {
    titulo: 'Quantitativo de pessoas cujo cadastro completará 2 anos no quadrimestre',
    valor: 1718,
    showLink: false,
  },
  {
    titulo: 'Quantitativo de cadastros individuais dos últimos 6 meses, sem identificação no CADSUS',
    valor: 44,
    showLink: true,
    helpText: 'Cadastros sem CNS ou CPF válido',
  },
  {
    titulo: 'Quantitativo de cadastros individuais dos últimos 6 meses, registrados sem vínculo à uma equipe',
    valor: 62,
    showLink: true,
  },
];

export const PontosAtencaoCards: React.FC<PontosAtencaoCardsProps> = ({
  pontos = defaultPontos,
}) => {
  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <h3 className="text-base font-semibold text-foreground mb-4">Pontos de atenção</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pontos.map((ponto, index) => (
          <div 
            key={index}
            className="rounded-lg border border-border bg-background p-4 flex flex-col items-center text-center"
          >
            <p className="text-xs text-muted-foreground mb-4 min-h-[48px] flex items-center">
              {ponto.titulo}
            </p>
            
            <div className="flex flex-col items-center">
              <AlertCircle className="h-8 w-8 text-[#F0AD4E] mb-2" />
              <span className="text-3xl font-bold text-foreground">
                {ponto.valor.toLocaleString('pt-BR')}
              </span>
            </div>

            {ponto.showLink && (
              <Button 
                type="default" 
                size="small" 
                icon={<FileText className="h-3 w-3" />}
                className="mt-4"
              >
                Ir para inconsistências
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
