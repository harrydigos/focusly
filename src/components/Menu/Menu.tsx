import { Component, For } from "solid-js";
import { GlassBox } from "~/design/GlassBox";
import {
  MenuTabs,
  MenuTabsStore,
  menuTabsStore,
  toggleTab,
} from "~/stores/MenuTabsStore";

export const Menu: Component = () => {
  const tabs = menuTabsStore;

  return (
    <header class="w-full flex justify-center mt-4">
      <GlassBox
        direction="flex-row"
        class="w-fit gap-1"
        style={{ padding: "0.25rem 0.5rem" }}
      >
        <For each={Object.entries(tabs)}>
          {([key, value]) => <MenuItem key={key as MenuTabs} {...value} />}
        </For>
      </GlassBox>
    </header>
  );
};

const MenuItem: Component<{ key: MenuTabs } & MenuTabsStore> = (props) => {
  return (
    <button
      type="button"
      class="group flex items-center gap-1 p-2 transition-all border border-transparent text-white rounded-full ring-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      classList={{
        "bg-stone-900 bg-opacity-30 hover:border-white/30": props.isOpen,
        "hover:opacity-75": !props.isOpen,
      }}
      onClick={() => toggleTab(props.key)}
    >
      <props.icon size={20} />
      <div class="capitalize font-semibold text-sm">{props.label}</div>
    </button>
  );
};
