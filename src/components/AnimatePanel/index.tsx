import { useWindowSize } from "@solid-primitives/resize-observer";
import { Component, JSX } from "solid-js";
import { Transition } from "solid-transition-group";
import { Position } from "~/types";

type AnimatePanelProps = {
  children: JSX.Element;
  position: Position;
};

export const AnimatePanel: Component<AnimatePanelProps> = (props) => {
  const winSize = useWindowSize();

  return (
    <Transition
      appear
      mode="outin"
      onEnter={(el, done) => {
        const initialPosition = winSize.width / 2; //+ Number() / 2;
        console.log({ initialPosition });
        const a = el.animate(
          [
            {
              transform: `translate3d(${initialPosition}px, -100px, 0px)`,
              scale: 0.5,
            },
            {
              transform: `translate3d(${props.position.x}px, ${props.position.y}px, 0px)`,
              scale: 1,
            },
          ],
          {
            duration: 200,
          }
        );
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const initialPosition = winSize.width / 2; //+ Number() / 2;
        const a = el.animate(
          [
            {
              transform: `translate3d(${props.position.x}px, ${props.position.y}px, 0px)`,
              scale: 1,
            },
            {
              transform: `translate3d(${initialPosition}px, -86px, 0px)`,
              scale: 0.5,
            },
          ],
          {
            duration: 200,
          }
        );
        a.finished.then(done);
      }}
    >
      {props.children}
    </Transition>
  );
};
