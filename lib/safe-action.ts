import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { auth } from "@/auth";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { metadata } = utils;
    console.error(metadata?.actionName, "action error:", e);

    return { message: e.message, success: false, status: 500 };
  },
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();

  const result = await next();

  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");

  return result;
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("You are not authenticated. Please log in to continue");
    }
    return next({
      ctx: { userId: session.user?.id },
    });
  });
