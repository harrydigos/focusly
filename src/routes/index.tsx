import { TbPlanet, TbSettings } from "solid-icons/tb";
import { createSignal } from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";
import { parseCookies } from "vinxi/server";
import { clientOnly } from "@solidjs/start";
import { Background } from "~/components/Background";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import { Space, useSpace } from "~/stores/spaces";

const Menu = clientOnly(() =>
  import("~/components/Menu").then((m) => ({ default: m.Menu }))
);

const Panels = clientOnly(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels }))
);

const SettingsModal = clientOnly(() =>
  import("~/components/Settings").then((m) => ({ default: m.SettingsModal }))
);

const SpacesModal = clientOnly(() =>
  import("~/components/Spaces").then((m) => ({ default: m.SpacesModal }))
);

const getSpaceCookie = (): Space => {
  "use server";

  const event = getRequestEvent();

  if (!event) {
    throw new Error("No request event found");
  }

  const parsedCookies = parseCookies(event);
  const spaceCookie = parsedCookies["focusly_space"];

  return spaceCookie ? (spaceCookie as Space) : "lofi_girl";
};

export default function Home() {
  const [openSettings, setOpenSettings] = createSignal(false);
  const [openSpaces, setOpenSpaces] = createSignal(false);
  const { setSpace } = useSpace();

  if (isServer) {
    setSpace(getSpaceCookie());
  }

  return (
    <main class="screen">
      <Background />

      <Panels />
      <Menu />
      <SettingsModal isOpen={openSettings} setIsOpen={setOpenSettings} />
      <SpacesModal isOpen={openSpaces} setIsOpen={setOpenSpaces} />

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

      <p class="absolute bottom-0 right-0 w-fit select-none rounded-tl-xl bg-stone-900 px-2 py-1.5 text-xs font-medium leading-none text-white">
        <span class="text-[10px]">by </span>
        <a
          href="https://twitter.com/harry_digos"
          target="blank"
          class="hover:underline"
        >
          @harry_digos
        </a>
      </p>
    </main>
  );
}
