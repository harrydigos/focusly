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
      <GlassBox direction="flex-row" class="w-fit p-1 gap-1">
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
      class="flex gap-1 p-2 hover:bg-stone-900 hover:bg-opacity-30 transition-colors rounded-full"
      classList={{
        "bg-stone-100 bg-opacity-30": props.isOpen,
      }}
      onClick={() => toggleTab(props.key)}
    >
      <props.icon size={24} class="text-stone-100" />
      <div class="capitalize">{props.label}</div>
    </button>
  );
};
