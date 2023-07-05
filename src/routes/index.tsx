import { createSignal } from "solid-js";
import { LofiGirl } from "~/components/Backgrounds";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";

export default function Home() {
  const [zOrder, setZOrder] = createSignal(0);

  return (
    <main class="h-screen w-screen overflow-hidden relative text-stone-100">
      <LofiGirl />
      <Draggable
        initialKey={1}
        initialPosition={{ x: 100, y: 100 }}
        zOrder={zOrder}
        setZOrder={setZOrder}
      >
        <GlassBox direction="flex-col">
          <div>Notes</div>
        </GlassBox>
      </Draggable>
    </main>
  );
}
