import { LofiGirl } from "~/components/Backgrounds";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { ZOrderProvider } from "~/providers";

export default function Home() {
  return (
    <main class="h-screen w-screen overflow-hidden relative text-stone-100">
      <LofiGirl />
      <ZOrderProvider>
        <Draggable>
          <GlassBox direction="flex-col">
            <div>Tasks</div>
          </GlassBox>
        </Draggable>
        <Draggable>
          <GlassBox direction="flex-col">
            <div>Notes</div>
          </GlassBox>
        </Draggable>
        <Draggable>
          <GlassBox direction="flex-col">
            <div>Pomo</div>
          </GlassBox>
        </Draggable>
      </ZOrderProvider>
    </main>
  );
}
