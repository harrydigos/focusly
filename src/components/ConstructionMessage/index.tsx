import { Component } from "solid-js";
import { A } from "solid-start";

export const ConstructionMessage: Component = () => {
  return (
    <p class="absolute bottom-0 h-fit w-full bg-stone-900/50 text-center text-sm font-extralight text-white">
      🚧 This is a work in progress. If something doesn't work, press{" "}
      <button
        class="underline"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        reset
      </button>
      {". "}
      If it still doesn't work, contact me{" "}
      <A href="https://twitter.com/harry_digos" target="blank">
        @harry_digos
      </A>
    </p>
  );
};
