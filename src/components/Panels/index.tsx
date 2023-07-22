import { Component, Show, createSignal, onMount } from "solid-js";

import { Draggable } from "~/components/Draggable";
import { Todos } from "~/components/Todos";
import { NoteControl } from "~/components/NoteControl";
import { Notes } from "~/components/Note";
import { usePanelContext } from "~/providers";

export const Panels: Component = () => {
  const { noteControl, setNoteControl, setTodos, todos } = usePanelContext();
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <Show when={isMounted()}>
      <Show when={todos.isOpen}>
        <Draggable tab={todos} setTab={setTodos}>
          <Todos />
        </Draggable>
      </Show>
      <Show when={noteControl.isOpen}>
        <Draggable tab={noteControl} setTab={setNoteControl}>
          <NoteControl />
        </Draggable>
      </Show>
      <Notes />
    </Show>
  );
};
