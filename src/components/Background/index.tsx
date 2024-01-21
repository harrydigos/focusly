import { Component, Match, Switch } from "solid-js";
import { useSpace } from "~/stores/spaces";

import { SpiritedAwayTrain } from "./SpiritedAwayTrain";
import { LofiGirl } from "./LofiGirl";
import { LofiGirlBalcony } from "./LofiGirlBalcony";
import { Train } from "./Train";

export const Background: Component = () => {
  const { space } = useSpace();

  return (
    <Switch>
      <Match when={space() === "lofi_girl"}>
        <LofiGirl />
      </Match>
      <Match when={space() === "spirited_away_train"}>
        <SpiritedAwayTrain />
      </Match>
      <Match when={space() === "lofi_girl_balcony"}>
        <LofiGirlBalcony />
      </Match>
      <Match when={space() === "train"}>
        <Train />
      </Match>
    </Switch>
  );
};
