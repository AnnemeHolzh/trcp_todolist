import Hero from "./_components/Hero";
import { Suspense } from "react";
import { serverClient } from "./_trpc/serverClient";
import TodoListWrapper from "./_components/TodoListWrapper";
import TodoList from "./_components/TodoList";

export default async function Home() {
  const todos = await serverClient.getTodos.query();
  return (
    <main className="flex flex-col items-center justify-start">
      <section className="hero-section w-full h-screen flex items-center justify-center">
        <Hero />
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <TodoList />
        </Suspense>
      </section>
    </main>
  );
}