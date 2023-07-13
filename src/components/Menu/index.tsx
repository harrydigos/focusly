import { IconTypes } from "solid-icons";
import { TbListCheck, TbMusic, TbNote } from "solid-icons/tb";
import { Component, For } from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { menuTabs, setMenuTabs } from "~/stores/MenuTabsStore";
import { MenuKey, MenuTab } from "~/types";

export const Menu: Component = () => {
  return (
    <header class="mt-4 flex w-full justify-center">
      <GlassBox
        direction="flex-row"
        class="w-fit gap-1"
        style={{ padding: "0.25rem 0.5rem" }}
      >
        <For each={Object.entries(menuTabs)}>
          {([key, value]) => <MenuItem key={key as MenuKey} {...value} />}
        </For>
      </GlassBox>
    </header>
  );
};

const menuIcons: Record<MenuKey, IconTypes> = {
  todos: TbListCheck,
  music: TbMusic,
  notes: TbNote,
};

const MenuItem: Component<{ key: MenuKey } & MenuTab> = (props) => {
  return (
    <button
      type="button"
      class="group inline-flex w-fit transform-gpu items-center gap-1 rounded-full border border-transparent p-2 text-white ring-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95"
      classList={{
        "bg-stone-900/30 hover:border-white/30": props.isOpen,
      }}
      onClick={() => setMenuTabs(props.key, "isOpen", (prev) => !prev)}
    >
      <MenuIcon icon={menuIcons[props.key]} />
      <div class="text-sm font-medium capitalize group-hover:opacity-75">
        {props.key}
      </div>
    </button>
  );
};

const MenuIcon: Component<{ icon: IconTypes }> = (props) => {
  return <props.icon size={20} class="group-hover:opacity-75" />;
};
