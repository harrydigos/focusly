import { Tab, Todos } from "~/types";

export const initialTodos: Tab & Todos = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  isOpen: false,
  todosList: [
    {
      id: Date.now().toString(),
      value: "Click on me to mark me as completed",
      completed: false,
    },
  ],
};

// export const initialMenu: Record<MenuKey, MenuTab> = {
//   todos: {
//     position: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     isOpen: false,
//     todosList: [
//       {
//         id: Date.now().toString(),
//         value: "Click on me to mark me as completed",
//         completed: false,
//       },
//     ],
//   },
//   notes: {
//     position: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     isOpen: false,
//     notesList: ["Note 1", "Note 2", "Note 3"],
//   },
// };

// music: {
//   position: {
//     x: 0,
//     y: 0,
//     z: 0,
//   },
//   isOpen: false,
//   song: "",
// },
