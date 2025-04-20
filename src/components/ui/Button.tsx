import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-green-50 text-black hover:bg-green-80 focus-visible:ring-green-50":
              variant === "primary",
            "bg-blue-50 text-white hover:bg-purple-80 focus-visible:ring-blue-50":
              variant === "secondary",
            "border border-purple-10 bg-transparent hover:bg-purple-10/20 focus-visible:ring-purple-10":
              variant === "outline",
            "bg-transparent hover:bg-purple-10/20 focus-visible:ring-purple-10":
              variant === "ghost",
            "bg-red-50 text-white hover:bg-red-50/80 focus-visible:ring-red-50":
              variant === "danger",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2.5": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
