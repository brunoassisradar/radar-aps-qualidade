import * as React from "react";
import { Divider } from "antd";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

/**
 * Componente Separator usando Ant Design Divider
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <Divider
        type={orientation}
        className={cn(
          orientation === "horizontal" ? "my-0" : "mx-0 h-full",
          className
        )}
        style={orientation === "vertical" ? { height: "100%", margin: "0 8px" } : { margin: "0" }}
        {...(props as React.ComponentProps<typeof Divider>)}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
