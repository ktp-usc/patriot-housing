import { config } from "dotenv";

// Load .env.local for Prisma CLI commands (db push, migrate, etc.)
config({ path: ".env.local" });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
