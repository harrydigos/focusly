import { For, Show } from "solid-js";
import { LofiGirl } from "~/components/Backgrounds";
import { Draggable } from "~/components/Draggable";
import { Menu } from "~/components/Menu";
import { GlassBox } from "~/design/GlassBox";
import { ZOrderProvider } from "~/providers";
import { menuTabsStore } from "~/stores/MenuTabsStore";

export default function Home() {
  return (
    <main class="h-screen w-screen overflow-hidden relative text-stone-100">
      <LofiGirl />
      <Menu />

      <ZOrderProvider>
        <For each={Object.entries(menuTabsStore)}>
          {([key, value]) => (
            <Show when={value.isOpen}>
              <Draggable initialKey={key}>
                <GlassBox direction="flex-col">{value.label}</GlassBox>
              </Draggable>
            </Show>
          )}
        </For>
      </ZOrderProvider>
    </main>
  );
}
