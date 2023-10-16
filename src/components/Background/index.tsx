import {
  Component,
  Match,
  Show,
  Switch,
  createSignal,
  onMount,
} from "solid-js";
import { useSpace } from "~/stores/spaces";

import { SpiritedAwayTrain } from "./SpiritedAwayTrain";
import { LofiGirl } from "./LofiGirl";
import { LofiGirlBalcony } from "./LofiGirlBalcony";
import { Train } from "./Train";

export const Background: Component = () => {
  const { space } = useSpace();
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <Show when={isMounted()}>
      <Switch>
        <Match when={space.value === "lofi_girl"}>
          <LofiGirl />
        </Match>
        <Match when={space.value === "spirited_away_train"}>
          <SpiritedAwayTrain />
        </Match>
        <Match when={space.value === "lofi_girl_balcony"}>
          <LofiGirlBalcony />
        </Match>
        <Match when={space.value === "train"}>
          <Train />
        </Match>
      </Switch>
    </Show>
  );
};
