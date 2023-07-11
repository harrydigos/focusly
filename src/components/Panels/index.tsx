import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createSignal,
  onMount,
} from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { Draggable } from "~/components/Draggable";
import { menuTabs } from "~/stores/MenuTabsStore";
import { Todos } from "~/components/Todos";

export const Panels: Component = () => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <For each={Object.entries(menuTabs)}>
      {([key, value]) => (
        <Show when={value.isOpen && isMounted()}>
          <Switch>
            <Match when={key === "todos"}>
              <Draggable key={"todos"} position={value.position}>
                <GlassBox direction="flex-col">
                  <Todos />
                </GlassBox>
              </Draggable>
            </Match>
            <Match when={key === "music"}>
              <Draggable key={"music"} position={value.position}>
                <GlassBox direction="flex-col">
                  <div>Music</div>
                </GlassBox>
              </Draggable>
            </Match>
            <Match when={key === "notes"}>
              <Draggable key={"notes"} position={value.position}>
                <GlassBox direction="flex-col">
                  <div>Notes</div>
                </GlassBox>
              </Draggable>
            </Match>
          </Switch>
        </Show>
      )}
    </For>
  );
};
