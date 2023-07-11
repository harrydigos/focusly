import { createStore } from "solid-js/store";
import { makePersisted } from "@solid-primitives/storage";

import { initialMenu } from "~/config/menu";

export const [menuTabs, setMenuTabs] = makePersisted(
  // eslint-disable-next-line solid/reactivity
  createStore(initialMenu)
);

export const getBiggestZ = () => {
  const zValues = Object.values(menuTabs).map((tab) => tab.position.z);
  return Math.max(...zValues);
};
