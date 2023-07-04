import { createSignal, For } from "solid-js";
import { LofiGirl } from "~/components/backgrounds/LofiGirl";
import { Draggable } from "~/components/Draggable";

export default function Home() {
  const [zOrder, setZOrder] = createSignal(0);

  return (
    <main class="h-screen w-screen overflow-hidden relative">
      <LofiGirl />
      <For each={Array(5).fill(0)}>
        {(_, i) => (
          <Draggable index={i} zOrder={zOrder} setZOrder={setZOrder} />
        )}
      </For>
    </main>
  );
}
