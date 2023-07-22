import { Component, Show, createSignal, onMount } from "solid-js";

import { Draggable } from "~/components/Draggable";
import { Todos } from "~/components/Todos";
import { NoteControl } from "~/components/NoteControl";
import { Notes } from "~/components/Note";
import { usePanelContext } from "~/providers";
import { useWindowSize } from "@solid-primitives/resize-observer";

export const Panels: Component = () => {
  const { noteControl, setNoteControl, setTodos, todos } = usePanelContext();
  const [isMounted, setIsMounted] = createSignal(false);
  const winSize = useWindowSize();

  onMount(() => {
    const isMobile = winSize.width <= 640;
    const pxFromCenter = isMobile ? 170 : 220;

    /* If z index is 0, means that the panel is in it's initial position */

    if (todos.position.z === 0) {
      setTodos("position", "x", () => winSize.width / 2 - pxFromCenter);
    }
    if (noteControl.position.z === 0) {
      setNoteControl("position", "x", () => winSize.width / 2 - pxFromCenter);
    }

    setIsMounted(true);
  });

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
