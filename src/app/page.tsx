import TodoListSSR from "./_components/TodoListSSR";
import Hero from "./_components/Hero";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <Hero />
      <TodoListSSR />
    </main>
  );
}