import { TbRotateClockwise } from "solid-icons/tb";
import {
  Component,
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import { AnimatePanel } from "~/components/AnimatePanel";
import { Draggable } from "~/components/Draggable";
import { INIT_TIMER } from "~/config/timer";
import { Button } from "~/design/Button";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";
import { useAlarmSound } from "~/stores";
import { Timer as TimerType } from "~/types";

type WorkerReceiveMsg = Pick<TimerType, "currentTime"> &
  Partial<Pick<TimerType, "currentPomo" | "isOnBreak">>;

const displayTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export const Timer: Component = () => {
  const { timer: timerTab, setTimer: setTimerTab } = usePanelContext();
  const [timer, setTimer] = createSignal(INIT_TIMER);
  const [isRunning, setIsRunning] = createSignal(false);
  const { sound } = useAlarmSound();

  let timerWorker: Worker | undefined;

  onMount(() => {
    timerWorker = new Worker(new URL("timer.worker.ts", import.meta.url));
  });

  createEffect(() => {
    if (timer().currentTime === 0) {
      new Audio(sound.url).play();
    }

    if (window.Worker && timerWorker) {
      timerWorker.postMessage({
        isRunning: isRunning(),
        currentTime: timer().currentTime,
        currentPomo: timer().currentPomo,
        isOnBreak: timer().isOnBreak,
      });
    }
  });

  createEffect(() => {
    if (!timerWorker) return;

    const onReceiveMessage = ({ data }: MessageEvent<WorkerReceiveMsg>) => {
      const time = data.currentTime;
      const pomo = data.currentPomo;
      const isBreak = data.isOnBreak;

      setTimer((prev) => ({
        currentTime: time,
        currentPomo: typeof pomo !== "undefined" ? pomo : prev.currentPomo,
        isOnBreak: typeof isBreak !== "undefined" ? isBreak : prev.isOnBreak,
      }));

      document.title = `${"Focusly"}${isRunning() ? ` | ${displayTime(time)}` : ""
        }`;
    };

    timerWorker.onmessage = onReceiveMessage;
  });
  onCleanup(() => timerWorker?.terminate());

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(INIT_TIMER);
    document.title = "Focusly";
  };

  return (
    <AnimatePanel position={timerTab.position}>
      <Show when={timerTab.isOpen}>
        <Draggable tab={timerTab} setTab={setTimerTab}>
          <GlassBox
            direction="flex-col"
            class="max-h-[500px] w-[340px] gap-4 sm:w-[440px]"
          >
            <Stack direction="flex-row" class="items-center justify-between">
              <Stack direction="flex-row" class="items-center gap-4">
                <h1 class="select-none text-xl font-semibold">Timer</h1>
                <Stack direction="flex-row" class="gap-1 self-center">
                  <For each={[0, 1, 2, 3]}>
                    {(i) => (
                      <div
                        class="aspect-square h-2 rounded-full"
                        classList={{
                          "bg-white": timer().currentPomo >= i,
                          "bg-stone-600": timer().currentPomo < i,
                        }}
                      />
                    )}
                  </For>
                </Stack>
              </Stack>
              <Show when={timer().isOnBreak}>
                <div class="inline-flex select-none items-center rounded-lg border border-transparent bg-stone-900 px-2.5 py-0.5 text-xs text-white">
                  {(timer().currentPomo + 1) % 4 ? "Short Break" : "Long Break"}
                </div>
              </Show>
            </Stack>
            <Stack
              direction="flex-row"
              class="items-center justify-between text-4xl font-semibold"
            >
              <div class="select-none">{displayTime(timer().currentTime)}</div>
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
                  class="w-[122px] select-none"
                  onClick={() => setIsRunning((prev) => !prev)}
                >
                  {isRunning() ? "Pause" : "Start"}
                </Button>
              </Stack>
            </Stack>
          </GlassBox>
        </Draggable>
      </Show>
    </AnimatePanel>
  );
};
