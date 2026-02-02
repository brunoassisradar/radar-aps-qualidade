import * as React from "react";
import { Input as AntInput } from "antd";
import type { InputProps as AntInputProps, InputRef } from "antd";

export interface InputProps extends Omit<AntInputProps, "size"> {
  type?: string;
}

const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Ant Design Input para tipos específicos
    if (type === "password") {
      return (
        <AntInput.Password
          className={className}
          ref={ref}
          {...props}
        />
      );
    }

    if (type === "search") {
      return (
        <AntInput.Search
          className={className}
          ref={ref as React.Ref<InputRef>}
          {...props}
        />
      );
    }

    return (
      <AntInput
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
