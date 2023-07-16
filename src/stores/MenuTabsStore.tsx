import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import { initialNotePanel, initialNotes, initialTodos } from "~/config";

export const [todos, setTodos] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createStore(initialTodos)
);

export const [notePanel, setNotePanel] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createStore(initialNotePanel)
);

export const [notes, setNotes] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createStore(initialNotes)
);

// export const getBiggestZ = () => {
//   const zValues = Object.values(menuTabs).map((tab) => tab.position.z);
//   return Math.max(...zValues);
// };

export const getBiggestZ = () => {
  const zValues = [
    todos.position.z,
    notePanel.position.z,
    ...notes.map((note) => note.position.z),
  ];
  return Math.max(...zValues);
};
