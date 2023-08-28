import { TbSettings } from "solid-icons/tb";
import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { Toaster } from "solid-toast";
import { LofiGirl } from "~/components/Backgrounds";
import { Button } from "~/design/Button";
import { PanelProvider } from "~/providers";

const Menu = lazy(() =>
  import("~/components/Menu").then((m) => ({ default: m.Menu }))
);

const Panels = lazy(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels }))
);

const SettingsModal = lazy(() =>
  import("~/components/Settings").then((m) => ({ default: m.SettingsModal }))
);

export default function App() {
  const [isMounted, setIsMounted] = createSignal(false);
  const [openSettings, setOpenSettings] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <main class="screen">
      <Toaster
        position="top-right"
        containerStyle={{
          "z-index": "2147483647",
        }}
      />
      <LofiGirl />
      <Show when={isMounted()}>
        <PanelProvider>
          <Suspense>
            <Panels />
            <Menu />
            <SettingsModal isOpen={openSettings} setIsOpen={setOpenSettings} />
          </Suspense>
        </PanelProvider>
      </Show>
      <div class="absolute bottom-4 right-4">
        <Button variant="secondary" onClick={() => setOpenSettings(true)}>
          <TbSettings class="h-4 w-4" />
          Settings
        </Button>
      </div>
    </main>
  );
}
