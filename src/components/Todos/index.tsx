import {
  SubmitHandler,
  createForm,
  maxLength,
  required,
  reset,
} from "@modular-forms/solid";
import { Component, For, Show, createMemo, createSignal } from "solid-js";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { menuTabs, setMenuTabs } from "~/stores/MenuTabsStore";
import { Todo } from "~/types";

type TodoForm = {
  todo: string;
};

export const Todos: Component = () => {
  const [form, { Form, Field }] = createForm<TodoForm>({
    initialValues: {
      todo: "",
    },
  });

  const handleSubmit: SubmitHandler<TodoForm> = (values) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      value: values.todo,
      completed: false,
    };

    setMenuTabs("todos", "todosList", (prev) =>
      prev ? [...prev, newTodo] : [newTodo]
    );
    reset(form);
  };

  return (
    <Stack
      direction="flex-col"
      class="max-w-[300px] w-full overflow-hidden gap-2"
    >
      <h1 class="text-lg font-semibold">Todos</h1>
      <Form onSubmit={handleSubmit}>
        <Field
          name={"todo"}
          validate={[
            required("Please type a todo."),
            maxLength(150, "Too long todo."),
          ]}
        >
          {(field, props) => (
            <Stack direction="flex-col">
              <Stack direction="flex-row">
                <input
                  spellcheck={false}
                  placeholder="Create todo"
                  autocomplete="off"
                  type="text"
                  value={field.value}
                  class="text-stone-900"
                  required
                  {...props}
                />
                <button type="submit">Add</button>
              </Stack>
              {field.error && <div>{field.error}</div>}
            </Stack>
          )}
        </Field>
      </Form>
      <For each={menuTabs.todos.todosList}>
        {(todo) => <TodoRow {...todo} />}
      </For>
      <Modal
        trigger={() => (
          <button onClick={() => console.log("hehe")}>Click</button>
        )}
      >
        <div>Content</div>
      </Modal>
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

  return (
    <Stack direction="flex-row" class="justify-between">
      <button onClick={() => completeTodo()}>
        {todo.completed ? "Undone" : "Done"}
      </button>
      <Show when={!isEditing()}>
        <span
          class="w-64"
          onDblClick={() => setIsEditing(true)}
          classList={{
            "line-through opacity-50": todo.completed,
          }}
        >
          {todo.value}
        </span>
      </Show>
      <Show when={isEditing()}>
        {/* Handle constraints when editing */}
        <input
          class="bg-stone-900 w-64"
          autofocus={true}
          onBlur={() => setIsEditing(false)}
          value={todo.value}
          onInput={(e) => {
            setMenuTabs("todos", "todosList", todoIndex(), (prev) => {
              return { ...prev, value: e.target.value };
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              setIsEditing(false);
            }
          }}
        />
      </Show>
      <button onClick={() => deleteTodo()}>Delete</button>
    </Stack>
  );
};
