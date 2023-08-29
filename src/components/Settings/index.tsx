import { Dialog } from "@ark-ui/solid";
import { TbX } from "solid-icons/tb";
import { Accessor, Component, For, Setter } from "solid-js";
import { Button } from "~/design/Button";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";

interface SettingsModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const SettingsModal: Component<SettingsModalProps> = (props) => {
  return (
    <Dialog open={props.isOpen()} onClose={() => props.setIsOpen(false)}>
      <Modal isOpen={props.isOpen}>
        <Stack direction="flex-col" class="gap-3">
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h1 class="text-lg font-semibold">Settings</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => props.setIsOpen(false)}
            >
              <TbX class="h-4 w-4" />
            </Button>
          </Stack>
          <hr class="h-px border-0 bg-stone-800" />
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h2 class="text-sm">Lock panels</h2>
            {/* TODO: make this a switch */}
            <Button variant="outline">Lock</Button>
          </Stack>
          <hr class="h-px border-0 bg-stone-800" />
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between gap-8 whitespace-nowrap"
          >
            <h2 class="text-sm">Panel color</h2>

            <div class="grid grid-cols-5 gap-1">
              <For each={Array(10).fill(0)}>
                {() => (
                  <div class="aspect-square h-6 rounded-md bg-stone-600" />
                )}
              </For>
            </div>
          </Stack>
          <hr class="h-px border-0 bg-stone-800" />
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h2 class="text-sm">Space</h2>
            <div class="h-20 w-28 rounded-xl bg-stone-600" />
          </Stack>
          <hr class="h-px border-0 bg-stone-800" />
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h2 class="text-sm">Alarm</h2>
            <Stack direction="flex-row" class="gap-2">
              <div class="aspect-square h-12 rounded-lg bg-stone-600" />
              <div class="aspect-square h-12 rounded-lg bg-stone-600" />
              <div class="aspect-square h-12 rounded-lg bg-stone-600" />
            </Stack>
          </Stack>
          <hr class="h-px border-0 bg-stone-800" />
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h2 class="text-sm">Destructive</h2>
            <Stack direction="flex-row" class="gap-3">
              <Button variant="destructive">Reset</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Dialog>
  );
};
