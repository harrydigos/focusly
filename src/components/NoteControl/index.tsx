import {
  Accessor,
  Component,
  For,
  Show,
  createMemo,
  createSignal,
} from "solid-js";
import {
  TbEye,
  TbEyeOff,
  TbGripVertical,
  TbPlus,
  TbTrash,
} from "solid-icons/tb";
import {
  closestCenter,
  createSortable,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";

import { Draggable } from "~/components/Draggable";
import { Button } from "~/design/Button";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";
import { Note } from "~/types";
import { usePanelContext } from "~/providers";
import { ToastStyle } from "~/utils";
import toast from "solid-toast";

export const NoteControl: Component = () => {
  const { noteControl, setNoteControl, notes, setNotes, getBiggestZ } =
    usePanelContext();

  const [reorder, setReorder] = createSignal(false);
  const ids = () => notes.map((t) => t.id);

  const onDragEnd = (obj: any) => {
    if (obj.draggable && obj.droppable) {
      const fromIndex = ids().indexOf(obj.draggable.id);
      const toIndex = ids().indexOf(obj.droppable.id);

      if (fromIndex !== toIndex) {
        const updatedItems = ids().slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setNotes(() =>
          updatedItems
            .map((id) => notes.find((t) => t.id === id)!)
            .filter((t) => t !== null)
        );
      }
    }
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      value: "New note",
      isOpen: true,
      isLocked: noteControl.isLocked,
      position: {
        x: noteControl.position.x,
        y: noteControl.position.y,
        z: getBiggestZ() + 1,
      },
    };
    setNotes((prev) => [...prev, newNote]);

    toast.success("Note created!", {
      style: ToastStyle,
      duration: 3000,
    });
  };

  return (
    <Show when={noteControl.isOpen}>
      <Draggable tab={noteControl} setTab={setNoteControl} disabled={reorder()}>
        <GlassBox
          direction="flex-col"
          class="max-h-[500px] w-[340px] gap-4 px-0 sm:w-[440px]"
        >
          <Stack
            direction="flex-row"
            class="select-none items-center justify-between px-6"
          >
            <h1 class="text-xl font-semibold">Notes</h1>
            <Button onClick={createNote}>
              <TbPlus size={20} class="stroke-stone-900" />
              New note
            </Button>
          </Stack>
          <DragDropProvider
            onDragEnd={onDragEnd}
            collisionDetector={closestCenter}
          >
            <DragDropSensors />
            <Stack
              direction="flex-col"
              class="overflow-y-auto py-1"
              onMouseEnter={() => setReorder(true)}
              onMouseLeave={() => setReorder(false)}
            >
              <SortableProvider ids={ids()}>
                <For
                  each={notes}
                  fallback={
                    <span class="select-none text-center text-sm text-stone-200">
                      No notes yet. Add one by clicking the button above.
                    </span>
                  }
                >
                  {(note, i) => <NoteRow note={note} index={i} />}
                </For>
              </SortableProvider>
            </Stack>
            {/* This is necessary */}
            <DragOverlay>
              <div class="hidden" />
            </DragOverlay>
          </DragDropProvider>
        </GlassBox>
      </Draggable>
    </Show>
  );
};

const NoteRow: Component<{ note: Note; index: Accessor<number> }> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const sortable = createSortable(props.note.id);
  const ctx = useDragDropContext();
  const { notes, setNotes, getBiggestZ } = usePanelContext();

  const toggleNote = () => {
    setNotes(props.index(), "position", "z", () => getBiggestZ() + 1);
    setNotes(props.index(), "isOpen", (prev) => !prev);
  };

  const deleteNote = () => {
    setNotes(notes.filter((n) => n.id !== props.note.id));
    toast.success("Note deleted!", {
      style: ToastStyle,
      duration: 3000,
    });
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
    <div
      use:sortable
      class="group relative px-6 py-0.5"
      classList={{
        "opacity-30": sortable.isActiveDraggable,
        "transition-transform cursor-grabbing": !!ctx?.[0].active.draggable,
        "cursor-grab": !ctx?.[0].active.draggable,
      }}
    >
      {/* Both Shows are needed, cuz to reorder, you need to place the cursor above another TodoRow */}
      <Show when={ctx?.[0].active.draggable?.id === props.note.id}>
        <TbGripVertical
          size={16}
          class="absolute left-1 top-1/2 -translate-y-1/2 stroke-white/80"
        />
      </Show>
      <Show when={!ctx?.[0].active.draggable}>
        <TbGripVertical
          size={16}
          class="absolute left-1 top-1/2 -translate-y-1/2 stroke-white/40 opacity-0 group-hover:opacity-100"
        />
      </Show>
      <Stack
        direction="flex-row"
        class="cursor-pointer select-none items-center justify-between gap-1 rounded-lg border border-transparent bg-stone-900/50 p-2 text-white hover:bg-stone-800/50"
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
    </div>
  );
};
