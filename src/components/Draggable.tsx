import { Accessor, Component, createSignal, Setter } from "solid-js";
import { createDraggable } from "@neodrag/solid";

export const Draggable: Component<{
  index: Accessor<number>;
  zOrder: Accessor<number>;
  setZOrder: Setter<number>;
}> = ({ index, zOrder, setZOrder }) => {
  const { draggable } = createDraggable();
  const [zIndex, setZIndex] = createSignal(zOrder());

  return (
    <div
      use:draggable={{
        bounds: "body",
        onDragStart: () => {
          setZOrder((prev) => ++prev);
          setZIndex(zOrder());
        },
        position: {
          x: 0 * index(),
          y: 100 * index(),
        },
      }}
      class="absolute h-20 w-96 rounded-lg border border-zinc-200 bg-white"
      style={{
        "z-index": zIndex(),
      }}
    >
      Dragbox with index: {zIndex()}
    </div>
  );
};
