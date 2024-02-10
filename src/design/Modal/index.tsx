import { DialogBackdrop, DialogContent, DialogPositioner } from "@ark-ui/solid";
import { Accessor, Component, JSX, Show, children, untrack } from "solid-js";
import { Portal } from "solid-js/web";
import { Transition } from "solid-transition-group";

interface ModalProps {
  isOpen: Accessor<boolean>;
  children: JSX.Element;
}

const backdropAnim = () => [{ opacity: 0 }, { opacity: 1 }];
const dialogAnim = () => [
  {
    transform: "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
    transformOrigin: "50% 0%",
    filter: "blur(40px)",
    opacity: 0,
  },
  {
    transform: "translateY(0) scaleY(1) scaleX(1)",
    transformOrigin: "50% 50%",
    filter: "blur(0)",
    opacity: 1,
  },
];

export const Modal: Component<ModalProps> = (props) => {
  return (
    <>
      {untrack(() => {
        const content = children(() => (
          <>
            <Transition
              onEnter={(el, done) => {
                const a = el.animate(backdropAnim(), {
                  duration: 150,
                });
                a.finished.then(done);
              }}
              onExit={(el, done) => {
                const a = el.animate(backdropAnim().reverse(), {
                  duration: 150,
                });
                a.finished.then(done);
              }}
            >
              <Show when={props.isOpen()}>
                {/* Max zIndex ends in 47, Modal ends in 46 to display Toasts in front */}
                <DialogBackdrop
                  class="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-filter"
                  style={{
                    "z-index": 2147483646,
                  }}
                />
              </Show>
            </Transition>

            <Transition
              onEnter={(el, done) => {
                const a = el.animate(dialogAnim(), {
                  duration: 250,
                });
                a.finished.then(done);
              }}
              onExit={(el, done) => {
                const a = el.animate(dialogAnim().reverse(), {
                  duration: 150,
                });
                a.finished.then(done);
              }}
            >
              <Show when={props.isOpen()}>
                <DialogPositioner
                  class="fixed inset-0 flex h-full w-full items-center justify-center"
                  style={{
                    "z-index": 2147483646,
                  }}
                >
                  <DialogContent class="mx-2 flex w-96 flex-col rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-90 p-6 text-white backdrop-blur-xl backdrop-filter">
                    {props.children}
                  </DialogContent>
                </DialogPositioner>
              </Show>
            </Transition>
          </>
        ));

        return (
          <Show when={content.toArray().length}>
            <Portal>{content()}</Portal>
          </Show>
        );
      })}
    </>
  );
};
