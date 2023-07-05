import { Component, splitProps } from "solid-js";
import { classNames } from "~/utils";
import { Stack, StackProps } from "~/design/Stack";

export const GlassBox: Component<StackProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);

  return (
    <Stack
      direction={local.direction}
      class={classNames(
        "rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-40 p-6 shadow-md backdrop-blur-xl backdrop-filter",
        local.class
      )}
      {...others}
    />
  );
};
