import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg'; 

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing in environment variables.");
}

const client = new Client({
    connectionString: databaseUrl,
});

async function runMigration() {
    try {
        await client.connect();
        
        const db = drizzle(client);

        console.log("Starting database migration...");
        
        await migrate(db, { migrationsFolder: "./drizzle" });
        
        console.log("Migration successful!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await client.end();
        console.log("Database connection closed.");
    }
}

runMigration();