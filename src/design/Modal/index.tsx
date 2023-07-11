import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTrigger,
} from "@ark-ui/solid";
import { Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";

interface ModalProps {
  trigger: () => JSX.Element;
  children: JSX.Element;
}

export const Modal: Component<ModalProps> = (modalProps) => {
  return (
    <Dialog>
      {(props) => (
        <>
          <DialogTrigger>
            <modalProps.trigger />
          </DialogTrigger>
          <Portal>
            <DialogBackdrop class="z-[100000] fixed inset-0 bg-black/50" />
            <DialogContainer class="z-[100000] fixed inset-0 flex justify-center items-center">
              <DialogContent class="bg-white text-black">
                {modalProps.children}
                <DialogCloseTrigger>
                  <button>Close</button>
                </DialogCloseTrigger>
              </DialogContent>
            </DialogContainer>
          </Portal>
        </>
      )}
    </Dialog>
  );
};
