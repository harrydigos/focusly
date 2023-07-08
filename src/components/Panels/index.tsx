import { Component, For, Show, createSignal, onMount } from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { Draggable } from "~/components/Draggable";
import { menuTabs } from "~/stores/MenuTabsStore";
import { MenuKey } from "~/types";

export const Panels: Component = () => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <For each={Object.entries(menuTabs)}>
      {([key, value]) => (
        <Show when={value.isOpen && isMounted()}>
          <Draggable key={key as MenuKey} position={value.position}>
            <GlassBox direction="flex-col">{key}</GlassBox>
          </Draggable>
        </Show>
      )}
    </For>
  );
};
