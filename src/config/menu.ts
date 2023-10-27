import { Note, Tab, Todos } from "~/types";

export const initialTodos: Tab & Todos = {
  position: {
    x: 0,
    y: 256,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
  todosList: [
    {
      id: Date.now().toString(),
      value: "Click me to complete",
      completed: false,
    },
    {
      id: (Date.now() + 1).toString(),
      value: "Drag me to reorder me",
      completed: false,
    },
  ],
};

export const initialNoteControl: Tab = {
  position: {
    x: 0,
    y: 80,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
};

export const initialNotes: Note[] = [
  {
    id: Date.now().toString(),
    value: "Example note",
    position: {
      x: 8,
      y: 80,
      z: 0,
    },
    isOpen: false,
    isLocked: false,
  },
];

export const initialMusic: Tab = {
  position: {
    x: 0,
    y: 437,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
};

export const initialTimer: Tab = {
  position: {
    x: 0,
    y: 566,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
};
