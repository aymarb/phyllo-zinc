import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./index"; // your drizzle instance
import * as schema from "./db/schema";

// Get the current origin from environment or use defaults
const getOrigins = () => {
  const origins = [
    "http://localhost:3000",
    "https://phyllo-zinc-final-deployment.vercel.app",
  ];
  
  // Add VERCEL_URL if available (for preview deployments)
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`);
  }
  
  return origins;
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: getOrigins(),
});
