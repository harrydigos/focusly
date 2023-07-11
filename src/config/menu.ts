import { MenuKey, MenuTab } from "~/types";

export const initialMenu: Record<MenuKey, MenuTab> = {
  todos: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
    todosList: [],
  },
  music: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
    song: "",
  },
  notes: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
    notes: [],
  },
};
