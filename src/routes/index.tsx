import { TbPlanet, TbSettings } from "solid-icons/tb";
import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { Toaster } from "solid-toast";
import { Background } from "~/components/Background";
import { ConstructionMessage } from "~/components/ConstructionMessage";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
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

const YoutubeProvider = lazy(() =>
  import("~/providers").then((m) => ({ default: m.YoutubeProvider }))
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
            <YoutubeProvider>
              <Panels />
              <Menu />
              <SettingsModal
                isOpen={openSettings}
                setIsOpen={setOpenSettings}
              />
              <SpacesModal isOpen={openSpaces} setIsOpen={setOpenSpaces} />
            </YoutubeProvider>
          </Suspense>
        </PanelProvider>
      </Show>
      <Stack direction="flex-col" class="absolute bottom-4 right-4 gap-2">
        <Button
          variant="secondary"
          class="h-10 w-10"
          onClick={() => setOpenSpaces(true)}
        >
          <TbPlanet class="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          class="h-10 w-10"
          onClick={() => setOpenSettings(true)}
        >
          <TbSettings class="h-5 w-5" />
        </Button>
      </Stack>
    </main>
  );
}
