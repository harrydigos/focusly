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
      trigger={() => (
        <button class="inline-flex h-10 items-center rounded-lg bg-white px-3 text-stone-900">
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
    </Modal>
  );
};
