import { Component } from "solid-js";
import lofiGirlVideo from "~/assets/lofi_girl.mp4";

export const LofiGirl: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="h-full w-full object-cover"
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={lofiGirlVideo} type="video/mp4" />
    </video>
  );
};
