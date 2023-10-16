import { TbPlanet, TbSettings } from "solid-icons/tb";
import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { Toaster } from "solid-toast";
import { Background } from "~/components/Background";
import { ConstructionMessage } from "~/components/ConstructionMessage";
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

const SpacesModal = lazy(() =>
  import("~/components/Spaces").then((m) => ({ default: m.SpacesModal }))
);

export default function App() {
  const [isMounted, setIsMounted] = createSignal(false);
  const [openSettings, setOpenSettings] = createSignal(false);
  const [openSpaces, setOpenSpaces] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <main class="screen">
      <Toaster
        position="top-right"
        containerStyle={{
          "z-index": "2147483647",
        }}
      />
      <Background />
      <ConstructionMessage />
      <Show when={isMounted()}>
        <PanelProvider>
          <Suspense>
            <Panels />
            <Menu />
            <SettingsModal isOpen={openSettings} setIsOpen={setOpenSettings} />
            <SpacesModal isOpen={openSpaces} setIsOpen={setOpenSpaces} />
          </Suspense>
        </PanelProvider>
      </Show>
      <Button
        variant="secondary"
        onClick={() => setOpenSpaces(true)}
        class="absolute bottom-16 right-4"
      >
        <TbPlanet class="h-4 w-4" />
        Spaces
      </Button>
      <Button
        variant="secondary"
        onClick={() => setOpenSettings(true)}
        class="absolute bottom-4 right-4"
      >
        <TbSettings class="h-4 w-4" />
        Settings
      </Button>
    </main>
  );
}
