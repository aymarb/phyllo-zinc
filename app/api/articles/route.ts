import { NextResponse } from 'next/server';
import { db } from '@/lib/index'; // The Drizzle DB connection instance
import { articles } from '@/lib/db/schema'; // The articles table definition
import { eq, desc } from 'drizzle-orm'; // Helper functions from Drizzle
import { insertArticleSchema } from '@/lib/db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const publishedArticles = await db.select()
      .from(articles)
      .where(eq(articles.status, 'published')) 
      .orderBy(desc(articles.createdAt));

    return NextResponse.json(publishedArticles);
    
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { message: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = insertArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.error.flatten() },
        { status: 400 }
      );
    }
    const validatedData = validation.data;
    
    const newId = validatedData.id || uuidv4(); 

    const [newArticle] = await db.insert(articles).values({
      ...validatedData,
      id: newId,
    }).returning();

    return NextResponse.json(newArticle, { status: 201 });

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { message: 'Failed to create article' },
      { status: 500 }
    );
  }
}