import { Note, Tab, Todos } from "~/types";

export const initialTodos = (pos?: { x: number }): Tab & Todos => ({
  position: {
    x: pos?.x ?? 0,
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
      value: "Drag me to reorder (Desktop)",
      completed: false,
    },
  ],
});

export const initialNoteControl = (pos?: { x: number }): Tab => ({
  position: {
    x: pos?.x ?? 0,
    y: 80,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
});

export const initialNotes = (pos?: { x: number }): Note[] => [
  {
    id: Date.now().toString(),
    updatedAt: new Date().toISOString(),
    value: "Example note",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    isOpen: false,
    isLocked: false,
  },
];

export const initialMusic = (pos?: { x: number }): Tab => ({
  position: {
    x: pos?.x ?? 0,
    y: 437,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
});

export const initialTimer = (pos?: { x: number }): Tab => ({
  position: {
    x: pos?.x ?? 0,
    y: 566,
    z: 0,
  },
  isOpen: true,
  isLocked: false,
});
