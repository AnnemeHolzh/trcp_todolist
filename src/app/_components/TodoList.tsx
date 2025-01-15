"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "../_trpc/client";
import FloatingTodos from "./FloatingTodos";

interface Todo {
  id: number;
  content: string;
  done: number;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos || []);
  const utils = trpc.useContext();
  
  const { data, error, isLoading } = trpc.getTodos.useQuery();

  const addTodo = trpc.addTodo.useMutation({
    onSuccess: (newTodo: Todo) => {
      setTodos((prev) => [...prev, newTodo]);
      utils.getTodos.invalidate();
    },
  });

  const setDone = trpc.setDone.useMutation({
    onSuccess: () => {
      utils.getTodos.invalidate();
    },
  });

  const deleteTodo = trpc.deleteTodo.useMutation({
    onSuccess: (id: number) => {
      setTodos((prev) => prev.filter(todo => todo.id !== id));
      utils.getTodos.invalidate();
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.length) {
      e.preventDefault();
      addTodo.mutate(content);
      setContent("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching todos:", error);
    return <div>Error fetching todos</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-2xl">
      <FloatingTodos todos={todos} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">What&apos;s on your mind?</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow px-6 py-4 text-lg bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-all duration-300"
            placeholder="Add a new task..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              if (content.length) {
                addTodo.mutate(content);
                setContent("");
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-300"
          >
            Add Task
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="space-y-4"
      >
        <AnimatePresence>
          {data.map((todo) => (
            <motion.div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${todo.done ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'}`}
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDone.mutate({
                      id: todo.id,
                      done: todo.done ? 0 : 1,
                    });
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${todo.done ? 'border-green-500 bg-green-500' : 'border-gray-300 hover:border-blue-400'}`}
                >
                  {todo.done && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </motion.button>
                <span className={`text-lg ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.content}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTodo.mutate(todo.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}