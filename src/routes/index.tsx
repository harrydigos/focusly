import { createSignal, Suspense } from "solid-js";
import { LofiGirl } from "~/components/backgrounds/LofiGirl";
import { Draggable } from "~/components/Draggable";

export default function Home() {
  const [zOrder, setZOrder] = createSignal(0);

  return (
    <main class="h-screen w-screen overflow-hidden relative">
      <LofiGirl />
      <Suspense>
        <Draggable
          index={0}
          initialPosition={{ x: 100, y: 100, z: zOrder() }}
          zOrder={zOrder}
          setZOrder={setZOrder}
        >
          <h1 class="font-semibold text-lg">Todos</h1>
        </Draggable>
        <Draggable
          index={1}
          initialPosition={{ x: 100, y: 100, z: zOrder() }}
          zOrder={zOrder}
          setZOrder={setZOrder}
        >
          <h1 class="font-semibold text-lg">Notes</h1>
        </Draggable>
      </Suspense>
    </main>
  );
}
