import { DialogBackdrop, DialogContainer, DialogContent } from "@ark-ui/solid";
import { Accessor, Component, JSX, Show, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion, Presence } from "@motionone/solid";
import { usePanelContext } from "~/providers";

interface ModalProps {
  isOpen: Accessor<boolean>;
  children: JSX.Element;
}

export const Modal: Component<ModalProps> = (props) => {
  const { getBiggestZ } = usePanelContext();
  const zIndex = createMemo(() => getBiggestZ() + 1000); // You never know

  return (
    <Portal>
      <Presence exitBeforeEnter>
        <Show when={props.isOpen()}>
          <Motion.div
            animate={{
              opacity: [0, 1],
            }}
            exit={{
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.15,
            }}
          >
            <DialogBackdrop
              class="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-filter"
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
                <DialogContent class="mx-2 flex w-96 flex-col rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-90 p-6 text-white backdrop-blur-xl backdrop-filter">
                  {props.children}
                </DialogContent>
              </DialogContainer>
            </Motion.div>
          </Motion.div>
        </Show>
      </Presence>
    </Portal>
  );
};
