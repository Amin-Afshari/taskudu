"use server";

import { ActionError, authActionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

export const toggleToDoStatusAction = authActionClient
  .metadata({ actionName: "toggle-to-do-status" })
  .inputSchema(
    z.object({
      id: z.string(),
      status: z.boolean(),
    })
  )
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
        completed: !parsedInput.status,
      },
    });
    revalidatePath("/");
  });
