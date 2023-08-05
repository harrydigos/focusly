import { Component, Match, Switch, createSignal, onMount } from "solid-js";
import {
  TbLoader,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
} from "solid-icons/tb";
import YoutubeFactory from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";

import { usePanelContext } from "~/providers";
import { Draggable } from "~/components/Draggable";
import { GlassBox } from "~/design/GlassBox";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";

export const YoutubePlayer: Component = () => {
  const { music, setMusic } = usePanelContext();

  const [container, setContainer] = createSignal<HTMLDivElement>();
  const [player, setPlayer] = createSignal<YouTubePlayer>();

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
    player()?.setVolume(25);

    player()?.on("stateChange", ({ data }) => setPlayerState(data));
  });

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
        <Stack direction="flex-row" class="items-center justify-between">
          <h1 class="text-xl font-semibold">Music</h1>
        </Stack>
        <div ref={setContainer} class="hidden" />
        <PlayButton player={player()} state={playerState()} />
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
