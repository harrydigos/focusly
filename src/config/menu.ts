import { MenuKey, MenuTab } from "~/types";

export const initialMenu: Record<MenuKey, MenuTab> = {
  todos: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
    todosList: [
      {
        id: Date.now().toString(),
        value: "Click on me to mark me as completed",
        completed: false,
      },
    ],
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
