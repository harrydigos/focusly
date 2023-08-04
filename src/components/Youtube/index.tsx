import { onMount } from "solid-js";

// @ts-ignore
import YouTubePlayer from "youtube-player";

export const Youtube = () => {
  let container: HTMLDivElement;
  let player: any;

  onMount(() => {
    player = YouTubePlayer(container);
    player.loadVideoById("dQw4w9WgXcQ");
    player.playVideo();
  });

  return (
      <div class="absolute inset-0" ref={container!} />
  );
};
