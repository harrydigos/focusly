import {
  Accessor,
  Component,
  JSX,
  createContext,
  createMemo,
  useContext,
  ErrorBoundary,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import { useWindowSize } from "@solid-primitives/resize-observer";

import {
  initialMusic,
  initialNoteControl,
  initialNotes,
  initialTimer,
  initialTodos,
} from "~/config";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import { Note, Tab, Todos } from "~/types";

export interface PanelContextProps {
  todos: Tab & Todos;
  setTodos: SetStoreFunction<Tab & Todos>;
  noteControl: Tab;
  setNoteControl: SetStoreFunction<Tab>;
  notes: Note[];
  setNotes: SetStoreFunction<Note[]>;
  music: Tab;
  setMusic: SetStoreFunction<Tab>;
  timer: Tab;
  setTimer: SetStoreFunction<Tab>;
  isLocked: Accessor<boolean>;
  getBiggestZ: () => number;
  toggleLock: () => void;
  // eslint-disable-next-line no-unused-vars
  resetAll: (pos: { x: number } | undefined) => void;
}

export const PanelContext = createContext<PanelContextProps>();

const storeValues = {
  todos: initialTodos,
  noteControl: initialNoteControl,
  notes: initialNotes,
  music: initialMusic,
  timer: initialTimer,
};

type StoreKey = keyof typeof storeValues;
type StoreReturn<T extends StoreKey> = ReturnType<(typeof storeValues)[T]>;

const createPersistedStore = <T extends StoreKey>(name: T) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 640;
  const pxFromCenter = isMobile ? 170 : 220;
  const initialX = windowSize.width / 2 - pxFromCenter;

  const [store, setStore] = createStore(
    storeValues[name]({ x: initialX }) as StoreReturn<T>
  );

  return makePersisted([store, setStore], {
    name,
  });
};

export const PanelProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [todos, setTodos] = createPersistedStore("todos");
  const [noteControl, setNoteControl] = createPersistedStore("noteControl");
  const [notes, setNotes] = createPersistedStore("notes");
  const [music, setMusic] = createPersistedStore("music");
  const [timer, setTimer] = createPersistedStore("timer");

  const isLocked = createMemo(() => todos.isLocked);

  const getBiggestZ = () => {
    const zValues = [
      todos.position.z,
      noteControl.position.z,
      ...notes.map((note) => note.position.z),
      music.position.z,
      timer.position.z,
    ];
    return Math.max(...zValues);
  };

  const toggleLock = () => {
    let isLocked = false;
    setTodos("isLocked", (prev) => {
      isLocked = !prev;
      return isLocked;
    });
    setNoteControl("isLocked", isLocked);
    notes.forEach((_, i) => setNotes(i, "isLocked", isLocked));
    setMusic("isLocked", isLocked);
    setTimer("isLocked", isLocked);
  };

  const resetAll = (pos?: { x: number }) => {
    setTodos(initialTodos(pos));
    setNoteControl(initialNoteControl(pos));
    setNotes(initialNotes(pos));
    setMusic(initialMusic(pos));
    setTimer(initialTimer(pos));
  };

  return (
    <ErrorBoundary
      fallback={() => {
        // TODO: Handle error better
        return <PanelErrorFallback />;
      }}
    >
      <PanelContext.Provider
        value={{
          todos,
          setTodos,
          noteControl,
          setNoteControl,
          notes,
          setNotes,
          music,
          setMusic,
          timer,
          setTimer,
          isLocked,
          getBiggestZ,
          toggleLock,
          resetAll,
        }}
      >
        {props.children}
      </PanelContext.Provider>
    </ErrorBoundary>
  );
};

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error(
      "usePanelContext must be used within a PanelContextProvider"
    );
  }
  return context;
};

const PanelErrorFallback: Component = () => {
  return (
    <div class="fixed inset-0 z-[2147483646] bg-black/50 backdrop-blur-sm backdrop-filter">
      <Stack
        direction="flex-row"
        class="h-full w-full items-center justify-center"
      >
        <Stack
          direction="flex-col"
          class="mx-2 w-96 items-center gap-6 rounded-3xl border border-stone-200 border-opacity-10 bg-stone-900 bg-opacity-90 p-6 backdrop-blur-xl backdrop-filter"
        >
          <Stack direction="flex-col" class="items-center gap-2">
            <h2 class="text-xl font-semibold text-stone-50">Focusly update!</h2>
            <p class="text-center text-sm font-normal text-stone-300">
              Focusly has been updated with new features and bug fixes to make
              your experience better.
            </p>
          </Stack>
          <Button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
