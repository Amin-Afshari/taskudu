"use server";

import { ActionError, authActionClient } from "@/lib/safe-action";
import { toDoSchema } from "../_schemas/to-do-schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addToDoAction = authActionClient
  .metadata({ actionName: "add-to-do" })
  .inputSchema(toDoSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    if (!userId) {
      throw new ActionError(
        "You are not authenticated. Please log in to continue"
      );
    }
    await prisma.todo.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        userId,
      },
    });
    revalidatePath("/");
  });
