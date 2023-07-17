import { Accessor, Component, For, Show } from "solid-js";

import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Textarea } from "~/design/Textarea";
import { notes, setNotes } from "~/stores/MenuTabsStore";
import { Note } from "~/types";

export const Notes: Component = () => {
  return (
    <For each={notes}>{(note, i) => <StickyNote note={note} index={i} />}</For>
  );
};

export const StickyNote: Component<{ note: Note; index: Accessor<number> }> = (
  props
) => {
  return (
    <Show when={props.note.isOpen}>
      <Draggable tab={props.note} setNotes={setNotes} index={props.index}>
        <GlassBox direction="flex-col" class="h-[250px] max-h-[500px]">
          <Textarea
            class="h-full w-full resize-none rounded-none border-transparent bg-transparent px-0 py-0 transition-none focus-visible:border-transparent focus-visible:ring-transparent"
            value={props.note.value}
            onInput={(e) => {
              setNotes(props.index(), "value", e.currentTarget.value);
            }}
            onChange={(e) => {
              const lines = e.currentTarget.value.split(/[\n\s]/g);
              const hasLetters = lines.some((line) => line.length > 0);
              if (!hasLetters) {
                setNotes(props.index(), "value", "New note");
              }
              setNotes(props.index(), "id", Date.now().toString()); // use updated_at
            }}
            spellcheck={false}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            autocomplete="off"
          />
        </GlassBox>
      </Draggable>
    </Show>
  );
};
