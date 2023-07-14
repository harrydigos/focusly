import { Component, JSX, splitProps } from "solid-js";
import { classNames } from "~/utils";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <input
      class={classNames(
        "flex h-10 w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-sm font-light text-white ring-offset-transparent transition-all placeholder:text-stone-200 focus-visible:border-stone-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...others}
    />
  );
};
