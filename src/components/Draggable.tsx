import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  Setter,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { makePersisted } from "@solid-primitives/storage";
import { Coordinates } from "~/types";

interface DraggableProps {
  initialKey: number; // Unique key for local storage
  initialPosition: Coordinates;
  zOrder: Accessor<number>;
  setZOrder: Setter<number>;
  children: JSXElement;
}

export const Draggable: Component<DraggableProps> = (props) => {
  const { draggable } = createDraggable(); // use:draggable
  const [mounted, setMounted] = createSignal(false);

  const [position, setPosition] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createSignal(props.initialPosition),
    { name: `draggable-${props.initialKey}` }
  );

  let el: HTMLDivElement | undefined;
  const visible = createVisibilityObserver({
    threshold: 0.8,
    initialValue: true,
  })(() => el);

  onMount(() => setMounted(true));

  /* Handle element's position when not visible */
  createEffect(() => {
    if (!visible()) {
      setPosition({ ...props.initialPosition });
    }
  });

  return (
    <div
      ref={el}
      use:draggable={{
        bounds: "body",
        onDragStart: (data) => {
          props.setZOrder((prev) => ++prev);
          data.rootNode.style.zIndex = props.zOrder().toString();
        },
        onDrag: ({ offsetX, offsetY }) => {
          /* To store the position to local storage */
          setPosition({ x: offsetX, y: offsetY });
        },
        position: position(),
      }}
      class="absolute cursor-move rounded-lg border border-black border-opacity-10 bg-black bg-opacity-40 p-6 text-white shadow-md backdrop-blur-md backdrop-filter transition-opacity"
      classList={{ "opacity-0": !mounted(), "opacity-100": mounted() }}
    >
      {props.children}
    </div>
  );
};
