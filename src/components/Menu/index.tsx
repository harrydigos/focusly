import { Button } from "@kobalte/core";
import { IconTypes } from "solid-icons";
import { TbAlarm, TbListCheck, TbLock, TbMusic, TbNote } from "solid-icons/tb";
import { Component, Show } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

import { GlassBox } from "~/design/GlassBox";
import { Tooltip } from "~/design/Tooltip";
import { usePanelContext } from "~/providers";
import { MenuKey, Tab } from "~/types";

export const Menu: Component = () => {
  const {
    todos,
    setTodos,
    noteControl,
    setNoteControl,
    music,
    setMusic,
    timer,
    setTimer,
  } = usePanelContext();

  return (
    <header class="absolute left-0 top-0 z-[1px] mt-4 flex w-full justify-center">
      <GlassBox
        direction="flex-row"
        class="w-fit gap-1"
        style={{ padding: "0.25rem 0.5rem" }}
      >
        <MenuItem key="notes" tab={noteControl} setTab={setNoteControl} />
        <MenuItem key="todos" tab={todos} setTab={setTodos} />
        <MenuItem key="music" tab={music} setTab={setMusic} />
        <MenuItem key="timer" tab={timer} setTab={setTimer} />
      </GlassBox>

      <Show when={todos.isLocked}>
        <GlassBox
          direction="flex-row"
          class="absolute top-14 rounded-full p-0.5"
        >
          <TbLock class="h-4 w-4 stroke-white" />
        </GlassBox>
      </Show>
    </header>
  );
};

const menuIcons: Record<MenuKey, IconTypes> = {
  todos: TbListCheck,
  music: TbMusic,
  notes: TbNote,
  timer: TbAlarm,
};

interface MenuItemProps {
  key: MenuKey;
  tab: Tab;
  setTab: SetStoreFunction<Tab>;
}

const MenuItem: Component<MenuItemProps> = (props) => {
  const { getBiggestZ } = usePanelContext();

  return (
    <Tooltip
      description={<p class="capitalize">{props.key}</p>}
      gutter={4}
      arrowSize={16}
      openDelay={0}
      animate={false}
    >
      <Button.Root
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
      </Button.Root>
    </Tooltip>
  );
};

const MenuIcon: Component<{ icon: IconTypes }> = (props) => {
  return <props.icon size={20} class="group-hover:opacity-75" />;
};
