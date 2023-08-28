import {
  Component,
  Match,
  Show,
  Switch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import {
  TbAccessPoint,
  TbLoader,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbVolume,
  TbVolume2,
  TbVolume3,
} from "solid-icons/tb";

import YoutubeFactory from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";

import {
  Slider,
  SliderControl,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@ark-ui/solid";

import { usePanelContext } from "~/providers";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";

export const YoutubePlayer: Component = () => {
  const { music, setMusic } = usePanelContext();

  const [container, setContainer] = createSignal<HTMLDivElement>();
  const [player, setPlayer] = createSignal<YouTubePlayer>();
  const [volume, setVolume] = createSignal(25);
  const [isMuted, setIsMuted] = createSignal(false);

  const [playerState, setPlayerState] = createSignal<PlayerStates>(
    PlayerStates.UNSTARTED
  );

  onMount(() => {
    setPlayer(
      YoutubeFactory(container()!, {
        playerVars: {
          disablekb: 1,
          origin: "https://www.focusly.space",
        },
      })
    );

    /* TODO: Give the option to select a space */
    player()?.loadVideoById("jfKfPfyJRdk");

    /* Default settings when player is initialized */
    player()?.stopVideo();
    player()?.setVolume(volume());

    player()?.on("stateChange", ({ data }) => setPlayerState(data));
  });

  createEffect(() => {
    player()?.setVolume(volume());
  });

  const toggleMute = () => {
    if (volume() === 0) {
      /* When volume is 0, muted icon is displayed.
       * Volume equal to 0 and isMuted is the same thing but handled with 2 different signals.
       */
      setIsMuted(false);
      setVolume(25);
    } else {
      setIsMuted((prev) => !prev);
    }

    isMuted() ? player()?.mute() : player()?.unMute(); // Synchronize
  };

  return (
    <Draggable tab={music} setTab={setMusic}>
      <GlassBox
        direction="flex-col"
        class="max-h-[500px] w-[340px] gap-4 sm:w-[440px]"
        classList={{
          /* Hidding element to let audio play when panel is closed */
          hidden: !music.isOpen,
        }}
      >
        <Stack
          direction="flex-row"
          class="select-none items-center justify-between"
        >
          <h1 class="text-xl font-semibold">Music</h1>
        </Stack>
        <Stack direction="flex-row" class="items-center justify-between gap-2">
          <Stack direction="flex-row" class="items-center gap-2">
            <PlayButton player={player()} state={playerState()} />
            <Stack direction="flex-row" class="h-8 items-center gap-1">
              <h3 class="relative select-none text-sm font-normal">
                Lofi Hip Hop
              </h3>
              <TbAccessPoint class="stroke-red-500" />
            </Stack>
          </Stack>
          <Stack direction="flex-row" class="items-center gap-1">
            <Button variant="outline" size="icon" onClick={toggleMute}>
              <Show when={!isMuted() && volume() > 0} fallback={<TbVolume3 />}>
                <Show when={volume() >= 50} fallback={<TbVolume2 />}>
                  <TbVolume />
                </Show>
              </Show>
            </Button>
            <Slider
              min={0}
              max={100}
              value={volume()}
              onChange={({ value }) => setVolume(value)}
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
        <div ref={setContainer} class="hidden" />
      </GlassBox>
    </Draggable>
  );
};

const PlayButton: Component<{
  player?: YouTubePlayer;
  state: PlayerStates;
}> = (props) => {
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
          props.state === PlayerStates.VIDEO_CUED ||
          props.state === PlayerStates.PAUSED
        }
      >
        <Button size="icon" onClick={() => props.player?.playVideo()}>
          <TbPlayerPlayFilled />
        </Button>
      </Match>
      <Match when={props.state === PlayerStates.PLAYING}>
        <Button size="icon" onClick={() => props.player?.pauseVideo()}>
          <TbPlayerPauseFilled />
        </Button>
      </Match>
    </Switch>
  );
};
