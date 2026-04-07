import { defineConfig } from "prisma/config";
import { getServerEnv } from "./lib/env";

const databaseUrl = getServerEnv("DATABASE_URL");

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in .env");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
