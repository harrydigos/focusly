/* eslint-disable solid/reactivity */

import { Component, JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import { initialNoteControl, initialNotes, initialTodos } from "~/config";
import { Note, Tab, Todos } from "~/types";

export interface PanelContextProps {
  todos: Tab & Todos;
  setTodos: SetStoreFunction<Tab & Todos>;
  noteControl: Tab;
  setNoteControl: SetStoreFunction<Tab>;
  notes: Note[];
  setNotes: SetStoreFunction<Note[]>;
  getBiggestZ: () => number;
}

export const PanelContext = createContext<PanelContextProps>();

export const PanelProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [todos, setTodos] = makePersisted(createStore(initialTodos));

  const [noteControl, setNoteControl] = makePersisted(
    createStore(initialNoteControl)
  );

  const [notes, setNotes] = makePersisted(createStore(initialNotes));

  const getBiggestZ = () => {
    const zValues = [
      todos.position.z,
      noteControl.position.z,
      ...notes.map((note) => note.position.z),
    ];
    return Math.max(...zValues);
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
        getBiggestZ,
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
