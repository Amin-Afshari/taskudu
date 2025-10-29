import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { toDoSchema } from "../_schemas/to-do-schema";
import { addToDoAction } from "../_actions/add-to-do";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddToDoForm() {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    addToDoAction,
    zodResolver(toDoSchema),
    {
      formProps: {
        defaultValues: {
          title: "",
          description: "",
        },
      },
      actionProps: {
        async onSuccess() {
          toast.success("Task added successfully!");
          form.reset({
            title: "",
            description: "",
          });
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
            <Field data-invalid={fieldState.invalid} className="min-h-17">
              <FieldLabel className="sr-only" htmlFor="task-title">
                Task Title
              </FieldLabel>
              <div className="relative">
                <Input
                  className="sm:pr-10 py-6 rounded-full"
                  {...field}
                  id="task-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="What's on your mind?"
                />

                <Button
                  className="rounded-full absolute size-7 right-2 top-1/2 -translate-y-1/2 hidden sm:flex"
                  size="icon"
                  type="submit"
                >
                  <Plus />
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
