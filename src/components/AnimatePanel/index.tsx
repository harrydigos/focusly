import { useWindowSize } from "@solid-primitives/resize-observer";
import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { Transition } from "solid-transition-group";
import { Position } from "~/types";

type AnimatePosition = Omit<Position, "z">;

type AnimatePanelProps = {
  children: JSX.Element;
  /**
   * @default Menu position (top center)
   */
  from?: AnimatePosition;
  to: AnimatePosition;
};

export const AnimatePanel: Component<AnimatePanelProps> = (props) => {
  const [local, rest] = splitProps(props, ["from", "to"]);

  const winSize = useWindowSize();

  const position = mergeProps(
    {
      from: {
        x: winSize.width / 2,
        y: -86,
      },
    },
    local
  );

  return (
    <Transition
      appear
      mode="outin"
      onEnter={(el, done) => {
        const a = el.animate(
          [
            {
              transform: `translate3d(${position.from.x}px, ${position.from.y}px, 0px)`,
            },
            {
              transform: `translate3d(${position.to.x}px, ${position.to.y}px, 0px)`,
            },
          ],
          {
            duration: 200,
          }
        );
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate(
          [
            {
              transform: `translate3d(${position.to.x}px, ${position.to.y}px, 0px) scale(1)`,
            },
            {
              transform: `translate3d(${position.from.x}px, ${position.from.y}px, 0px) scale(0.5)`,
            },
          ],
          {
            duration: 200,
          }
        );
        a.finished.then(done);
      }}
    >
      {rest.children}
    </Transition>
  );
};
