//index.ts
import { drizzle } from "drizzle-orm/better-sqlite3"; //Bringing in drizzle ORM
import { migrate } from "drizzle-orm/better-sqlite3/migrator"; //Will run every time the server starts and migrates the database when the schema changes
import Database from "better-sqlite3"; //Bringing in database driver 
import { publicProcedure, router } from "./trpc";
import { todos } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
const sqlite = new Database("./database/testDB.db");
const db = drizzle(sqlite);

migrate(db, {
    migrationsFolder: "./drizzle/migrations",
});

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return await db.select().from(todos).all();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        const result = await db.insert(todos).values({ content: opts.input, done: 0 }).run();
        return { id: result.lastInsertRowid, content: opts.input, done: 0 };
    }),
    setDone: publicProcedure
    .input(
        z.object({
            id: z.number(),
            done: z.number(),
        })
    )
    .mutation(async (opts) => {
        await db
        .update(todos)
        .set({ done: opts.input.done })
        .where(eq(todos.id, opts.input.id))
        .run();
        return true;
    }),
    deleteTodo: publicProcedure.input(z.number()).mutation(async (opts) => {
        await db.delete(todos).where(eq(todos.id, opts.input)).run();
        return opts.input;
    }),
});

export type AppRouter = typeof appRouter;