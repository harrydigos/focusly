import { Component, JSX, onMount, splitProps } from "solid-js";
import YoutubeFactory from "youtube-player";
import type { YouTubePlayer, Options } from "youtube-player/dist/types";
import type { WithRequired } from "~/types";

export interface YoutubeOptions
  extends WithRequired<Options, "videoId">,
    JSX.HTMLAttributes<HTMLDivElement> {}

export const Youtube: Component<YoutubeOptions> = (props) => {
  let container: HTMLDivElement;
  let player: YouTubePlayer;

  const [options, elProps] = splitProps(props, [
    "width",
    "height",
    "videoId",
    "host",
    "playerVars",
    "events",
  ]);

  onMount(() => {
    player = YoutubeFactory(container, options);

    /* Default settings when player is initialized */
    player.setVolume(10);
  });

  return <div class={elProps.class} ref={container!} />;
};
