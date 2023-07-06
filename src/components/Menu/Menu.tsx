import { Component } from "solid-js";
import { GlassBox } from "~/design/GlassBox";
import { TbListCheck, TbMusic, TbNote } from "solid-icons/tb";
import { IconTypes } from "solid-icons";

export const Menu: Component = () => {
  return (
    <header class="w-full flex justify-center mt-4">
      <GlassBox direction="flex-row" class="w-fit p-1 gap-1">
        <MenuItem icon={TbListCheck} label="Todos" />
        <MenuItem icon={TbMusic} label="Music" />
        <MenuItem icon={TbNote} label="Notes" />
      </GlassBox>
    </header>
  );
};

const MenuItem: Component<{ icon: IconTypes; label: string }> = (props) => {
  return (
    <button
      type="button"
      class="flex gap-1 p-2 hover:bg-stone-900 hover:bg-opacity-30 transition-colors rounded-full"
    >
      <props.icon size={24} class="text-stone-100" />
      <div>{props.label}</div>
    </button>
  );
};
