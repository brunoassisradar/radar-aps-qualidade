import * as React from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<AntButtonProps, "size" | "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

/**
 * Mapeia variantes do design system para props do Ant Design Button
 */
function getAntButtonProps(
  variant: ButtonVariant = "default",
  size: ButtonSize = "default"
): Partial<AntButtonProps> {
  const sizeMap: Record<ButtonSize, AntButtonProps["size"]> = {
    default: "middle",
    sm: "small",
    lg: "large",
    icon: "middle",
  };

  const baseProps: Partial<AntButtonProps> = {
    size: sizeMap[size],
  };

  switch (variant) {
    case "default":
      return { ...baseProps, type: "primary" };
    case "secondary":
      return { ...baseProps, type: "default" };
    case "outline":
      return { ...baseProps, type: "default", ghost: false };
    case "destructive":
      return { ...baseProps, type: "primary", danger: true };
    case "ghost":
      return { ...baseProps, type: "text" };
    case "link":
      return { ...baseProps, type: "link" };
    default:
      return { ...baseProps, type: "primary" };
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild, className, children, style, ...props }, ref) => {
    const antProps = getAntButtonProps(variant, size);
    
    // Classes adicionais para icon button e customização
    const iconStyle: React.CSSProperties = size === "icon" 
      ? { minWidth: 40, width: 40, height: 40, padding: 0 }
      : {};

    return (
      <AntButton
        {...antProps}
        {...props}
        className={className}
        style={{ ...iconStyle, ...style }}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </AntButton>
    );
  }
);

Button.displayName = "Button";

// Manter compatibilidade com buttonVariants para código legado
const buttonVariants = (props: { variant?: ButtonVariant; size?: ButtonSize }) => {
  return getAntButtonProps(props.variant, props.size);
};

export { Button, buttonVariants };
