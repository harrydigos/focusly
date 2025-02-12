import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { classNames } from "~/utils";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "icon";
  children?: JSX.Element;
}

export const Button: Component<ButtonProps> = (props) => {
  const newProps = mergeProps(
    { variant: "default", size: "default", type: "button" },
    props,
  ) as ButtonProps;
  const [local, others] = splitProps(newProps, [
    "variant",
    "size",
    "children",
    "class",
  ]);

  const styles =
    "focus-visible:ring-offset inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-transparent transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30 active:scale-95 disabled:pointer-events-none disabled:opacity-50";

  const getVariantStyles = () => {
    switch (local.variant) {
      case "secondary":
        return "bg-stone-900 text-stone-50 hover:bg-stone-800";
      case "outline":
        return "border border-stone-600 bg-transparent hover:opacity-90";
      case "ghost":
        return "hover:bg-stone-800";
      case "destructive":
        return "bg-red-800 text-stone-50 hover:bg-red-800/90";
      default:
        return "bg-stone-50 text-stone-900 hover:bg-stone-50/90";
    }
  };

  const getSizeStyles = () => {
    switch (local.size) {
      case "icon":
        return "h-8 w-8";
      default:
        return "h-10 px-4 py-2 gap-1";
    }
  };

  return (
    <button
      class={classNames(
        styles,
        getVariantStyles(),
        getSizeStyles(),
        local.class,
      )}
      {...others}
    >
      {local.children}
    </button>
  );
};
