import TodoListSSR from "./_components/TodoListSSR";
import Hero from "./_components/Hero";
import { Suspense } from "react";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.getTodos.query();

  return (
    <main className="flex flex-col items-center justify-start">
      <section className="hero-section w-full h-screen flex items-center justify-center">
        <Hero />
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <TodoListSSR />
        </Suspense>
      </section>
    </main>
  );
}