import {
  Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import {
  Checkbox,
  CheckboxLabel,
  CheckboxInput,
  CheckboxControl,
} from "@ark-ui/solid";
import { TbCheck, TbEdit, TbPlus, TbTrash } from "solid-icons/tb";

import { Button } from "~/design/Button";
import { Input } from "~/design/Input";
import { Stack } from "~/design/Stack";
import { menuTabs, setMenuTabs } from "~/stores/MenuTabsStore";
import { Todo } from "~/types";

import { CreateTodoModal } from "./CreateTodoModal";

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
        <Stack direction="flex-col" class="gap-1 overflow-y-auto py-1">
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
  let el: HTMLInputElement | undefined;

  createEffect(() => {
    if (isEditing()) {
      el?.focus();
    }
  });

  const todoIndex = createMemo(
    () => menuTabs.todos.todosList!.findIndex((t) => t.id === todo.id) // todosList is always defined in todos
  );

  const toggleTodo = () => {
    setMenuTabs(
      "todos",
      "todosList",
      todoIndex(),
      "completed",
      (prev) => !prev
    );
  };

  const deleteTodo = () => {
    setMenuTabs("todos", "todosList", (prev) =>
      prev?.filter((t) => t.id !== todo.id)
    );
  };

  const updateTodo = (value: string) => {
    const isInRange = value.length > 0 && value.length <= 150;
    if (!isInRange) return;
    setMenuTabs("todos", "todosList", todoIndex(), "value", () => value);
  };

  return (
    <Stack direction="flex-row" class="justify-between">
      <Checkbox
        class="flex cursor-pointer flex-row gap-2"
        checked={todo.completed}
        onChange={toggleTodo}
      >
        <CheckboxInput />
        <CheckboxControl class="mt-2 h-4 w-4 rounded-[4px] bg-stone-900">
          {todo.completed && <TbCheck size={16} class="stroke-white" />}
        </CheckboxControl>
        <Show
          when={isEditing()}
          fallback={
            <CheckboxLabel
              class="flex h-full min-h-[32px] max-w-[190px] cursor-pointer items-center overflow-hidden break-words text-sm sm:max-w-[280px]"
              classList={{
                "line-through opacity-50": todo.completed,
              }}
            >
              {todo.value}
            </CheckboxLabel>
          }
        >
          <Input
            ref={el}
            class="h-8 sm:w-[280px]"
            onBlur={() => setIsEditing(false)}
            autofocus
            spellcheck={false}
            value={todo.value}
            onInput={(e) => updateTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setIsEditing(false);
              }
            }}
          />
        </Show>
      </Checkbox>
      <Stack direction="flex-row" class="gap-1">
        <Show when={!isEditing()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <TbEdit size={20} />
          </Button>
        </Show>
        <Button variant="ghost" size="icon" onClick={deleteTodo}>
          <TbTrash size={20} class="stroke-red-500" />
        </Button>
      </Stack>
    </Stack>
  );
};
