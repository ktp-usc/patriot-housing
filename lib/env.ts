import fs from "node:fs";
import path from "node:path";

function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function loadDotEnv(): Record<string, string> {
  const envPath = path.join(process.cwd(), ".env");

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    return parseEnvFile(content);
  }

  return {};
}

export function getServerEnv(key: string): string | undefined {
  const runtimeValue = process.env[key];
  if (typeof runtimeValue === "string" && runtimeValue.length > 0) {
    return runtimeValue;
  }

  const value = loadDotEnv()[key];
  return value && value.length > 0 ? value : undefined;
}

export function ensureProcessEnvFromDotEnv(keys: string[]): void {
  const values = loadDotEnv();

  for (const key of keys) {
    if (typeof process.env[key] === "string" && process.env[key]!.length > 0) {
      continue;
    }

    const value = values[key];
    if (typeof value === "string" && value.length > 0) {
      process.env[key] = value;
    }
  }
}
