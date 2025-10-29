"use server";

import { actionClient } from "@/lib/safe-action";
import { credentialsSchema } from "../_schemas/credentials-schema";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

export const signUpAction = actionClient
  .metadata({ actionName: "sign up" })
  .inputSchema(credentialsSchema)
  .action(async ({ parsedInput }) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedInput.email,
      },
    });
    if (!existingUser) {
      const pwHash = await bcrypt.hash(parsedInput.password, 10);
      await prisma.user.create({
        data: {
          email: parsedInput.email,
          password: pwHash,
        },
      });
    }

    await signIn("credentials", {
      email: parsedInput.email,
      password: parsedInput.password,
      redirectTo: "/",
    });
  });
