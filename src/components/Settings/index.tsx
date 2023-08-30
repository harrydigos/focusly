import { Accessor, Component, For, Setter, Show } from "solid-js";
import { Dialog } from "@ark-ui/solid";
import {
  TbAlertCircle,
  TbBrush,
  TbLock,
  TbLockOpen,
  TbTool,
  TbX,
} from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";

interface SettingsModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const SettingsModal: Component<SettingsModalProps> = (props) => {
  const { isLocked, toggleLock } = usePanelContext();

  return (
    <Dialog open={props.isOpen()} onClose={() => props.setIsOpen(false)}>
      <Modal isOpen={props.isOpen}>
        <Stack direction="flex-col" class="gap-4">
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
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbTool class="h-4 w-4" />
                <div class="text-xs font-medium">General</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
            <Stack
              direction="flex-row"
              class="w-full items-center justify-between"
            >
              <h2 class="text-sm">Lock panels</h2>
              <Button variant="outline" onClick={toggleLock}>
                <Show
                  when={isLocked()}
                  fallback={
                    <>
                      <TbLock class="h-4 w-4" />
                      <span>Lock</span>
                    </>
                  }
                >
                  <TbLockOpen class="h-4 w-4" />
                  <span>Unlock</span>
                </Show>
              </Button>
            </Stack>
          </Stack>
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbBrush class="h-4 w-4" />
                <div class="text-xs font-medium">Customization</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
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
          </Stack>
          <Stack direction="flex-col" class="gap-2">
            <Stack direction="flex-col" class="gap-0.5">
              <Stack direction="flex-row" class="gap-0.5 text-stone-400">
                <TbAlertCircle class="h-4 w-4" />
                <div class="text-xs font-medium">Destructive</div>
              </Stack>
              <hr class="h-px border-0 bg-stone-800" />
            </Stack>
            <Button
              variant="ghost"
              class="w-fit text-red-500"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Reset all
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Dialog>
  );
};
