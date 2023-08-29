import { Component } from "solid-js";
import { A } from "solid-start";

export const ConstructionMessage: Component = () => {
  return (
    <p class="absolute bottom-0 h-fit w-full select-none bg-stone-900/50 text-center text-xs font-extralight text-white">
      🚧 This is a work in progress by{" "}
      <A href="https://twitter.com/harry_digos" target="blank">
        @harry_digos
      </A>
    </p>
  );
};
