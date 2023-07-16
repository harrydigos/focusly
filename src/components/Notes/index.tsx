import { Component, For, Show } from "solid-js";
import { TbEye, TbEyeOff, TbPlus } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import { notes, setNotes } from "~/stores/MenuTabsStore";

export const Notes: Component = () => {
  return (
    <Stack direction="flex-col" class="max-h-[500px] w-72 gap-4 sm:w-96">
      <Stack direction="flex-row" class="items-center justify-between">
        <h1 class="text-xl font-semibold">Notes</h1>
        <Button>
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
          {(note, i) => (
            <Stack direction="flex-row">
              <Button
                size="icon"
                onClick={() => setNotes(i(), "isOpen", (prev) => !prev)}
              >
                <Show when={note.isOpen} fallback={<TbEyeOff />}>
                  <TbEye />
                </Show>
              </Button>
              <div>{note.value}</div>
            </Stack>
          )}
        </For>
      </Stack>
    </Stack>
  );
};
