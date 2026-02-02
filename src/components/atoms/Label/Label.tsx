import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * Componente Label simples usando elemento nativo
 * Para uso com Form do Ant Design, usar Form.Item com prop label
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
);

Label.displayName = "Label";

// Manter compatibilidade com labelVariants para código legado
const labelVariants = () => ({
  className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export { Label, labelVariants };
