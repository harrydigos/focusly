import { Component } from "solid-js";

export const LofiGirl: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={"/images/lofi_girl.png"}
      onContextMenu={(e) => e.preventDefault()}
      preload="auto"
    >
      <source src={"/videos/lofi_girl.mp4"} type="video/mp4" />
    </video>
  );
};
