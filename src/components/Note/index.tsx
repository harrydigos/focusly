import { Accessor, Component, For, Show, createSignal } from "solid-js";

import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Textarea } from "~/design/Textarea";
import { usePanelContext } from "~/providers";
import { Note } from "~/types";

export const Notes: Component = () => {
  const { notes } = usePanelContext();

  return (
    <For each={notes}>{(note, i) => <StickyNote note={note} index={i} />}</For>
  );
};

export const StickyNote: Component<{ note: Note; index: Accessor<number> }> = (
  props
) => {
  const { setNotes } = usePanelContext();
  const [disableDrag, setDisableDrag] = createSignal(false);

  return (
    <Show when={props.note.isOpen}>
      <Draggable
        tab={props.note}
        setNotes={setNotes}
        index={props.index}
        disabled={disableDrag()}
      >
        <GlassBox direction="flex-col" class="h-[250px] max-h-[500px]">
          <Textarea
            isTransparent
            class="aspect-square h-full w-full resize-none"
            value={props.note.value}
            onInput={(e) => {
              setNotes(props.index(), "value", e.currentTarget.value);
            }}
            onMouseEnter={() => setDisableDrag(true)}
            onMouseLeave={() => setDisableDrag(false)}
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
