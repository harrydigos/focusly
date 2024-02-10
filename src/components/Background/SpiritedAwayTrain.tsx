import { Component } from "solid-js";

export const SpiritedAwayTrain: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={"/images/spirited_away_train.png"}
      onContextMenu={(e) => e.preventDefault()}
      preload="auto"
    >
      <source src={"/videos/spirited_away_train.mp4"} type="video/mp4" />
    </video>
  );
};
