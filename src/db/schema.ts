//schema.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content"),
    done: integer("done").default(0), //0 = false, 1 = true
});