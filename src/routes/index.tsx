import { createSignal, For } from "solid-js";
import { Draggable } from "~/components/Draggable";

export default function Home() {
  const [zOrder, setZOrder] = createSignal(0);

  return (
    <main class="text-center h-screen w-screen mx-auto text-gray-700 p-4">
      <For each={Array(5).fill(0)}>
        {(_, i) => (
          <Draggable index={i} zOrder={zOrder} setZOrder={setZOrder} />
        )}
      </For>
    </main>
  );
}
