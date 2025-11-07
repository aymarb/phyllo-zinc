import { db } from "@/lib/index";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const whitelist = await db
    .select()
    .from(user)
    .where(eq(user.emailVerified, true));

  return Response.json(whitelist);
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email)
    return Response.json({ error: "Email required" }, { status: 400 });

  const existing = await db.select().from(user).where(eq(user.email, email));
  if (existing.length === 0)
    return Response.json({ error: "User not found" }, { status: 404 });

  await db
    .update(user)
    .set({ emailVerified: true })
    .where(eq(user.email, email));

  const updated = await db.select().from(user).where(eq(user.email, email));
  return Response.json(updated[0]);
}
