import { Dialog as KobalteDialog } from "@kobalte/core";
import {
  SubmitHandler,
  createForm,
  maxLength,
  required,
  reset,
} from "@modular-forms/solid";
import { TbPlus } from "solid-icons/tb";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";

import { Button } from "~/design/Button";
import { Dialog } from "~/design/Dialog";
import { Input } from "~/design/Input";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";
import { Todo } from "~/types";
import { ToastStyle } from "~/utils";

type TodoForm = {
  todo: string;
};

export const CreateTodoDialog: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const { setTodos } = usePanelContext();
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

    setTodos("todosList", (prev) => (prev ? [...prev, newTodo] : [newTodo]));
    reset(form);
    toast.success("Todo created!", {
      style: ToastStyle,
      duration: 3000,
    });
  };

  return (
    <KobalteDialog.Root
      open={isOpen()}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Button onClick={() => setIsOpen(true)}>
        <TbPlus size={20} class="stroke-stone-900" />
        New todo
      </Button>
      <Dialog isOpen={isOpen}>
        <Form onSubmit={handleSubmit}>
          <Field
            name={"todo"}
            validate={[
              required("Don't be lazy. Write something."),
              maxLength(150, "Too long. Try to break it down."),
            ]}
          >
            {(field, fieldProps) => (
              <Stack direction="flex-col" class="gap-4">
                <h1 class="text-lg font-semibold">New Todo</h1>
                <Stack direction="flex-col">
                  <Stack direction="flex-row">
                    <Input
                      {...fieldProps}
                      autofocus={true}
                      spellcheck={false}
                      placeholder="e.g. Pretend you are studying"
                      autocomplete="off"
                      type="text"
                      value={field.value}
                    />
                  </Stack>
                  {field.error && (
                    <span class="mt-1 text-sm font-light text-white">
                      {field.error}
                    </span>
                  )}
                </Stack>

                <Stack direction="flex-row" class="w-full gap-2">
                  <Button
                    variant="outline"
                    class="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button type="submit" class="w-full">
                    Create
                  </Button>
                </Stack>
              </Stack>
            )}
          </Field>
        </Form>
      </Dialog>
    </KobalteDialog.Root>
  );
};
