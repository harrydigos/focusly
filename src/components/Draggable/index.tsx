import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  JSXElement,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { SetStoreFunction } from "solid-js/store";

import { getBiggestZ } from "~/stores/MenuTabsStore";
import { Note, Tab, XOR } from "~/types";

type DraggableProps = {
  tab: Tab;
  children: JSXElement;
  disabled?: boolean;
} & XOR<
  {
    setTab: SetStoreFunction<Tab>;
  },
  {
    setNotes: SetStoreFunction<Note[]>;
    index: Accessor<number>;
  }
>;

export const Draggable: Component<DraggableProps> = (props) => {
  const { draggable } = createDraggable(); // use:draggable
  const [isDragging, setIsDragging] = createSignal(false);

  let el: HTMLDivElement | undefined;
  const visible = createVisibilityObserver({
    threshold: 0.8,
    initialValue: true,
  })(() => el);

  /* Handle element's position when not visible */
  createEffect(() => {
    /* Visible works only for this component, toggling the display of the parent doesn't affect this */
    if (!visible()) {
      // isOpen: false, // TODO: Fix visibility when resizing. (Issue: On mobile, when focusing input using Brave, the vh changes)
      if (props.setTab) {
        props.setTab("position", "x", 0);
        props.setTab("position", "y", 0);
      } else {
        props.setNotes(props.index(), "position", "x", 0);
        props.setNotes(props.index(), "position", "y", 0);
      }
    }
  });

  return (
    <div
      ref={el}
      use:draggable={{
        bounds: "body",
        onDragStart: () => {
          setIsDragging(true);
          if (props.setTab) {
            props.setTab("position", "z", () => getBiggestZ() + 1);
          } else {
            props.setNotes(
              props.index(),
              "position",
              "z",
              () => getBiggestZ() + 1
            );
          }
        },
        onDrag: ({ offsetX, offsetY }) => {
          /* To store the position to local storage */
          if (props.setTab) {
            props.setTab("position", "x", offsetX);
            props.setTab("position", "y", offsetY);
          } else {
            props.setNotes(props.index(), "position", "x", offsetX);
            props.setNotes(props.index(), "position", "y", offsetY);
          }
        },
        onDragEnd: () => {
          setIsDragging(false);
        },
        position: props.tab.position,
        disabled: props.disabled,
      }}
      class="absolute"
      classList={{
        "cursor-grab": !isDragging(),
        "cursor-grabbing": isDragging(),
        "cursor-default": props.disabled,
      }}
      style={{
        "z-index": props.tab.position.z,
      }}
    >
      {props.children}
    </div>
  );
};
