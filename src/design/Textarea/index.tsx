import { Component, JSX, splitProps } from "solid-js";
import { classNames } from "~/utils";

export interface TextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: Component<TextareaProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <textarea
      class={classNames(
        "flex min-h-[80px] w-full rounded-lg border border-stone-300 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...others}
    />
  );
};
