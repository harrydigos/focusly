import { Component, Show } from "solid-js";
import { usePanelContext } from "~/providers";
import { Draggable } from "../Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";

export const Timer: Component = () => {
  const { timer, setTimer } = usePanelContext();
  return (
    <Show when={timer.isOpen}>
      <Draggable tab={timer} setTab={setTimer}>
        <GlassBox
          direction="flex-col"
          class="max-h-[500px] w-[340px] gap-4 px-0 sm:w-[440px]"
        >
          <Stack direction="flex-row" class="items-center justify-between px-6">
            <h1 class="text-xl font-semibold">Timer</h1>
          </Stack>
        </GlassBox>
      </Draggable>
    </Show>
  );
};
