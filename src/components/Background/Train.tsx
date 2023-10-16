import { Component } from "solid-js";
import trainVideo from "/videos/train.mp4";
import trainImage from "/images/train.png";

export const Train: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={trainImage}
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={trainVideo} type="video/mp4" />
    </video>
  );
};
