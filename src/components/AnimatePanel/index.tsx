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
    const centerFrom = {
      x: (position().from.x + width) / 2,
      y: (position().from.y + height) / 2,
    };

    const centerTo = {
      x: (position().to.x + width) / 2,
      y: (position().to.y + height) / 2,
    };

    const duration = Math.sqrt(
      Math.pow(centerFrom.x - centerTo.x, 2) +
      Math.pow(centerFrom.y - centerTo.y, 2)
    );

    return {
      animation: [
        {
          transform: `translate3d(${position().from.x - width / 2}px, ${position().from.y - height / 2
            }px, 0px) scale(0)`,
        },
        {
          transform: `translate3d(${position().to.x}px, ${position().to.y
            }px, 0px) scale(1)`,
        },
      ],
      duration: Math.min(duration * 0.5 + 150, 500),
    };
  };

  const onEnter = (el: Element, done: () => void) => {
    const { animation, duration } = getAnimations(el.getBoundingClientRect());
    const a = el.animate(animation, {
      duration,
      easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
    });
    a.finished.then(done);
  };

  const onExit = (el: Element, done: () => void) => {
    const { animation, duration } = getAnimations(el.getBoundingClientRect());
    const a = el.animate(animation.reverse(), {
      duration,
      easing: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    });
    a.finished.then(done);
  };

  return (
    <Transition appear mode="outin" onEnter={onEnter} onExit={onExit}>
      {rest.children}
    </Transition>
  );
};
