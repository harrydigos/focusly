/* eslint-disable solid/reactivity */
import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";

export const SPACES = [
  { value: "lofi_girl" },
  { value: "spirited_away_train" },
  { value: "lofi_girl_balcony" },
  { value: "train" },
] as const;

export type Space = (typeof SPACES)[number];

const [space, setSpace] = makePersisted(
  createStore<Space>({ value: "lofi_girl" })
);

const updateSpace = (value: Space) => {
  setSpace(value);
};

export const useSpace = () => ({ space, updateSpace });
