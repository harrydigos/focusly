import { createElementBounds } from "@solid-primitives/bounds";

const bounds = createElementBounds(document.body, {
  trackScroll: false,
  trackMutation: false,
});

export const useScreenBounds = () => bounds;
