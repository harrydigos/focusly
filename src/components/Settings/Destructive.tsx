import { TbAlertCircle } from "solid-icons/tb";
import { Component } from "solid-js";

import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";

export const Destructive: Component = () => {
  const reset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Stack direction="flex-col" class="gap-2">
      <Stack direction="flex-col" class="gap-0.5">
        <Stack direction="flex-row" class="gap-0.5 text-stone-400">
          <TbAlertCircle class="h-4 w-4" />
          <div class="text-xs font-medium">Destructive</div>
        </Stack>
        <hr class="h-px border-0 bg-stone-800" />
      </Stack>
      <Button variant="ghost" class="w-fit text-red-500" onClick={reset}>
        Reset all
      </Button>
    </Stack>
  );
};
