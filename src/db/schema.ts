//schema.ts
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content"),
    done: integer("done").default(0), //0 = false, 1 = true
});

// export const notebooks = sqliteTable("notebooks", {
//     notebookId: integer("id").primaryKey({ autoIncrement: true }),
//     id: integer("id").references(() => todos.id),
//     name: text("name"),
// });

