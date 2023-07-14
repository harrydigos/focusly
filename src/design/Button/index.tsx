import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

export type ButtonVariants = VariantsOf<(typeof Button)["klass"]>;

export const Button = klassed(
  "button",
  {
    base: "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-transparent transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30 focus-visible:ring-offset disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    variants: {
      variant: {
        default: ["bg-stone-50 text-stone-900", "hover:bg-stone-50/90"],
        outline: ["border border-stone-600 bg-transparent", "hover:opacity-90"],
        ghost: "hover:bg-stone-800",
      },
      size: {
        default: "h-10 px-4 py-2 gap-1",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
  {
    defaultProps: {
      type: "button",
    },
  }
);
