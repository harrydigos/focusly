import { Component, For, Show, createSignal, onMount } from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { Draggable } from "~/components/Draggable";
import {
  notePanel,
  notes,
  setNotePanel,
  setNotes,
  setTodos,
  todos,
} from "~/stores/MenuTabsStore";
import { Todos } from "~/components/Todos";
import { Notes } from "../Notes";

export const Panels: Component = () => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <Show when={isMounted()}>
      <Show when={todos.isOpen}>
        <Draggable tab={todos} setTab={setTodos}>
          <GlassBox direction="flex-col">
            <Todos />
          </GlassBox>
        </Draggable>
      </Show>
      <Show when={notePanel.isOpen}>
        <Draggable tab={notePanel} setTab={setNotePanel}>
          <GlassBox direction="flex-col">
            <Notes />
          </GlassBox>
        </Draggable>
      </Show>
      <For each={notes}>
        {(note, i) => (
          <Show when={note.isOpen}>
            <Draggable tab={note} setNotes={setNotes} index={i}>
              <GlassBox direction="flex-col">
                <div>{note.value}</div>
              </GlassBox>
            </Draggable>
          </Show>
        )}
      </For>
    </Show>
  );
};
