import SignUpForm from "@/app/_components/signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center space-y-16 py-20 sm:py-32 px-14 sm:items-start">
        <h1 className="text-4xl w-full font-bold text-center">Taskudu</h1>
        <SignUpForm />
      </main>
    </div>
  );
}
