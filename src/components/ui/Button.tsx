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
            "bg-geoguessr-green text-white hover:bg-geoguessr-dark-green focus-visible:ring-geoguessr-green":
              variant === "primary",
            "bg-geoguessr-blue text-white hover:bg-geoguessr-dark-blue focus-visible:ring-geoguessr-blue":
              variant === "secondary",
            "border border-geoguessr-grey bg-transparent hover:bg-geoguessr-grey/20 focus-visible:ring-geoguessr-grey":
              variant === "outline",
            "bg-transparent hover:bg-geoguessr-grey/20 focus-visible:ring-geoguessr-grey":
              variant === "ghost",
            "bg-geoguessr-red text-white hover:bg-geoguessr-dark-red focus-visible:ring-geoguessr-red":
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
