import TodoListSSR from "./_components/TodoListSSR";
import Hero from "./_components/Hero";
import { Suspense } from "react";

export default async function Home() {
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
