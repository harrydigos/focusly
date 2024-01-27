import {
  Accessor,
  Component,
  JSX,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { Position } from "~/types";

export interface CursorPositionContextProps {
  cursorPosition: Accessor<Omit<Position, "z"> | undefined>;
}

export const CursorPositionContext =
  createContext<CursorPositionContextProps>();

export const CursorPositionProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [cursorPosition, setCursorPosition] =
    createSignal<Omit<Position, "z">>();

  const onMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  onMount(() => {
    window.addEventListener("mousemove", onMouseMove);
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", onMouseMove);
  });

  return (
    <CursorPositionContext.Provider
      value={{
        cursorPosition,
      }}
    >
      {props.children}
    </CursorPositionContext.Provider>
  );
};

export const useCursorPositionContext = () => {
  const context = useContext(CursorPositionContext);
  if (!context) {
    throw new Error(
      "useCursorPositionContext must be used within a CursorPositionProvider"
    );
  }
  return context;
};
