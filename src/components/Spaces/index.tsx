import { Accessor, Component, For, Setter, Show } from "solid-js";
import { Dialog } from "@ark-ui/solid";
import { TbCheck, TbX } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { SPACES, useSpace } from "~/stores/spaces";

interface SpacesModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const SpacesModal: Component<SpacesModalProps> = (props) => {
  const { space, updateSpace } = useSpace();

  return (
    <Dialog open={props.isOpen()} onClose={() => props.setIsOpen(false)}>
      <Modal isOpen={props.isOpen}>
        <Stack direction="flex-col" class="gap-4">
          <Stack
            direction="flex-row"
            class="w-full items-center justify-between"
          >
            <h1 class="text-lg font-semibold">Spaces</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => props.setIsOpen(false)}
            >
              <TbX class="h-4 w-4" />
            </Button>
          </Stack>
          <div class="grid grid-cols-2 gap-4">
            <For each={SPACES}>
              {(s) => (
                <div class="relative">
                  <img
                    src={`images/${s.value}.png`}
                    class="object-fit rounded-xl"
                    classList={{
                      "border-2 border-stone-50": s.value === space.value,
                      "border-2 border-transparent": s.value !== space.value,
                    }}
                    onClick={() => updateSpace(s)}
                  />
                  <Show when={s.value === space.value}>
                    <TbCheck class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 stroke-stone-50/75" />
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Stack>
      </Modal>
    </Dialog>
  );
};
