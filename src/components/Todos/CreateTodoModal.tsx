import { Dialog } from "@ark-ui/solid";
import {
  SubmitHandler,
  createForm,
  maxLength,
  required,
  reset,
} from "@modular-forms/solid";
import { Accessor, Component, Setter } from "solid-js";
import toast from "solid-toast";

import { Button } from "~/design/Button";
import { Input } from "~/design/Input";
import { Modal } from "~/design/Modal";
import { Stack } from "~/design/Stack";
import { usePanelContext } from "~/providers";
import { Todo } from "~/types";
import { ToastStyle } from "~/utils";

type TodoForm = {
  todo: string;
};

interface CreateTodoModalProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

export const CreateTodoModal: Component<CreateTodoModalProps> = (props) => {
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
    <Dialog open={props.isOpen()} onClose={() => props.setIsOpen(false)}>
      <Modal isOpen={props.isOpen}>
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
                    onClick={() => props.setIsOpen(false)}
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
      </Modal>
    </Dialog>
  );
};
