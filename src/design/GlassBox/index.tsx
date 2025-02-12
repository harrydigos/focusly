import { Component, splitProps } from "solid-js";

import { Stack, StackProps } from "~/design/Stack";
import { useSettingsContext } from "~/providers";
import { classNames } from "~/utils";

export const GlassBox: Component<StackProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);
  const { bgColor: color } = useSettingsContext();

  return (
    <Stack
      direction={local.direction}
      class={classNames(
        "rounded-3xl border border-stone-200 border-opacity-10 bg-opacity-50 p-6 shadow-md backdrop-blur-xl backdrop-filter",
        color.class,
        local.class,
      )}
      {...others}
    />
  );
};
