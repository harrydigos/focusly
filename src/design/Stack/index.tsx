import { Component, JSX, JSXElement, splitProps } from "solid-js";
import { classNames } from "~/utils";

export interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {
  direction: "flex-row" | "flex-row-reverse" | "flex-col" | "flex-col-reverse";
  children: JSXElement;
}

export const Stack: Component<StackProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);

  return (
    <div class={classNames("flex", local.direction, local.class)} {...others} />
  );
};
