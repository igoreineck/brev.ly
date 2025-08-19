import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    pool: 'forks', // Run tests in separate processes for better isolation
    poolOptions: {
      forks: {
        singleFork: true, // All tests in same fork to share database state
      }
    }
  },
});
