import {
  SubmitHandler,
  createForm,
  maxLength,
  required,
  reset,
} from "@modular-forms/solid";
import { Component } from "solid-js";

import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { setMenuTabs } from "~/stores/MenuTabsStore";
import { Todo } from "~/types";

type TodoForm = {
  todo: string;
};

export const CreateTodoModal: Component = () => {
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
    <Modal
      title="Create todo"
      trigger={() => (
        <button
          type="button"
          class="inline-flex h-10 items-center rounded-lg bg-white px-3 text-stone-900"
        >
          New
        </button>
      )}
    >
      <Form onSubmit={handleSubmit}>
        <Field
          name={"todo"}
          validate={[
            required("Please type a todo."),
            maxLength(150, "Too long todo."),
          ]}
        >
          {(field, props) => (
            <Stack direction="flex-col" class="mt-4 w-72 gap-4">
              <Stack direction="flex-col">
                <Stack direction="flex-row">
                  <input
                    {...props}
                    spellcheck={false}
                    placeholder="e.g. Pretend you are studying"
                    autocomplete="off"
                    type="text"
                    value={field.value}
                    class="w-full text-sm text-stone-900"
                  />
                </Stack>
                <span>{field.error && <div>{field.error}</div>}</span>
              </Stack>
              <button type="submit" class="bg-white text-stone-900">
                Add
              </button>
            </Stack>
          )}
        </Field>
      </Form>
    </Modal>
  );
};
