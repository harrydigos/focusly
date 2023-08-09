import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { Background } from "~/components/Background";
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
      <ConstructionMessage />
      <Show when={isMounted()}>
        <PanelProvider>
          <Background />
          <Suspense>
            <Panels />
            <Menu />
          </Suspense>
        </PanelProvider>
      </Show>
    </main>
  );
}
