import { Accessor, Component, For, Show, createMemo } from "solid-js";
import { TbEye, TbEyeOff, TbPlus, TbTrash } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import {
  getBiggestZ,
  notePanel,
  notes,
  setNotes,
} from "~/stores/MenuTabsStore";
import { Note } from "~/types";

export const NoteControl: Component = () => {
  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      value: "New note",
      isOpen: true,
      position: {
        x: notePanel.position.x,
        y: notePanel.position.y,
        z: getBiggestZ() + 1,
      },
    };
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <Stack direction="flex-col" class="max-h-[500px] w-72 gap-4 sm:w-96">
      <Stack direction="flex-row" class="items-center justify-between">
        <h1 class="text-xl font-semibold">Notes</h1>
        <Button onClick={createNote}>
          <TbPlus size={20} class="stroke-stone-900" />
          New note
        </Button>
      </Stack>
      <Stack direction="flex-col" class="gap-1 overflow-y-auto py-1">
        <For
          each={notes}
          fallback={
            <span class="text-center text-sm text-stone-200">
              No notes yet. Add one by clicking the button above.
            </span>
          }
        >
          {(note, i) => <NoteRow note={note} index={i} />}
        </For>
      </Stack>
    </Stack>
  );
};

const NoteRow: Component<{ note: Note; index: Accessor<number> }> = (props) => {
  const toggleNote = () => {
    setNotes(props.index(), "position", "z", () => getBiggestZ() + 1);
    setNotes(props.index(), "isOpen", (prev) => !prev);
  };

  const deleteNote = () => {
    setNotes(notes.filter((n) => n.id !== props.note.id));
  };

  const updatedAt = createMemo(() => {
    const date = new Date(parseInt(props.note.id));
    return new Intl.DateTimeFormat("en-UK", {
      weekday: "short",
      day: "numeric",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    }).format(date);
  });

  const noteValue = createMemo(() => {
    if (props.note.value.match(/\n/g)) {
      const lines = props.note.value.split(/\n/g);
      const firstWrittenLine = lines.findIndex((l) => l.length > 0);
      return {
        title: lines[firstWrittenLine]?.includes(" ")
          ? "New note"
          : lines[firstWrittenLine],
        text: lines.slice(firstWrittenLine + 1).join("\n"),
      };
    }
    return {
      title: props.note.value,
      text: "",
    };
  });

  return (
    <Stack
      direction="flex-row"
      class="cursor-pointer items-center justify-between gap-1 rounded-lg border border-transparent bg-stone-900/50 p-2 text-white hover:bg-stone-800/50"
      onClick={toggleNote}
    >
      <Stack direction="flex-col">
        <Stack direction="flex-row" class="items-center gap-2">
          <h2 class="max-w-[205px] truncate text-sm sm:max-w-[300px]">
            {noteValue().title}
          </h2>
          <Show
            when={props.note.isOpen}
            fallback={<TbEyeOff class="opacity-50" />}
          >
            <TbEye class="opacity-50" />
          </Show>
        </Stack>
        <Stack
          direction="flex-row"
          class=" gap-2 text-xs font-light text-stone-300"
        >
          <span>{updatedAt()}</span>
          <div class="max-w-[140px] truncate sm:max-w-[240px]">
            {noteValue().text}
          </div>
        </Stack>
      </Stack>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          deleteNote();
        }}
      >
        <TbTrash size={20} class="stroke-red-500" />
      </Button>
    </Stack>
  );
};
