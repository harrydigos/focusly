import { Note, Tab, Timer, Todos } from "~/types";

export const initialTodos: Tab & Todos = {
  position: {
    x: 0,
    y: 256,
    z: 0,
  },
  isOpen: true,
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
  },
];

export const initialMusic: Tab = {
  position: {
    x: 0,
    y: 437,
    z: 0,
  },
  isOpen: true,
};

/**
 * A pomo is always 25 minutes.
 * A short break is 5 minutes while a long (happens every 4 pomos) is 15 minutes.
 */
export const initialTimer: Timer = {
  currentTime: 25 * 60,
  currentPomo: 0,
  isOnBreak: false,
  position: {
    x: 0,
    y: 566,
    z: 0,
  },
  isOpen: true,
};
