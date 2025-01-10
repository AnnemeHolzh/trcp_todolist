"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "../_trpc/client";
import FloatingTodos from "./FloatingTodos";

interface Todo {
  id: number;
  content: string;
  done: number;
  children?: Todo[];
}

interface TodoListProps {
  initialTodos?: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos }) => {
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

  const handleAddTodo = (parentId?: number) => {
    if (content.length) {
      addTodo.mutate({ content, parentId });
      setContent("");
    }
  };

  const renderTodos = (todos: Todo[]) => {
    return todos.map((todo) => (
      <motion.div key={todo.id} className="todo-item">
        <div className="flex items-center justify-between">
          <span className={`text-lg ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.content}
          </span>
          <button onClick={() => handleAddTodo(todo.id)}>Add Subtask</button>
        </div>
        <div className="ml-4">
          <AnimatePresence>
            {todo.children && todo.children.length > 0 && (
              <motion.div>
                {renderTodos(todo.children)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching todos:", error);
    return <div>Error fetching todos</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-2xl">
      <FloatingTodos todos={todos} />
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">What&apos;s on your mind?</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow px-6 py-4 text-lg bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-all duration-300"
            placeholder="Add a new task..."
          />
          <button onClick={() => handleAddTodo()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-300">
            Add Task
          </button>
        </div>
      </motion.div>
      <motion.div className="space-y-4">
        <AnimatePresence>
          {data.map((todo) => renderTodos([todo]))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TodoList;