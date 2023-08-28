import { Dialog } from "@ark-ui/solid";
import { TbX } from "solid-icons/tb";
import { Accessor, Component, Setter } from "solid-js";
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
        <Stack direction="flex-row" class="w-full items-center justify-between">
          <h1 class="text-lg font-semibold">Settings</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => props.setIsOpen(false)}
          >
            <TbX class="h-4 w-4" />
          </Button>
        </Stack>
      </Modal>
    </Dialog>
  );
};
