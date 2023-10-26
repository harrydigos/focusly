import { Component, onMount } from "solid-js";
import { useWindowSize } from "@solid-primitives/resize-observer";

import { Todos } from "~/components/Todos";
import { NoteControl } from "~/components/NoteControl";
import { Notes } from "~/components/Note";
import { YoutubePlayer } from "~/components/Youtube";
import { Timer } from "~/components/Timer";
import { usePanelContext, YoutubeProvider } from "~/providers";

export const Panels: Component = () => {
  const {
    noteControl,
    setNoteControl,
    setTodos,
    todos,
    music,
    setMusic,
    timer,
    setTimer,
  } = usePanelContext();
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
    if (music.position.z === 0) {
      setMusic("position", "x", () => winSize.width / 2 - pxFromCenter);
    }
    if (timer.position.z === 0) {
      setTimer("position", "x", () => winSize.width / 2 - pxFromCenter);
    }
  });

  return (
    <>
      <Todos />
      <NoteControl />
      <Notes />
      <YoutubeProvider>
        <YoutubePlayer />
      </YoutubeProvider>
      <Timer />
    </>
  );
};
