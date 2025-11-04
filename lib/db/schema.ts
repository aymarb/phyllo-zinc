import { text, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const articles = pgTable("articles", {
  id: text("id").primaryKey(), 
  title: text("title").notNull(),          // The main headline, must not be empty
  excerpt: text("excerpt").notNull(),      // Short summary
  content: text("content").notNull(),      // The full article body
  image: text("image"),                    // URL/path to the main featured image
  date: text("date").notNull(),            // Publication date (stored as text)
  author: text("author").notNull(),        // The name of the author
  category: text("category").notNull(),    // The topic category
  readTime: text("read_time"),             // e.g., "8 min read"
  status: text("status").default('published').notNull(), // 'draft' or 'published'
  createdAt: timestamp("created_at").defaultNow().notNull(), // Automatically set when created
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Automatically updated whenever a change is saved
});

export const insertArticleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required." }),
  excerpt: z.string().min(1, { message: "Excerpt is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  image: z.string().optional(),
  date: z.string().min(1, { message: "Date is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  readTime: z.string().optional(),
  status: z.enum(['draft', 'published']).default('published').optional(),
});

export const updateArticleSchema = insertArticleSchema.partial();