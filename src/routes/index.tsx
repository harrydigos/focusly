import { createSignal } from "solid-js";
import { LofiGirl } from "~/components/backgrounds/LofiGirl";
import { Draggable } from "~/components/Draggable";

export default function Home() {
  const [zOrder, setZOrder] = createSignal(0);

  return (
    <main class="h-screen w-screen overflow-hidden relative text-stone-100">
      <LofiGirl />
      <Draggable
        initialKey={0}
        initialPosition={{ x: 100, y: 100 }}
        zOrder={zOrder}
        setZOrder={setZOrder}
      >
        <h1 class="font-semibold text-lg">Todos</h1>
      </Draggable>
      <Draggable
        initialKey={1}
        initialPosition={{ x: 100, y: 100 }}
        zOrder={zOrder}
        setZOrder={setZOrder}
      >
        <h1 class="font-semibold text-lg">
          <div class="w-60 h-60">Notes</div>
        </h1>
      </Draggable>
    </main>
  );
}
