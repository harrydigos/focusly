import {
  Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { Checkbox } from "@kobalte/core";
import { TbCheck, TbEdit, TbGripVertical, TbTrash } from "solid-icons/tb";
import {
  closestCenter,
  createSortable,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import toast from "solid-toast";
import { useWindowSize } from "@solid-primitives/resize-observer";

import { AnimatePanel } from "~/components/AnimatePanel";
import { Draggable } from "~/components/Draggable";
import { Button } from "~/design/Button";
import { Input } from "~/design/Input";
import { Stack } from "~/design/Stack";
import { GlassBox } from "~/design/GlassBox";
import { Tooltip } from "~/design/Tooltip";
import { useCursorPositionContext, usePanelContext } from "~/providers";
import { Todo } from "~/types";
import { ToastStyle } from "~/utils";

import { CreateTodoDialog } from "./CreateTodoDialog";

export const Todos: Component = () => {
  const { todos, setTodos } = usePanelContext();
  const { cursorPosition } = useCursorPositionContext();
  const windowSize = useWindowSize();

  const [reorder, setReorder] = createSignal(false);
  const ids = () => todos.todosList.map((t) => t.id);

  const onDragEnd = (obj: any) => {
    if (obj.draggable && obj.droppable) {
      const fromIndex = ids().indexOf(obj.draggable.id);
      const toIndex = ids().indexOf(obj.droppable.id);

      if (fromIndex !== toIndex) {
        const updatedItems = ids().slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setTodos("todosList", () =>
          updatedItems
            .map((id) => todos.todosList.find((t) => t.id === id)!)
            .filter((t) => t !== null),
        );
      }
    }
  };

  const initialPosition = {
    x: windowSize.width / 2,
    y: 40,
  };

  return (
    <AnimatePanel
      from={cursorPosition() ?? initialPosition}
      to={todos.position}
    >
      <Show when={todos.isOpen}>
        <Draggable tab={todos} setTab={setTodos} disabled={reorder()}>
          <GlassBox
            direction="flex-col"
            class="max-h-[500px] w-[340px] gap-4 px-0 sm:w-[440px]"
          >
            <Stack
              direction="flex-row"
              class="select-none items-center justify-between px-6"
            >
              <h1 class="text-xl font-semibold">Todos</h1>
              <CreateTodoDialog />
            </Stack>
            <DragDropProvider
              onDragEnd={onDragEnd}
              collisionDetector={closestCenter}
            >
              <DragDropSensors />
              <Stack
                direction="flex-col"
                class="overflow-y-auto"
                onMouseEnter={() => setReorder(true)}
                onMouseLeave={() => setReorder(false)}
              >
                <SortableProvider ids={ids()}>
                  <For
                    each={todos.todosList}
                    fallback={
                      <span class="select-none text-center text-sm text-stone-200">
                        No todos yet. Add one by clicking the button above.
                      </span>
                    }
                  >
                    {(todo) => <TodoRow todo={todo} />}
                  </For>
                </SortableProvider>
              </Stack>

              {/* This is necessary */}
              <DragOverlay>
                <div class="hidden" />
              </DragOverlay>
            </DragDropProvider>
          </GlassBox>
        </Draggable>
      </Show>
    </AnimatePanel>
  );
};

const TodoRow: Component<{ todo: Todo }> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const sortable = createSortable(props.todo.id);
  const ctx = useDragDropContext();

  const { todos, setTodos } = usePanelContext();
  const [isEditing, setIsEditing] = createSignal(false);
  let el: HTMLInputElement | undefined;

  const winSize = useWindowSize();

  createEffect(() => {
    if (isEditing()) {
      el?.focus();
    }
  });

  const todoIndex = createMemo(() =>
    todos.todosList.findIndex((t) => t.id === props.todo.id),
  );

  const toggleTodo = () => {
    setTodos("todosList", todoIndex(), "completed", (prev) => !prev);
  };

  const deleteTodo = () => {
    // eslint-disable-next-line solid/reactivity
    setTodos("todosList", (prev) => prev.filter((t) => t.id !== props.todo.id));
    toast.success("Todo deleted!", {
      style: ToastStyle,
      duration: 3000,
    });
  };

  const updateTodo = (value: string) => {
    const isInRange = value.length > 0 && value.length <= 150;
    if (!isInRange) return;
    setTodos("todosList", todoIndex(), "value", () => value);
  };

  const canSeeGrip = createMemo(
    () => winSize.width > 640 && todos.todosList.length > 1,
  );

  return (
    <div
      // @prettier-ignore
      use:sortable
      classList={{
        "opacity-30": sortable.isActiveDraggable && canSeeGrip(),
        "transition-transform cursor-grabbing": !!ctx?.[0].active.draggable,
        "cursor-grab": !ctx?.[0].active.draggable,
      }}
    >
      <Stack
        direction="flex-row"
        class="group relative justify-between px-6 py-0.5"
      >
        <Show when={canSeeGrip()}>
          {/* Both Shows are needed, cuz to reorder, you need to place the cursor above another TodoRow */}
          <Show when={ctx?.[0].active.draggable?.id === props.todo.id}>
            <TbGripVertical
              size={16}
              class="absolute left-1 top-1/2 -translate-y-1/2 stroke-white/80"
            />
          </Show>
          <Show when={!ctx?.[0].active.draggable}>
            <TbGripVertical
              size={16}
              class="absolute left-1 top-1/2 -translate-y-1/2 stroke-white/40 opacity-0 group-hover:opacity-100"
            />
          </Show>
        </Show>

        <Stack direction="flex-row" class="cursor-pointer gap-2">
          <Checkbox.Root
            class="flex cursor-pointer flex-row gap-2"
            checked={props.todo.completed}
            onChange={toggleTodo}
          >
            <Checkbox.Input />
            <Checkbox.Control class="mt-2 h-4 w-4 rounded-[4px] bg-stone-900">
              <Show when={props.todo.completed}>
                <TbCheck size={16} class="stroke-white" />
              </Show>
            </Checkbox.Control>
            <Show when={!isEditing()}>
              <Checkbox.Label
                class="flex h-full min-h-[32px] max-w-[190px] select-none items-center overflow-hidden break-words text-sm sm:max-w-[280px]"
                classList={{
                  "line-through opacity-50": props.todo.completed,
                }}
              >
                {props.todo.value}
              </Checkbox.Label>
            </Show>
          </Checkbox.Root>

          <Show when={isEditing()}>
            <Input
              ref={el}
              class="h-8 sm:w-[280px]"
              onBlur={() => setIsEditing(false)}
              autofocus
              spellcheck={false}
              value={props.todo.value}
              onInput={(e) => updateTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setIsEditing(false);
                }
              }}
            />
          </Show>
        </Stack>

        <Stack direction="flex-row" class="gap-1">
          <Show when={!isEditing()}>
            <Tooltip
              description="Edit"
              placement="left"
              gutter={2}
              arrowSize={16}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <TbEdit size={20} />
              </Button>
            </Tooltip>
          </Show>
          <Tooltip
            description="Delete"
            placement="right"
            gutter={2}
            arrowSize={16}
          >
            <Button variant="ghost" size="icon" onClick={deleteTodo}>
              <TbTrash size={20} class="stroke-red-500" />
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </div>
  );
};
