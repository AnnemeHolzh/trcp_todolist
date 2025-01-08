import Hero from "./_components/Hero";
import TodoListWrapper from "./_components/TodoListWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <Hero />
      <TodoListWrapper />
    </main>
  );
}