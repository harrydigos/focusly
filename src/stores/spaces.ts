import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";

import { Space } from "~/config";

const SPACE_COOKIE_KEY = "focusly_space";

const [space, setSpace] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createSignal<Space>("lofi_girl"),
  {
    storage: cookieStorage,
    name: SPACE_COOKIE_KEY,
  } as any
);

export const useSpace = () => ({
  space,
  setSpace,
});
