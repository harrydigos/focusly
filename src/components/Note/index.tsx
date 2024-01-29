import { Accessor, Component, For, Show, createSignal } from "solid-js";
import { useWindowSize } from "@solid-primitives/resize-observer";

import { AnimatePanel } from "~/components/AnimatePanel";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Textarea } from "~/design/Textarea";
import { useCursorPositionContext, usePanelContext } from "~/providers";
import { Note } from "~/types";

export const Notes: Component = () => {
  const { notes } = usePanelContext();

  return (
    <For each={notes}>{(note, i) => <StickyNote note={note} index={i} />}</For>
  );
};

const StickyNote: Component<{
  note: Note;
  index: Accessor<number>;
}> = (props) => {
  const { setNotes, noteControl } = usePanelContext();
  const { cursorPosition } = useCursorPositionContext();
  const windowSize = useWindowSize();
  const [disableDrag, setDisableDrag] = createSignal(false);

  const getInitialPosition = () => {
    const isOpen = noteControl.isOpen;
    return {
      x: isOpen ? noteControl.position.x : windowSize.width / 2,
      y: isOpen ? noteControl.position.y : 40,
    };
  };

  return (
    <AnimatePanel
      from={cursorPosition() ?? getInitialPosition()}
      to={props.note.position}
    >
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
              class="aspect-square h-full w-full resize-none placeholder:text-stone-400"
              value={props.note.value}
              placeholder="Click inside to start typing..."
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
    </AnimatePanel>
  );
};
