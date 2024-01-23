import { useWindowSize } from "@solid-primitives/resize-observer";
import { Component, JSX, createMemo, splitProps } from "solid-js";
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

  const position = createMemo(() => {
    const from = local.from ?? {
      x: winSize.width / 2,
      y: 0,
    };

    return {
      from,
      to: local.to,
    };
  });

  const getAnimations = ({ width, height }: DOMRect) => {
    return [
      {
        transform: `translate3d(${position().from.x - width / 2}px, ${position().from.y - height / 2
          }px, 0px) scale(0)`,
      },
      {
        transform: `translate3d(${position().to.x}px, ${position().to.y
          }px, 0px) scale(1)`,
      },
    ];
  };

  const onEnter = (el: Element, done: () => void) => {
    const a = el.animate(getAnimations(el.getBoundingClientRect()), {
      duration: 200,
    });
    a.finished.then(done);
  };

  const onExit = (el: Element, done: () => void) => {
    const a = el.animate(getAnimations(el.getBoundingClientRect()).reverse(), {
      duration: 200,
    });
    a.finished.then(done);
  };

  return (
    <Transition appear mode="outin" onEnter={onEnter} onExit={onExit}>
      {rest.children}
    </Transition>
  );
};
