import { IconTypes } from "solid-icons";
import { TbListCheck, TbNote } from "solid-icons/tb";
import { Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

import { GlassBox } from "~/design/GlassBox";
import { usePanelContext } from "~/providers";
import { MenuKey, Tab } from "~/types";

export const Menu: Component = () => {
  const { todos, setTodos, noteControl, setNoteControl } = usePanelContext();

  return (
    <header class="mt-4 flex w-full justify-center">
      <GlassBox
        direction="flex-row"
        class="w-fit gap-1"
        style={{ padding: "0.25rem 0.5rem" }}
      >
        <MenuItem key="notes" tab={noteControl} setTab={setNoteControl} />
        <MenuItem key="todos" tab={todos} setTab={setTodos} />
      </GlassBox>
    </header>
  );
};

const menuIcons: Record<MenuKey, IconTypes> = {
  todos: TbListCheck,
  // music: TbMusic,
  notes: TbNote,
};

interface MenuItemProps {
  key: MenuKey;
  tab: Tab;
  setTab: SetStoreFunction<Tab>;
}

const MenuItem: Component<MenuItemProps> = (props) => {
  const { getBiggestZ } = usePanelContext();

  return (
    <button
      type="button"
      class="group inline-flex w-fit transform-gpu items-center gap-1 rounded-full border border-transparent p-2 text-white ring-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95"
      classList={{
        "bg-stone-900/30 hover:border-white/30": props.tab.isOpen,
      }}
      onClick={() => {
        props.setTab("isOpen", (prev) => !prev);
        props.setTab("position", "z", () => getBiggestZ() + 1);
      }}
    >
      <MenuIcon icon={menuIcons[props.key]} />
      <div class="select-none text-sm font-medium capitalize group-hover:opacity-75">
        {props.key}
      </div>
    </button>
  );
};

const MenuIcon: Component<{ icon: IconTypes }> = (props) => {
  return <props.icon size={20} class="group-hover:opacity-75" />;
};
