import { Component } from "solid-js";
import lofiGirlBalconyVideo from "/videos/lofi_girl_balcony.mp4";
import lofiGirlBalconyImage from "/images/lofi_girl_balcony.png";

export const LofiGirlBalcony: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={lofiGirlBalconyImage}
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={lofiGirlBalconyVideo} type="video/mp4" />
    </video>
  );
};
