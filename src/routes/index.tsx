import { TbPlanet, TbSettings } from "solid-icons/tb";
import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { A } from "solid-start";
import { Toaster } from "solid-toast";
import { Background } from "~/components/Background";
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
      <Stack direction="flex-col" class="absolute bottom-4 left-4 gap-2">
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
      <p class="absolute bottom-0 right-0 rounded-tl-xl leading-none font-medium px-2 py-1.5 w-fit select-none bg-stone-900 text-xs text-white">
        <span class="text-[10px]">by{" "}</span>
        <A href="https://twitter.com/harry_digos" target="blank" class="hover:underline">
          @harry_digos
        </A>
      </p>
    </main>
  );
}

