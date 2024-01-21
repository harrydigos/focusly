import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

export const SPACES = [
  "lofi_girl",
  "spirited_away_train",
  "lofi_girl_balcony",
  "train",
] as const;

export type Space = (typeof SPACES)[number];

const SPACE_COOKIE_KEY = "focusly_space";

export const [space, setSpace] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createSignal<Space>("lofi_girl"),
  {
    storage: cookieStorage,
    name: SPACE_COOKIE_KEY,
  } as any
);
