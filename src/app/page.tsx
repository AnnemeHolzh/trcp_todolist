import Hero from "./_components/Hero";
import { Suspense } from "react";
import { serverClient } from "./_trpc/serverClient";
import TodoListWrapper from "./_components/TodoListWrapper";

export default async function Home() {
  const todos = await serverClient.getTodos.query();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <Hero />
      <TodoListWrapper />
    </main>
  );
}