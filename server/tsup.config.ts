import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  clean: true,
  format: "esm",
  outDir: "dist",
  target: "esnext",
  external: ["dotenv/config"],
  loader: {
    ".sql": "text",
  },
});
