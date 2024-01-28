import { Component } from "solid-js";

import { Todos } from "~/components/Todos";
import { NoteControl } from "~/components/NoteControl";
import { Notes } from "~/components/Note";
import { YoutubePlayer } from "~/components/Youtube";
import { Timer } from "~/components/Timer";
import { Menu } from "~/components/Menu";

export const Panels: Component = () => {
  return (
    <>
      <Todos />
      <NoteControl />
      <Notes />
      <YoutubePlayer />
      <Timer />
      <Menu />
    </>
  );
};
