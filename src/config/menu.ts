import { Note, Tab, Todos } from "~/types";

export const initialTodos: Tab & Todos = {
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
};

export const initialNotePanel: Tab = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  isOpen: false,
};

export const initialNotes: Note[] = [
  {
    id: "1689528313861",
    value: "Note 1",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
  },
  {
    id: Date.now().toString(),
    value: "Note 2",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
  },
];
