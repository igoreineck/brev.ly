import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

/**
 * Clean the entire test database (all tables)
 * Used by the test:clean script
 */
export async function cleanTestDatabase() {
  await db.delete(schema.links);
  
  // Add future tables here as your schema grows:
  // await db.delete(schema.users);
  // await db.delete(schema.analytics);
  
  console.log("✅ Test database cleaned");
}

/**
 * ✅ SIMPLE CLEANUP PATTERN
 * 
 * Each test file cleans the database before it starts.
 * This ensures test isolation without complex hooks.
 * 
 * @example
 * import { describe, it, beforeAll } from "vitest";
 * import { cleanTestDatabase } from "@/test/setup";
 * 
 * describe("my feature", () => {
 *   beforeAll(async () => {
 *     await cleanTestDatabase();
 *   });
 *   
 *   it("should work", async () => {
 *     // Your test here
 *   });
 * });
 */