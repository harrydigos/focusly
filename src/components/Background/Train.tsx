import { Component } from "solid-js";

export const Train: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={"/images/train.png"}
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={"/videos/train.mp4"} type="video/mp4" />
    </video>
  );
};
