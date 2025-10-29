import z from "zod";

export const toDoSchema = z.object({
  title: z.string().min(5, "Task title must be at least 5 characters."),
  description: z.string().optional(),
});

export const editToDoSchema = z.object({
  id: z.string(),
  title: z.string().min(5, "Task title must be at least 5 characters."),
  description: z.string().optional(),
});
