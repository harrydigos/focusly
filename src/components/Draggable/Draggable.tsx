import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  useContext,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { makePersisted } from "@solid-primitives/storage";
import { Coordinates } from "~/types";
import { ZOrderContext } from "~/providers";

interface DraggableProps {
  initialKey: string;
  children: JSXElement;
  initialPosition?: Coordinates;
}

export const Draggable: Component<DraggableProps> = (props) => {
  const { zOrder, incrementZ } = useContext(ZOrderContext);
  const [mounted, setMounted] = createSignal(false);

  const { draggable } = createDraggable(); // use:draggable

  const [position, setPosition] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createSignal(props?.initialPosition || { x: 0, y: 0 }),
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
    /* Visible works only for this component, toggling the display of the parent doesn't affect this */
    if (!visible()) {
      setPosition({ x: 0, y: 0, ...props?.initialPosition });
    }
  });

  return (
    <div
      ref={el}
      use:draggable={{
        bounds: "body",
        onDragStart: (data) => {
          incrementZ();
          data.rootNode.style.zIndex = zOrder().toString();
        },
        onDrag: ({ offsetX, offsetY }) => {
          /* To store the position to local storage */
          setPosition({ x: offsetX, y: offsetY });
        },
        position: position(),
      }}
      class="absolute cursor-move"
      classList={{ hidden: !mounted() }}
    >
      {props.children}
    </div>
  );
};
