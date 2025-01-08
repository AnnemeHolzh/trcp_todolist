import TodoList from "./_components/TodoList";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start">
      <section className="hero-section w-full h-screen flex items-center justify-center">
        <Hero />
      </section>
      <section className="w-full h-screen flex items-center justify-center">
        <TodoList />
      </section>
    </main>
  );
}
