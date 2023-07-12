import { TbEdit, TbEditOff, TbTrash } from "solid-icons/tb";
import {
  Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { Stack } from "~/design/Stack";
import { menuTabs, setMenuTabs } from "~/stores/MenuTabsStore";
import { Todo } from "~/types";
import { CreateTodoModal } from "./CreateTodoModal";

export const Todos: Component = () => {
  return (
    <Stack direction="flex-col" class="w-72 overflow-hidden gap-2">
      <Stack direction="flex-row" class="justify-between">
        <h1 class="text-lg font-semibold">Todos</h1>
        <CreateTodoModal />
      </Stack>
      <For each={menuTabs.todos.todosList}>
        {(todo) => <TodoRow {...todo} />}
      </For>
    </Stack>
  );
};

const TodoRow: Component<Todo> = (todo) => {
  const [isEditing, setIsEditing] = createSignal(false);

  const todoIndex = createMemo(
    () => menuTabs.todos.todosList!.findIndex((t) => t.id === todo.id) // todosList is always defined in todos
  );

  const completeTodo = () => {
    setMenuTabs("todos", "todosList", todoIndex(), (prev) => ({
      ...prev,
      completed: !prev.completed,
    }));
  };

  const deleteTodo = () => {
    setMenuTabs("todos", "todosList", (prev) =>
      prev?.filter((t) => t.id !== todo.id)
    );
  };

  let el: HTMLInputElement | undefined;

  createEffect(() => {
    if (isEditing()) {
      el?.focus();
    }
  });

  return (
    <Stack direction="flex-row" class="justify-between">
      <Stack direction="flex-row" class="gap-1">
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.completed}
          onChange={completeTodo}
        />
        <div class="w-52">
          <Show when={!isEditing()}>
            <label
              for={todo.id}
              class="w-full break-words cursor-pointer"
              classList={{
                "line-through opacity-50": todo.completed,
              }}
            >
              {todo.value}
            </label>
          </Show>
          <Show when={isEditing()}>
            {/* Handle constraints when editing */}
            <input
              ref={el}
              class="w-full bg-stone-900 break-words"
              classList={{
                "line-through": todo.completed,
              }}
              onBlur={() => setIsEditing(false)}
              autofocus
              value={todo.value}
              onInput={(e) => {
                setMenuTabs("todos", "todosList", todoIndex(), (prev) => ({
                  ...prev,
                  value: e.target.value,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setIsEditing(false);
                }
              }}
            />
          </Show>
        </div>
      </Stack>
      <button onClick={() => setIsEditing(true)}>
        <Show when={!isEditing()} fallback={<TbEditOff size={20} />}>
          <TbEdit size={20} />
        </Show>
      </button>
      <button onClick={deleteTodo}>
        <TbTrash size={20} />
      </button>
    </Stack>
  );
};
