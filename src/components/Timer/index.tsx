import { TbRotateClockwise } from "solid-icons/tb";
import { Component, For, Show, createEffect, createSignal } from "solid-js";

import { Draggable } from "~/components/Draggable";
import { Button } from "~/design/Button";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";

export const Timer: Component = () => {
  const { timer, setTimer } = usePanelContext();
  const [isRunning, setIsRunning] = createSignal(false);

  let timerInterval: number;

  createEffect(() => {
    if (isRunning()) {
      timerInterval = setInterval(
        () => setTimer("currentTime", timer.currentTime - 1),
        1000
      );
    } else {
      clearInterval(timerInterval);
    }
  });

  createEffect(() => {
    if (timer.currentTime !== 0) {
      return;
    }

    if (timer.isOnBreak) {
      /* Break ended, starting new pomo session */
      setTimer("currentPomo", (prev) => (prev === 3 ? 0 : prev + 1));
      setTimer("currentTime", 25 * 60);
    } else {
      setTimer("currentTime", (timer.currentPomo + 1) % 4 ? 5 * 60 : 15 * 60);
    }

    setTimer("isOnBreak", !timer.isOnBreak);
  });

  const resetTimer = () => {
    setIsRunning(false);
    setTimer((prev) => ({
      ...prev,
      currentTime: 25 * 60,
      currentPomo: 0,
      isOnBreak: false,
    }));
  };

  return (
    <Show when={timer.isOpen}>
      <Draggable tab={timer} setTab={setTimer}>
        <GlassBox
          direction="flex-col"
          class="max-h-[500px] w-[340px] gap-4 sm:w-[440px]"
        >
          <Stack direction="flex-row" class="items-center justify-between">
            <Stack direction="flex-row" class="items-center gap-4">
              <h1 class="text-xl font-semibold">Timer</h1>
              <Stack direction="flex-row" class="gap-1 self-center">
                <For each={[0, 1, 2, 3]}>
                  {(i) => (
                    <div
                      class="aspect-square h-2 rounded-full"
                      classList={{
                        "bg-white": timer.currentPomo >= i,
                        "bg-stone-600": timer.currentPomo < i,
                      }}
                    />
                  )}
                </For>
              </Stack>
            </Stack>
            <Show when={timer.isOnBreak}>
              <div class="inline-flex items-center rounded-lg border border-transparent bg-stone-900 px-2.5 py-0.5 text-xs text-white">
                {(timer.currentPomo + 1) % 4 ? "Short Break" : "Long Break"}
              </div>
            </Show>
          </Stack>
          <Stack
            direction="flex-row"
            class="items-center justify-between text-4xl font-semibold"
          >
            {Math.floor(timer.currentTime / 60)
              .toString()
              .padStart(2, "0")}
            :{(timer.currentTime % 60).toString().padStart(2, "0")}
            <Stack direction="flex-row" class="gap-2">
              <Button
                variant="outline"
                size="icon"
                style={{ height: "40px", width: "40px" }}
                onClick={resetTimer}
              >
                <TbRotateClockwise />
              </Button>
              <Button
                class="w-[122px]"
                onClick={() => setIsRunning((prev) => !prev)}
              >
                {isRunning() ? "Pause" : "Start"}
              </Button>
            </Stack>
          </Stack>
        </GlassBox>
      </Draggable>
    </Show>
  );
};
