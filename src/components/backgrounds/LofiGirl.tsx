import { Component } from "solid-js";
import lofiGirlVideo from "~/assets/lofi_girl.mp4";

export const LofiGirl: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 object-cover w-full h-full"
    >
      <source src={lofiGirlVideo} type="video/mp4" />
    </video>
  );
};
