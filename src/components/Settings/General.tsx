import { TbLock, TbLockOpen, TbTool } from "solid-icons/tb";
import { Component, Show } from "solid-js";

import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";

export const General: Component = () => {
  return (
    <Stack direction="flex-col" class="gap-2">
      <Stack direction="flex-col" class="gap-0.5">
        <Stack direction="flex-row" class="gap-0.5 text-stone-400">
          <TbTool class="h-4 w-4" />
          <div class="text-xs font-medium">General</div>
        </Stack>
        <hr class="h-px border-0 bg-stone-800" />
      </Stack>
      <Stack direction="flex-row" class="w-full items-center justify-between">
        <h2 class="text-sm">Lock panels</h2>
        <LockButton />
      </Stack>
    </Stack>
  );
};

const LockButton: Component = () => {
  const { isLocked, toggleLock } = usePanelContext();

  return (
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
  );
};
