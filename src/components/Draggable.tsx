import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

export const Draggable: Component<{
  index: Accessor<number>;
  zOrder: Accessor<number>;
  setZOrder: Setter<number>;
}> = ({ index, zOrder, setZOrder }) => {
  const { draggable } = createDraggable();
  const [position, setPosition] = createSignal({
    x: 0,
    y: 100 * index(),
    z: zOrder(),
  });

  let el: HTMLDivElement | undefined;
  const visible = createVisibilityObserver({ threshold: 0.8 })(() => el);

  createEffect(() => {
    if (!visible()) {
      setPosition({
        x: 0,
        y: 100 * index(),
        z: zOrder(),
      });
    }
  });

  return (
    <div
      ref={el}
      use:draggable={{
        bounds: "body",
        onDragStart: () => {
          setZOrder((prev) => ++prev);
          setPosition((prev) => ({ ...prev, z: zOrder() }));
        },
        onDrag: ({ offsetX, offsetY }) => {
          setPosition((prev) => ({ ...prev, x: offsetX, y: offsetY }));
        },
        position: position(),
        cancel: ".cancel",
      }}
      class="absolute h-20 w-96 cursor-move rounded-lg border border-zinc-200 bg-white"
      style={{
        /* Neodrag can't update the z-index on drag, so we have to do it manually */
        "z-index": position().z,
      }}
    >
      <div class="cancel w-fit cursor-auto bg-zinc-200">
        <span class="text-xs font-light">Not draggable</span>
        <p>Dragbox</p>
      </div>
    </div>
  );
};
