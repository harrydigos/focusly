import { Component, Match, Show, Switch } from "solid-js";
import {
  TbAccessPoint,
  TbLoader,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbVolume,
  TbVolume2,
  TbVolume3,
} from "solid-icons/tb";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { Slider } from "@kobalte/core";
import { useWindowSize } from "@solid-primitives/resize-observer";

import {
  useCursorPositionContext,
  usePanelContext,
  useYoutubeContext,
} from "~/providers";
import { AnimatePanel } from "~/components/AnimatePanel";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";

export const YoutubePlayer: Component = () => {
  const { music, setMusic } = usePanelContext();
  const { cursorPosition } = useCursorPositionContext();
  const windowSize = useWindowSize();
  const { volume, setVolume, isMuted, toggleMute } = useYoutubeContext();

  const initialPosition = {
    x: windowSize.width / 2,
    y: 40,
  };

  return (
    <AnimatePanel
      from={cursorPosition() ?? initialPosition}
      to={music.position}
    >
      <Show when={music.isOpen}>
        <Draggable tab={music} setTab={setMusic}>
          <GlassBox
            direction="flex-col"
            class="max-h-[500px] w-[340px] gap-4 sm:w-[440px]"
          >
            <Stack
              direction="flex-row"
              class="select-none items-center justify-between"
            >
              <h1 class="text-xl font-semibold">Music</h1>
            </Stack>
            <Stack
              direction="flex-row"
              class="items-center justify-between gap-2"
            >
              <Stack direction="flex-row" class="items-center gap-2">
                <PlayButton />
                <Stack direction="flex-row" class="h-8 items-center gap-1">
                  <h3 class="relative select-none text-sm font-normal">
                    Lofi Hip Hop
                  </h3>
                  <TbAccessPoint class="stroke-red-500" />
                </Stack>
              </Stack>
              <Stack direction="flex-row" class="items-center gap-1">
                <Button variant="outline" size="icon" onClick={toggleMute}>
                  <Show
                    when={!isMuted() && volume() > 0}
                    fallback={<TbVolume3 />}
                  >
                    <Show when={volume() >= 50} fallback={<TbVolume2 />}>
                      <TbVolume />
                    </Show>
                  </Show>
                </Button>
                <Slider.Root
                  value={[volume()]}
                  onChange={setVolume}
                  step={1}
                  class="relative flex h-6 w-24 select-none items-center"
                >
                  <Slider.Track class="relative h-1.5 w-full rounded-full bg-stone-900">
                    <Slider.Fill class="absolute h-full rounded-full bg-white" />
                    <Slider.Thumb class="-top-[3px] h-3 w-3 rounded-full bg-white hover:ring hover:ring-white/30 focus-visible:outline-none focus-visible:ring focus-visible:ring-white/30">
                      <Slider.Input />
                    </Slider.Thumb>
                  </Slider.Track>
                </Slider.Root>
              </Stack>
            </Stack>
          </GlassBox>
        </Draggable>
      </Show>
    </AnimatePanel>
  );
};

const PlayButton: Component = () => {
  const { player, playerState } = useYoutubeContext();

  return (
    <Switch
      fallback={
        <Button size="icon" disabled>
          <TbLoader class="animate-spin" />
        </Button>
      }
    >
      <Match
        when={
          playerState() === PlayerStates.VIDEO_CUED ||
          playerState() === PlayerStates.PAUSED
        }
      >
        <Button size="icon" onClick={() => player()?.playVideo()}>
          <TbPlayerPlayFilled />
        </Button>
      </Match>
      <Match when={playerState() === PlayerStates.PLAYING}>
        <Button size="icon" onClick={() => player()?.pauseVideo()}>
          <TbPlayerPauseFilled />
        </Button>
      </Match>
    </Switch>
  );
};
