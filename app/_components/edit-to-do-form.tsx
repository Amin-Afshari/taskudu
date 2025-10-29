import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { editToDoSchema } from "../_schemas/to-do-schema";
import { EditToDoAction } from "../_actions/edit-to-do";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Todo } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { toggleToDoStatusAction } from "../_actions/toggle-to-do-status";
import { cn } from "@/lib/utils";
import { Loader, Trash2 } from "lucide-react";
import { removeToDoAction } from "../_actions/remove-to-do";
import { Button } from "@/components/ui/button";

export default function EditToDoForm({ todo }: { todo: Todo }) {
  const markComplete = useAction(toggleToDoStatusAction);
  const removeToDo = useAction(removeToDoAction);
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    EditToDoAction,
    zodResolver(editToDoSchema),
    {
      formProps: {
        defaultValues: {
          id: todo.id,
          title: todo.title,
          description: todo.description ?? "",
        },
      },
      actionProps: {
        async onSuccess() {
          toast.success("Task updated successfully!");
        },
        async onError(error) {
          toast.error(error.error.serverError?.message);
        },
      },
    }
  );
  return (
    <form
      className="flex flex-1 w-full"
      onSubmit={(e) => {
        // prevent re-submit while executing
        if (action.isExecuting) {
          e.preventDefault();
          return;
        }
        handleSubmitWithAction(e);
      }}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only" htmlFor="task-title">
                Task Title
              </FieldLabel>
              <div className="relative">
                <Input
                  className={cn(
                    "pl-8 pr-4 rounded-full",
                    todo.completed &&
                      "bg-muted text-muted-foreground pointer-events-none pr-6"
                  )}
                  readOnly={todo.completed}
                  {...field}
                  id="task-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="What's on your mind?"
                />

                <button
                  className={cn(
                    "rounded-full border border-primary flex items-center justify-center size-6 absolute top-1/2 -translate-y-1/2 left-1 transition-colors duration-100 cursor-pointer",
                    todo.completed ? "bg-primary text-primary-foreground" : ""
                  )}
                  type="button"
                  onClick={() =>
                    markComplete.executeAsync({
                      id: todo.id,
                      status: todo.completed,
                    })
                  }
                  disabled={markComplete.isExecuting}
                >
                  {markComplete.isExecuting && (
                    <Loader size={16} className="animate-spin" />
                  )}
                </button>
                {todo.completed && (
                  <Button
                    variant="ghost"
                    className={cn(
                      "rounded-full flex items-center justify-center size-6 absolute top-1/2 -translate-y-1/2 right-1 transition-colors duration-100 cursor-pointer"
                    )}
                    type="button"
                    onClick={() =>
                      removeToDo.executeAsync({
                        id: todo.id,
                      })
                    }
                    disabled={removeToDo.isExecuting}
                  >
                    {removeToDo.isExecuting ? (
                      <Loader size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </Button>
                )}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
