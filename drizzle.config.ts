//drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: "./database/testDB.db"
  }
});

//psst this is what i came up with, no idea what to do for the db url thingy because it just made it's own file