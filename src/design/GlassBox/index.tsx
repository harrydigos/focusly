import { Component, splitProps } from "solid-js";
import { classNames } from "~/utils";
import { Stack, StackProps } from "~/design/Stack";
import { useBgColor } from "~/stores";

export const GlassBox: Component<StackProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);
  const { color } = useBgColor();

  return (
    <Stack
      direction={local.direction}
      class={classNames(
        "rounded-3xl border border-stone-200 border-opacity-10 bg-opacity-50 p-6 shadow-md backdrop-blur-xl backdrop-filter",
        color.class,
        local.class
      )}
      {...others}
    />
  );
};
