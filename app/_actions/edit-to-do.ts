"use server";

import { ActionError, authActionClient } from "@/lib/safe-action";
import { editToDoSchema } from "../_schemas/to-do-schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const EditToDoAction = authActionClient
  .metadata({ actionName: "edit-to-do" })
  .inputSchema(editToDoSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    if (!userId) {
      throw new ActionError(
        "You are not authenticated. Please log in to continue"
      );
    }
    await prisma.todo.update({
      where: {
        id: parsedInput.id,
        userId,
      },
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        userId,
      },
    });
    revalidatePath("/");
  });
