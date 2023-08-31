/* eslint-disable solid/reactivity */

import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";

export const ALARMS = [
  { value: "bells", url: "bells.wav" },
  { value: "arp", url: "arp.wav" },
  { value: "cosmo", url: "cosmo.wav" },
] as const;

export type Alarm = (typeof ALARMS)[number];

const [alarmSound, setAlarmSound] = makePersisted(
  createStore<Alarm>({
    value: "bells",
    url: "bells.wav",
  })
);

const updateSound = (value: Alarm) => {
  setAlarmSound(value);
};

export const useAlarmSound = () => ({ sound: alarmSound, updateSound });

export const BG_COLORS = [
  { value: "stone", class: "bg-stone-950" },
  { value: "amber", class: "bg-amber-950" },
  { value: "yellow", class: "bg-yellow-950" },
  { value: "green", class: "bg-green-950" },
  { value: "emerald", class: "bg-emerald-950" },
  { value: "cyan", class: "bg-cyan-950" },
  { value: "sky", class: "bg-sky-950" },
  { value: "indigo", class: "bg-indigo-950" },
  { value: "pink", class: "bg-pink-950" },
  { value: "rose", class: "bg-rose-950" },
] as const;

export type BgColor = (typeof BG_COLORS)[number];

const [bgColor, setBgColor] = makePersisted(
  createStore<BgColor>({
    value: "stone",
    class: "bg-stone-950",
  })
);

const updateBgColor = (value: BgColor) => {
  setBgColor(value);
  if (document.documentElement) {
    document.documentElement.style.setProperty("--bg-color", value.class);
  }
};

export const useBgColor = () => ({ color: bgColor, updateBgColor });
