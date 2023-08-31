import {
  Accessor,
  Component,
  For,
  Match,
  Setter,
  Show,
  Switch,
} from "solid-js";
import { Dialog } from "@ark-ui/solid";
import {
  TbAlertCircle,
  TbAtom,
  TbBell,
  TbBrush,
  TbCheck,
  TbLock,
  TbLockOpen,
  TbTool,
  TbX,
} from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Piano } from "~/design/icons";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";
import { ALARMS, BG_COLORS, useAlarmSound, useBgColor } from "~/stores";
import { classNames } from "~/utils";

interface SettingsModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const SettingsModal: Component<SettingsModalProps> = (props) => {
  const { isLocked, toggleLock } = usePanelContext();
  const { color, updateBgColor } = useBgColor();
  const { sound, updateSound } = useAlarmSound();
  const alarmAudio = new Audio();

  return (
    <Dialog open={props.isOpen()} onClose={() => props.setIsOpen(false)}>
      <Modal isOpen={props.isOpen}>
        <Stack direction="flex-col" class="gap-4">
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h1 class="text-lg font-semibold">Settings</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => props.setIsOpen(false)}
            >
              <TbX class="h-4 w-4" />
            </Button>
          </Stack>
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbTool class="h-4 w-4" />
                <div class="text-xs font-medium">General</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
            <Stack
              direction="flex-row"
              class="w-full items-center justify-between"
            >
              <h2 class="text-sm">Lock panels</h2>
              <Button variant="outline" onClick={toggleLock}>
                <Show
                  when={isLocked()}
                  fallback={
                    <>
                      <TbLock class="h-4 w-4" />
                      <span>Lock</span>
                    </>
                  }
                >
                  <TbLockOpen class="h-4 w-4" />
                  <span>Unlock</span>
                </Show>
              </Button>
            </Stack>
          </Stack>
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbBrush class="h-4 w-4" />
                <div class="text-xs font-medium">Customization</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
            <Stack
              direction="flex-row"
              class="w-full items-center justify-between gap-8 whitespace-nowrap"
            >
              <h2 class="text-sm">Panel color</h2>

              <div class="grid grid-cols-5 gap-1">
                <For each={BG_COLORS}>
                  {(opt) => (
                    <label
                      class={classNames(
                        "relative aspect-square h-6 rounded-lg border transition-colors",
                        opt.class
                      )}
                      classList={{
                        "border-stone-50": color.value === opt.value,
                        "border-stone-600/50": color.value !== opt.value,
                      }}
                    >
                      <input
                        type="radio"
                        class="absolute -z-[1] opacity-0"
                        value={opt.value}
                        checked={color.value === opt.value}
                        onChange={() => updateBgColor(opt)}
                      />
                      <Show when={color.value === opt.value}>
                        <TbCheck class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
                      </Show>
                    </label>
                  )}
                </For>
              </div>
            </Stack>
            <hr class="h-px border-0 bg-stone-800" />
            {/* <Stack
              direction="flex-row"
              class="w-full items-center justify-between"
            >
              <h2 class="text-sm">Space</h2>
              <div class="h-20 w-28 rounded-xl bg-stone-600" />
            </Stack>
            <hr class="h-px border-0 bg-stone-800" />
            */}
            <Stack
              direction="flex-row"
              class="w-full items-center justify-between"
            >
              <h2 class="text-sm">Alarm</h2>
              <Stack direction="flex-row" class="gap-2">
                <For each={ALARMS}>
                  {(opt) => (
                    <label
                      class="flex aspect-square h-12 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border border-stone-600 transition-colors hover:opacity-90"
                      classList={{
                        "bg-stone-50 text-stone-900": sound.value === opt.value,
                      }}
                    >
                      <input
                        type="radio"
                        class="absolute -z-[1] opacity-0"
                        value={opt.value}
                        checked={sound.value === opt.value}
                        onChange={() => updateSound(opt)}
                        onClick={() => {
                          alarmAudio.src = opt.url;
                          alarmAudio.play();
                        }}
                      />
                      <Switch>
                        <Match when={opt.value === "bells"}>
                          <TbBell class="h-4 w-4" />
                        </Match>
                        <Match when={opt.value === "arp"}>
                          {/* This icon is from different icon set */}
                          <Piano
                            class="h-4 w-4 fill-stone-50"
                            classList={{
                              "fill-stone-900": sound.value === opt.value,
                            }}
                          />
                        </Match>
                        <Match when={opt.value === "cosmo"}>
                          <TbAtom class="h-4 w-4" />
                        </Match>
                      </Switch>
                      <span class="text-[10px] font-medium">{opt.value}</span>
                    </label>
                  )}
                </For>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbAlertCircle class="h-4 w-4" />
                <div class="text-xs font-medium">Destructive</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
            <Button
              variant="ghost"
              class="w-fit text-red-500"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Reset all
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Dialog>
  );
};
