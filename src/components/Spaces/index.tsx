import { Dialog as KobalteDialog } from "@kobalte/core";
import { Component, For, Show, createSignal } from "solid-js";
import { TbCheck, TbPlanet, TbX } from "solid-icons/tb";

import { SPACES } from "~/config";
import { Button } from "~/design/Button";
import { Dialog } from "~/design/Dialog";
import { Stack } from "~/design/Stack";
import { useSpace } from "~/stores";

export const SpacesDialog: Component = () => {
  const { space: currentSpace, setSpace } = useSpace();
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
        <TbPlanet class="h-5 w-5" />
      </Button>
      <Dialog isOpen={isOpen}>
        <Stack direction="flex-col" class="gap-4">
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h1 class="text-lg font-semibold">Spaces</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <TbX class="h-4 w-4" />
            </Button>
          </Stack>
          <div class="grid grid-cols-2 gap-4">
            <For each={SPACES}>
              {(space) => (
                <div class="relative">
                  <img
                    src={`images/${space}.png`}
                    class="object-fit rounded-xl"
                    classList={{
                      "border-2 border-stone-50": space === currentSpace(),
                      "border-2 border-transparent": space !== currentSpace(),
                    }}
                    onClick={() => setSpace(space)}
                  />
                  <Show when={space === currentSpace()}>
                    <TbCheck class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 stroke-stone-50/75" />
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Stack>
      </Dialog>
    </KobalteDialog.Root>
  );
};
