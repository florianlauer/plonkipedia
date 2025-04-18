import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names, merging Tailwind CSS classes properly.
 * This uses clsx for conditional classes and tailwind-merge to handle Tailwind's utility classes.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
