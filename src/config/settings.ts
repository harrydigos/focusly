export const ALARMS = [
  { value: "bells", url: "sounds/bells.wav" },
  { value: "arp", url: "sounds/arp.wav" },
  { value: "cosmo", url: "sounds/cosmo.wav" },
] as const;

export type Alarm = (typeof ALARMS)[number];

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
