import Hero from "./_components/Hero";
import { Suspense } from "react";
import { serverClient } from "./_trpc/serverClient";
import TodoList from "./_components/TodoList";

export default async function Home() {
  let todos: { id: number; done: number; content: string; }[] | undefined;
  try {
    todos = await serverClient.getTodos.query();
  } catch (error) {
    console.error("Error fetching todos:", error);
    todos = []; // Fallback to an empty array or handle the error as needed
  }

  return (
    <main className="flex flex-col items-center justify-start">
      <section className="hero-section w-full h-screen flex items-center justify-center">
        <Hero />
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <TodoList initialTodos={todos} />
        </Suspense>
      </section>
    </main>
  );
}