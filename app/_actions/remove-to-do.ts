"use server";

import { ActionError, authActionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

export const removeToDoAction = authActionClient
  .metadata({ actionName: "remove-to-do" })
  .inputSchema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { userId } }) => {
    if (!userId) {
      throw new ActionError(
        "You are not authenticated. Please log in to continue"
      );
    }
    await prisma.todo.delete({
      where: {
        id: parsedInput.id,
        userId,
      },
    });
    revalidatePath("/");
  });
