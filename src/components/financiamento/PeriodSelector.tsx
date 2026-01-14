import React from 'react';
import { cn } from '@/lib/utils';

interface PeriodSelectorProps {
  periods: string[];
  selectedPeriod: string;
  onChange: (period: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  periods,
  selectedPeriod,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded-md bg-muted p-1">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            selectedPeriod === period
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
