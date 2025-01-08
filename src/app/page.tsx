import TodoList from "./_components/TodoList";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-24">
      <div className="w-full ">
        <Hero />
      </div>
      <div className="flex justify-center w-full">
        <TodoList />
      </div>
    </main>
  );
}
