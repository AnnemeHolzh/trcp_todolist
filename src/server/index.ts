//index.ts
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

let todos: { id: number; content: string; done: number }[] = [];
let nextId = 1;

export const appRouter = router({
    getTodos: publicProcedure.query(() => {
        return todos;
    }),
    addTodo: publicProcedure.input(z.string()).mutation((opts) => {
        const newTodo = { id: nextId++, content: opts.input, done: 0 };
        todos.push(newTodo);
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