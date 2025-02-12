import { Component, JSX, splitProps } from "solid-js";
import { classNames } from "~/utils";

export interface TextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isTransparent?: boolean;
}

export const Textarea: Component<TextareaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "isTransparent"]);

  return (
    <textarea
      class={classNames(
        "flex min-h-[80px] w-full text-sm font-light text-white transition-all placeholder:text-stone-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      classList={{
        ["rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 focus-visible:border-stone-200 focus-visible:ring focus-visible:ring-white/30"]:
          !local.isTransparent,
        ["rounded-none bg-transparent p-0 transition-none"]:
          local.isTransparent,
      }}
      {...others}
    />
  );
};
