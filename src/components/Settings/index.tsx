import { Accessor, Component, Setter } from "solid-js";
import { Dialog } from "@ark-ui/solid";
import { TbX } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";

import { General } from "./General";
import { Customization } from "./Customization";
import { Destructive } from "./Destructive";

interface SettingsModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const SettingsModal: Component<SettingsModalProps> = (props) => {
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
          <General />
          <Customization />
          <Destructive />
        </Stack>
      </Modal>
    </Dialog>
  );
};
