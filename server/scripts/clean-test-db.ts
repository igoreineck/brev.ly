import { cleanTestDatabase } from "../src/test/setup";

async function main() {
  try {
    await cleanTestDatabase();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error cleaning test database:", error);
    process.exit(1);
  }
}

main();
