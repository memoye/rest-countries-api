import React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  withIcon?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, withIcon, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={`rounded border border-transparent bg-light-element py-1.5 text-center drop-shadow transition-colors hover:border-light-text/50 hover:drop-shadow-none dark:bg-dark-element dark:hover:border-dark-text/50 ${className} ${
          withIcon ? "flex items-center gap-2 px-4 py-1" : "px-2"
        }`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
