import { XOR } from "~/types";

export type MenuKey = "todos" | "notes"; // | "music"

export type MenuTab = Tab & XOR<Todos, Notes>; // , Music>;

export interface Tab {
  isOpen: boolean;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Todos {
  todosList: Todo[];
}

export interface Todo {
  id: string;
  value: string;
  completed: boolean;
}

// export interface Music {
//   song: string;
// }

export interface Notes {
  notesList: string[];
}

export interface Note {
  id: string;
  value: string;
}
