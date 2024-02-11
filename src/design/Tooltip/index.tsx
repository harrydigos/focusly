import { Tooltip as KobalteTooltip } from "@kobalte/core";
import { Component, JSX, splitProps } from "solid-js";
import { TooltipRootProps } from "@kobalte/core/dist/types/tooltip";
import styles from "./Tooltip.module.css";

export type TooltipProps = {
  children: JSX.Element;
  description: string;
  arrowSize?: number;
} & TooltipRootProps;

export const Tooltip: Component<TooltipProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "children",
    "description",
    "arrowSize",
  ]);

  return (
    <KobalteTooltip.Root {...rest}>
      <KobalteTooltip.Trigger>{local.children}</KobalteTooltip.Trigger>
      <KobalteTooltip.Portal>
        <KobalteTooltip.Content
          class={`${styles.tooltip__animation} animate-fadeIn rounded-lg border border-stone-700 bg-stone-900 px-2 py-1.5 text-xs font-normal text-stone-50 drop-shadow-md`}
          style={{
            "z-index": 2147483647,
          }}
        >
          <KobalteTooltip.Arrow size={local.arrowSize || 0} />
          <p>{local.description}</p>
        </KobalteTooltip.Content>
      </KobalteTooltip.Portal>
    </KobalteTooltip.Root>
  );
};
