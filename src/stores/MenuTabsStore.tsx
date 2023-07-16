import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";
import { initialTodos } from "~/config";

export const [todos, setTodos] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createStore(initialTodos)
);

// export const getBiggestZ = () => {
//   const zValues = Object.values(menuTabs).map((tab) => tab.position.z);
//   return Math.max(...zValues);
// };

export const getBiggestZ = () => {
  const zValues = todos.position.z;
  return zValues;
};
