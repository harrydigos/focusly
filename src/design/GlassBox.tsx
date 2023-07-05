import { Component, JSX, type JSXElement } from "solid-js";

interface GlassBoxProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
}

export const GlassBox: Component<GlassBoxProps> = (props) => {
  return (
    <div
      class="rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-40 p-6 shadow-md backdrop-blur-xl backdrop-filter"
      style={props.style}
    >
      {props.children}
    </div>
  );
};
