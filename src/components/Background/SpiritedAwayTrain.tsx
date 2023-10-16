import { Component } from "solid-js";
import spiritedAwayTrainVideo from "/videos/spirited_away_train.mp4";
import spiritedAwayTrainImage from "/images/spirited_away_train.png";

export const SpiritedAwayTrain: Component = () => {
  return (
    <video
      autoplay
      muted
      loop
      class="absolute inset-0 h-full w-full object-cover"
      playsinline
      poster={spiritedAwayTrainImage}
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={spiritedAwayTrainVideo} type="video/mp4" />
    </video>
  );
};
