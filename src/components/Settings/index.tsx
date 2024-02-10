import { Dialog as KobalteDialog } from "@kobalte/core";
import { Component, createSignal } from "solid-js";
import { TbSettings, TbX } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Dialog } from "~/design/Dialog";
import { Stack } from "~/design/Stack";

import { General } from "./General";
import { Customization } from "./Customization";
import { Destructive } from "./Destructive";

export const SettingsDialog: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <KobalteDialog.Root
      open={isOpen()}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Button
        variant="secondary"
        class="h-10 w-10"
        onClick={() => setIsOpen(true)}
      >
        <TbSettings class="h-5 w-5" />
      </Button>
      <Dialog isOpen={isOpen}>
        <Stack direction="flex-col" class="gap-4">
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h1 class="text-lg font-semibold">Settings</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <TbX class="h-4 w-4" />
            </Button>
          </Stack>
          <General />
          <Customization />
          <Destructive />
        </Stack>
      </Dialog>
    </KobalteDialog.Root>
  );
};
