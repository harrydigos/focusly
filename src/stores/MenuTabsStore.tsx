import { IconTypes } from "solid-icons";
import { createStore } from "solid-js/store";
import { TbListCheck, TbMusic, TbNote } from "solid-icons/tb";

export type MenuTabs = "todos" | "music" | "notes";

export interface MenuTabsStore {
  label: string;
  isOpen: boolean;
  icon: IconTypes;
}

const [menuTabsStore, setMenuTabsStore] = createStore<
  Record<MenuTabs, MenuTabsStore>
>({
  todos: {
    label: "todos",
    isOpen: false,
    icon: TbListCheck,
  },
  music: {
    label: "music",
    isOpen: false,
    icon: TbMusic,
  },
  notes: {
    label: "notes",
    isOpen: false,
    icon: TbNote,
  },
});

const toggleTab = (tab: MenuTabs) => {
  setMenuTabsStore([tab], (prev) => ({ ...prev, isOpen: !prev.isOpen }));
};

export { menuTabsStore, toggleTab };
