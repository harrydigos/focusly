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
  createStore({
    value: "bells",
    url: "bells.wav",
  })
);

const updateSound = (value: Alarm) => {
  setAlarmSound(value);
};

export const useAlarmSound = () => ({ sound: alarmSound, updateSound });
