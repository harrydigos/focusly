import { TbEdit, TbEditOff, TbPlus, TbTrash } from "solid-icons/tb";
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
import { Button } from "~/design/Button";
import { Input } from "~/design/Input";

export const Todos: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <Stack direction="flex-col" class="max-h-[500px] w-72 gap-4 sm:w-96">
        <Stack direction="flex-row" class="items-center justify-between">
          <h1 class="text-xl font-semibold">Todos</h1>
          <Button onClick={() => setIsOpen(true)}>
            <TbPlus size={20} class="stroke-stone-900" />
            Add
          </Button>
        </Stack>
        <Stack direction="flex-col" class="gap-1 overflow-auto">
          <For each={menuTabs.todos.todosList}>
            {(todo) => <TodoRow {...todo} />}
          </For>
        </Stack>
      </Stack>
      <CreateTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
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
      <Stack direction="flex-row" class="items-start gap-2">
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.completed}
          onChange={completeTodo}
          class="mt-2 h-4 w-4"
        />
        <Show
          when={isEditing()}
          fallback={
            <label
              for={todo.id}
              class="flex h-full min-h-[32px] max-w-[280px] cursor-pointer items-center overflow-hidden break-words text-sm"
              classList={{
                "line-through opacity-50": todo.completed,
              }}
            >
              {todo.value}
            </label>
          }
        >
          <Input
            ref={el}
            class="h-8 w-[280px] break-words bg-stone-900"
            classList={{
              "line-through": todo.completed,
            }}
            onBlur={() => setIsEditing(false)}
            autofocus
            value={todo.value}
            onInput={(e) => {
              const inputLength = e.target.value.length;
              if (inputLength === 0 || inputLength > 150) return; // range of todo length

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
      </Stack>
      <Stack direction="flex-row" class="gap-1">
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Show when={!isEditing()} fallback={<TbEditOff size={20} />}>
            <TbEdit size={20} />
          </Show>
        </Button>
        <Button variant="ghost" size="icon" onClick={deleteTodo}>
          <TbTrash size={20} class="stroke-red-500" />
        </Button>
      </Stack>
    </Stack>
  );
};
