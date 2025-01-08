"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState("");

  const handleDelete = (todoId: number) => {
    deleteTodo.mutate(todoId);
  };

  const handleSingleClick = (todo: any) => {
    setDone.mutate({
      id: todo.id,
      done: todo.done ? 0 : 1,
    });
  };

  const handleDoubleClick = (todoId: number) => {
    handleDelete(todoId);
  };

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {getTodos?.data?.map((todo) => (
          <div
            key={todo.id}
            className="flex gap-3 items-center hover:bg-red-200 transition duration-300 ease-in-out rounded-lg cursor-pointer p-2"
            onClick={() => handleSingleClick(todo)}
            onDoubleClick={() => handleDoubleClick(todo.id)}
          >
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={(e) => {
                e.stopPropagation();
                handleSingleClick(todo);
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content);
              setContent("");
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
