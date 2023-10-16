import { Component } from "solid-js";
import lofiGirlVideo from "/videos/lofi_girl.mp4";
import lofiGirlImage from "/images/lofi_girl.png";

export const LofiGirl: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={lofiGirlImage}
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={lofiGirlVideo} type="video/mp4" />
    </video>
  );
};
