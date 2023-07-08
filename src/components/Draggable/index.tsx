import { Component, createEffect, JSXElement } from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

import { getBiggestZ, setMenuTabs } from "~/stores/MenuTabsStore";
import { MenuKey, Position } from "~/types";

interface DraggableProps {
  key: MenuKey;
  position: Position;
  children: JSXElement;
}

export const Draggable: Component<DraggableProps> = (props) => {
  const { draggable } = createDraggable(); // use:draggable

  let el: HTMLDivElement | undefined;
  const visible = createVisibilityObserver({
    threshold: 0.8,
    initialValue: true,
  })(() => el);

  /* Handle element's position when not visible */
  createEffect(() => {
    /* Visible works only for this component, toggling the display of the parent doesn't affect this */
    if (!visible()) {
      setMenuTabs(props.key, (prev) => ({
        isOpen: false,
        position: {
          x: 0,
          y: 0,
          z: prev.position.z,
        },
      }));
    }
  });

  return (
    <div
      ref={el}
      use:draggable={{
        bounds: "body",
        onDragStart: () => {
          setMenuTabs(props.key, "position", "z", () => getBiggestZ() + 1);
        },
        onDrag: ({ offsetX, offsetY }) => {
          /* To store the position to local storage */
          setMenuTabs(props.key, "position", (prev) => ({
            ...prev,
            x: offsetX,
            y: offsetY,
          }));
        },
        position: props.position,
      }}
      class="absolute cursor-move"
      style={{
        "z-index": props.position.z,
      }}
    >
      {props.children}
    </div>
  );
};
