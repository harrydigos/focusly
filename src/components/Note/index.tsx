import { Accessor, Component, For, Show, createSignal } from "solid-js";
import { Draggable } from "../Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Note } from "~/types";
import { notes, setNotes } from "~/stores/MenuTabsStore";
import { Textarea } from "~/design/Textarea";

export const Notes: Component = () => {
  return (
    <For each={notes}>{(note, i) => <StickyNote note={note} index={i} />}</For>
  );
};

export const StickyNote: Component<{ note: Note; index: Accessor<number> }> = (
  props
) => {
  // const [isEditing, setIsEditing] = createSignal(false);

  return (
    <Show when={props.note.isOpen}>
      <Draggable tab={props.note} setNotes={setNotes} index={props.index}>
        <GlassBox direction="flex-col" class="h-[250px] max-h-[500px]">
          {/* <Show
            when={isEditing()}
            // fallback={
            //   <div class="max-w-xs" onDblClick={() => setIsEditing(true)}>
            //     {props.note.value}
            //   </div>
            // }
          > */}
          <Textarea
            class="h-full w-full"
            value={props.note.value}
            onInput={(e) => {
              // console.log(e.currentTarget.value);
              // t.replace(/\n\r?/g, '<br />')
              // const regex = /(\r\n|\n|\r)/gm;
              // if (e.currentTarget.value.match(regex)) {
              //   console.log("new line");
              // }
              setNotes(props.index(), "value", e.currentTarget.value);
            }}
            onChange={(e) => {
              /* TODO: What should happen when is has no letters? */
              if (e.currentTarget.value === "") {
                setNotes(notes.filter((n) => n.id !== props.note.id));
              }
            }}
            // onBlur={() => setIsEditing(false)}
            autocomplete="off"
          />
        </GlassBox>
      </Draggable>
    </Show>
  );
};
