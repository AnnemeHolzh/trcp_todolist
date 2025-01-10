//index.ts
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

interface Todo {
  id: number;
  content: string;
  done: number;
  children?: Todo[]; // Optional property for nesting
}

let todos: Todo[] = [];
let nextId = 1;

export const appRouter = router({
    getTodos: publicProcedure.query(() => {
        return todos;
    }),
    addTodo: publicProcedure.input(z.object({
        content: z.string(),
        parentId: z.number().optional(),
    })).mutation((opts) => {
        const newTodo = { id: nextId++, content: opts.input.content, done: 0, children: [] };
        if (opts.input.parentId) {
            const parentTodo = todos.find(todo => todo.id === opts.input.parentId);
            if (parentTodo && parentTodo.children) {
                parentTodo.children.push(newTodo);
            }
        } else {
            todos.push(newTodo);
        }
        return newTodo;
    }),
    setDone: publicProcedure
        .input(
            z.object({
                id: z.number(),
                done: z.number(),
            })
        )
        .mutation((opts) => {
            const todo = todos.find(todo => todo.id === opts.input.id);
            if (todo) {
                todo.done = opts.input.done;
            }
            return true;
        }),
    deleteTodo: publicProcedure.input(z.number()).mutation((opts) => {
        todos = todos.filter(todo => todo.id !== opts.input);
        return opts.input;
    }),
});

export type AppRouter = typeof appRouter;