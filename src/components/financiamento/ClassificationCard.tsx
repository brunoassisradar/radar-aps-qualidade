import React from 'react';
import { Smile, Meh, Frown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ClassificationCardProps {
  classification: Classification;
  count: number;
  description: string;
}

const classificationConfig = {
  otimo: {
    label: 'Classificadas como Ótimo',
    icon: Smile,
    bgClass: 'bg-card border-l-4 border-l-[#3C8DBC]',
    iconClass: 'text-[#3C8DBC]',
  },
  bom: {
    label: 'Classificadas como Bom',
    icon: Meh,
    bgClass: 'bg-card border-l-4 border-l-[#00A65A]',
    iconClass: 'text-[#00A65A]',
  },
  suficiente: {
    label: 'Classificadas como Suficiente',
    icon: Meh,
    bgClass: 'bg-card border-l-4 border-l-[#F0AD4E]',
    iconClass: 'text-[#F0AD4E]',
  },
  regular: {
    label: 'Classificadas como Regular',
    icon: Frown,
    bgClass: 'bg-card border-l-4 border-l-[#DD4B39]',
    iconClass: 'text-[#DD4B39]',
  },
};

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  classification,
  count,
  description,
}) => {
  const config = classificationConfig[classification];
  const Icon = config.icon;

  return (
    <div className={cn('rounded-lg p-4 shadow-sm', config.bgClass)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-6 w-6 mt-0.5', config.iconClass)} />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{config.label}</p>
          <p className="text-xl font-semibold text-foreground">{count} Equipes</p>
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
