import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTrigger,
} from "@ark-ui/solid";
import { Component, JSX, Show, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion, Presence } from "@motionone/solid";
import { getBiggestZ } from "~/stores/MenuTabsStore";
import { Stack } from "../Stack";
import { TbSquareX, TbX } from "solid-icons/tb";

interface ModalProps {
  title: string;
  trigger: () => JSX.Element;
  children: JSX.Element;
}

export const Modal: Component<ModalProps> = (modalProps) => {
  const zIndex = createMemo(() => getBiggestZ() + 1000); // You never know

  return (
    <Dialog>
      {(props) => (
        <>
          <DialogTrigger>
            <modalProps.trigger />
          </DialogTrigger>
          <Portal>
            <Presence exitBeforeEnter>
              <Show when={props().isOpen}>
                <Motion.div
                  animate={{
                    opacity: [0, 1],
                  }}
                  exit={{
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <DialogBackdrop
                    class="fixed inset-0 bg-black/50"
                    style={{
                      "z-index": zIndex(),
                    }}
                  />
                  <Motion.div
                    class="fixed inset-0"
                    style={{
                      "z-index": zIndex(),
                    }}
                    animate={{
                      transform: [
                        "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
                        "translateY(0) scaleY(1) scaleX(1)",
                      ],
                      transformOrigin: ["50% 0%", "50% 50%"],
                      filter: ["blur(40px)", "blur(0)"],
                    }}
                    exit={{
                      transform: [
                        "translateY(0) scaleY(1) scaleX(1)",
                        "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
                      ],
                      transformOrigin: ["50% 50%", "50% 0%"],
                      filter: ["blur(0)", "blur(40px)"],
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <DialogContainer class="flex h-full w-full items-center justify-center">
                      <DialogContent class="flex flex-col rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-90 p-6 text-white backdrop-blur-xl backdrop-filter">
                        <Stack
                          direction="flex-row"
                          class="items-center justify-between"
                        >
                          <h1 class="text-lg font-medium">
                            {modalProps.title}
                          </h1>
                          <DialogCloseTrigger>
                            <TbX class="h-6 w-6 cursor-pointer" />
                          </DialogCloseTrigger>
                        </Stack>
                        {modalProps.children}
                      </DialogContent>
                    </DialogContainer>
                  </Motion.div>
                </Motion.div>
              </Show>
            </Presence>
          </Portal>
        </>
      )}
    </Dialog>
  );
};
