import {
  Accessor,
  Component,
  JSX,
  createContext,
  createMemo,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import {
  initialMusic,
  initialNoteControl,
  initialNotes,
  initialTimer,
  initialTodos,
} from "~/config";
import { Note, Tab, Timer, Todos } from "~/types";

export interface PanelContextProps {
  todos: Tab & Todos;
  setTodos: SetStoreFunction<Tab & Todos>;
  noteControl: Tab;
  setNoteControl: SetStoreFunction<Tab>;
  notes: Note[];
  setNotes: SetStoreFunction<Note[]>;
  music: Tab;
  setMusic: SetStoreFunction<Tab>;
  timer: Timer;
  setTimer: SetStoreFunction<Timer>;
  isLocked: Accessor<boolean>;
  getBiggestZ: () => number;
  toggleLock: () => void;
}

export const PanelContext = createContext<PanelContextProps>();

export const PanelProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  /* eslint-disable solid/reactivity */
  const [todos, setTodos] = makePersisted(createStore(initialTodos));
  const [noteControl, setNoteControl] = makePersisted(
    createStore(initialNoteControl)
  );
  const [notes, setNotes] = makePersisted(createStore(initialNotes));
  const [music, setMusic] = makePersisted(createStore(initialMusic));
  const [timer, setTimer] = makePersisted(createStore(initialTimer));

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
    setNotes(notes.map((note) => ({ ...note, isLocked })));
    setMusic("isLocked", isLocked);
    setTimer("isLocked", isLocked);
  };

  return (
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
      }}
    >
      {props.children}
    </PanelContext.Provider>
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
