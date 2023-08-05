import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import YoutubeFactory from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";

import { usePanelContext } from "~/providers";
import { Draggable } from "../Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Stack } from "~/design/Stack";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import { TbPlayerPause, TbPlayerPlay } from "solid-icons/tb";
import { Button } from "~/design/Button";

export const YoutubePlayer: Component = () => {
  const { music, setMusic } = usePanelContext();

  let container: HTMLDivElement;
  let player: YouTubePlayer;

  const [isPlaying, setIsPlaying] = createSignal(false);

  onMount(() => {
    /**
     * Experiment if it's better to initialize the player once and keep it running in the background on it's own
     * without considering if the panel is closed or not, or to destroy and reinitialize it every time
     */
    player = YoutubeFactory(container, {
      videoId: "jfKfPfyJRdk",
    });

    /* Default settings when player is initialized */
    player.stopVideo();
    player.setVolume(0);

    player.on("stateChange", ({ data }) => {
      setIsPlaying(data === PlayerStates.PLAYING);
    });
  });

  createEffect(() => {
    if (music.isOpen) {
      player.unMute();
    } else {
      player.mute();
    }
  });

  return (
    <Draggable tab={music} setTab={setMusic}>
      <GlassBox
        direction="flex-col"
        class="max-h-[500px] w-[340px] gap-4 px-0 sm:w-[440px]"
        classList={{
          hidden: !music.isOpen,
        }}
      >
        <Stack direction="flex-row" class="items-center justify-between px-6">
          <h1 class="text-xl font-semibold">Music</h1>
        </Stack>
        <div ref={container!} class="h-36 w-full px-6" />
        <Show
          when={isPlaying()}
          fallback={
            <Button
              variant="ghost"
              class="w-fit"
              onClick={() => player.playVideo()}
            >
              <TbPlayerPlay />
            </Button>
          }
        >
          <Button
            variant="ghost"
            class="w-fit"
            onClick={() => player.pauseVideo()}
          >
            <TbPlayerPause />
          </Button>
        </Show>
      </GlassBox>
    </Draggable>
  );
};
