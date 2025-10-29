"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { credentialsSchema } from "../_schemas/credentials-schema";
import { signUpAction } from "../_actions/sign-up";
import { Controller } from "react-hook-form";
import { Loader } from "lucide-react";

export default function SignUpForm() {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    signUpAction,
    zodResolver(credentialsSchema),
    {
      formProps: {
        defaultValues: {
          email: "",
          password: "",
        },
      },
      actionProps: {
        async onSuccess() {
          toast.success("Welcome to Taskudu!");
        },
        async onError(error) {
          toast.error(error.error.serverError?.message);
        },
      },
    }
  );
  return (
    <div className="flex flex-col w-full items-center justify-start space-y-10">
      <h3>
        Sign up to start <span className="font-bold">Taskudu</span>ing
      </h3>
      <form
        className="flex flex-1 w-full max-w-sm"
        onSubmit={handleSubmitWithAction}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  type="email"
                  className="rounded-full"
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="email@example.com"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  type="password"
                  className="rounded-full"
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="******"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            disabled={action.isExecuting}
            className="rounded-full"
            type="submit"
          >
            {action.isExecuting ? (
              <Loader className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
