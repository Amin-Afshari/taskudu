import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import ToDoList from "./_components/to-do-list";
import { redirect } from "next/navigation";
import LogOutButton from "./_components/log-out-button";
import PortfolioLink from "@/components/ui/portfolio-link";

export default async function Home() {
  const session = await auth();
  let userToDoList: Todo[] = [];
  if (!session) {
    redirect("/auth/signup");
  }
  if (session.user) {
    userToDoList = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center space-y-10 py-20 sm:py-32 px-14 sm:items-start">
        <div className="w-full flex flex-col gap-4 justify-center">
          <div className="flex flex-col gap-2 text-xs">
            <h1 className="text-4xl w-full font-bold text-center">Taskudu</h1>
            <div className="w-full flex gap-2 items-center justify-center">
              <span className="-translate-y-px">By:</span> <PortfolioLink />
            </div>
          </div>
          <h4 className="text-lg font-medium text-center">
            Hello, {session.user?.email}
          </h4>
          <LogOutButton />
        </div>
        <ToDoList todos={userToDoList} />
      </main>
    </div>
  );
}
