"use client";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Todo } from "@prisma/client";
import { ClipboardCheck } from "lucide-react";
import AddToDoForm from "./add-to-do-form";
import EditToDoForm from "./edit-to-do-form";

export default function ToDoList({ todos }: { todos: Todo[] }) {
  if (todos.length > 0) {
    return (
      <div className="flex flex-col space-y-4 w-full">
        <AddToDoForm />
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <EditToDoForm key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardCheck />
          </EmptyMedia>
          <EmptyTitle>No tasks yet</EmptyTitle>
          <EmptyDescription>Add a new task to get started</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <AddToDoForm />
        </EmptyContent>
      </Empty>
    );
  }
}
