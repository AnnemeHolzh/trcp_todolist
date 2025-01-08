import { dehydrate, QueryClient, Hydrate } from '@tanstack/react-query';
import { serverClient } from "../_trpc/serverClient";
import TodoList from "./TodoList";

export default async function TodoListSSR() {
  const queryClient = new QueryClient();
  const initialTodos = await serverClient.getTodos.query();
  
  await queryClient.prefetchQuery(['getTodos'], () => initialTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TodoList initialTodos={initialTodos} />
    </Hydrate>
  );
}