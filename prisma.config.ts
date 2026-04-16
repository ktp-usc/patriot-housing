import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing from the environment");
}

export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        url: databaseUrl,
    },
});
