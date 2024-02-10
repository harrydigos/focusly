import { Component } from "solid-js";

export const LofiGirlBalcony: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={"/images/lofi_girl_balcony.png"}
      onContextMenu={(e) => e.preventDefault()}
      preload="auto"
    >
      <source src={"/videos/lofi_girl_balcony.mp4"} type="video/mp4" />
    </video>
  );
};
