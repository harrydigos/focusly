import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { Toaster } from "solid-toast";
import { LofiGirl } from "~/components/Backgrounds";
import { ConstructionMessage } from "~/components/ConstructionMessage";
import { PanelProvider } from "~/providers";

const Menu = lazy(() =>
  import("~/components/Menu").then((m) => ({ default: m.Menu }))
);

const Panels = lazy(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels }))
);

export default function App() {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <main class="screen">
      <Toaster
        position="bottom-right"
        containerStyle={{
          "z-index": "2147483647",
        }}
      />
      <LofiGirl />
      <ConstructionMessage />
      <Show when={isMounted()}>
        <PanelProvider>
          <Suspense>
            <Panels />
            <Menu />
          </Suspense>
        </PanelProvider>
      </Show>
    </main>
  );
}
