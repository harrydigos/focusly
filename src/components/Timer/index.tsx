import { Component, Show, createEffect, createSignal } from "solid-js";
import { usePanelContext } from "~/providers";
import { Draggable } from "../Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";

export const Timer: Component = () => {
  const { timer, setTimer } = usePanelContext();
  const [isRunning, setIsRunning] = createSignal(false);

  let timerInterval: number;

  createEffect(() => {
    if (isRunning()) {
      timerInterval = setInterval(
        () => setTimer("currentTime", timer.currentTime - 1),
        10
      );
    } else {
      clearInterval(timerInterval);
    }
  });

  createEffect(() => {
    if (timer.onBreak && timer.currentTime === 0) {
      /* Break ended, starting new pomo session */
      setTimer("currentPomo", (prev) => prev + 1);

      setTimer("currentTime", 25 * 60);
      setTimer("onBreak", false);
    }

    if (timer.currentTime === 0) {
      setTimer("currentTime", (timer.currentPomo + 1) % 4 ? 5 * 60 : 15 * 60);
      setTimer("onBreak", true);
    }
  });

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
          <div>
            {Math.floor(timer.currentTime / 60)}:
            {(timer.currentTime % 60).toString().padStart(2, "0")}
          </div>
          <button onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning() ? "Stop" : "Start"}
          </button>
          <div>currentPomo {timer.currentPomo + 1} </div>
        </GlassBox>
      </Draggable>
    </Show>
  );
};
