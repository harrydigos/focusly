import { Component, For, Match, Show, Switch } from "solid-js";
import { TbAtom, TbBell, TbBrush, TbCheck } from "solid-icons/tb";

import { ALARMS, BG_COLORS } from "~/config";
import { Stack } from "~/design/Stack";
import { Piano } from "~/design/icons";
import { useSettingsContext } from "~/providers";
import { classNames } from "~/utils";

export const Customization: Component = () => {
  return (
    <Stack direction="flex-col" class="gap-2">
      <Stack direction="flex-col" class="gap-0.5">
        <Stack direction="flex-row" class="gap-0.5 text-stone-400">
          <TbBrush class="h-4 w-4" />
          <div class="text-xs font-medium">Customization</div>
        </Stack>
        <hr class="h-px border-0 bg-stone-800" />
      </Stack>
      <PanelColor />
      <hr class="h-px border-0 bg-stone-800" />
      <Alarm />
    </Stack>
  );
};

const PanelColor: Component = () => {
  const { bgColor: color, updateBgColor } = useSettingsContext();

  return (
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
                opt.class,
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
  );
};

const Alarm: Component = () => {
  const { alarmSound: sound, updateAlarmSound: updateSound } =
    useSettingsContext();
  const alarmAudio = new Audio();

  return (
    <Stack direction="flex-row" class="w-full items-center justify-between">
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
  );
};
