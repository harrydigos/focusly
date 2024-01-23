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

import {
  Slider,
  SliderControl,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@ark-ui/solid";

import { usePanelContext, useYoutubeContext } from "~/providers";
import { AnimatePanel } from "~/components/AnimatePanel";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";

export const YoutubePlayer: Component = () => {
  const { music, setMusic } = usePanelContext();
  const { volume, setVolume, isMuted, toggleMute } = useYoutubeContext();

  return (
    <AnimatePanel to={music.position}>
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
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[volume()]}
                  onValueChange={({ value }) => setVolume(value[0])}
                  class="w-24"
                >
                  <SliderControl class="relative flex h-6 w-full items-center">
                    <SliderTrack class="h-1 w-full rounded-full bg-stone-900">
                      <SliderRange class="h-1 rounded-full bg-white" />
                    </SliderTrack>
                    <SliderThumb class="h-3 w-3 rounded-full bg-white" />
                  </SliderControl>
                </Slider>
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
