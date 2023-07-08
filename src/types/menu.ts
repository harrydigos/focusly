import { initialMenu } from "~/config";

export type MenuKey = keyof typeof initialMenu;

export interface MenuTab {
  isOpen: boolean;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
