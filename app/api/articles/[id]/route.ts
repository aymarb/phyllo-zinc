import { NextResponse } from 'next/server';
import { db } from '@/lib/index';
import { articles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { updateArticleSchema } from '@/lib/db/schema';

/**
 * Handle GET requests to /api/articles/[id]
 * Fetches a single article by its ID from the URL parameters.
 */
export async function GET(
  request: Request,
  // This clean destructuring is critical for the Route Handler:
  { params }: { params: { id: string } } 
) {
  // This line should now work correctly without error:
  const articleId = (await params).id;

  try {
    const result = await db.select()
      .from(articles)
      .where(eq(articles.id, articleId))
      .limit(1);

    const article = result[0];

    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
    
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return NextResponse.json(
      { message: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const articleId = (await params).id;
  try {
    const body = await request.json();

    const validation = updateArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.error.flatten() },
        { status: 400 }
      );
    }
    const validatedData = validation.data;
    
    const [updatedArticle] = await db.update(articles)
      .set(validatedData)
      .where(eq(articles.id, articleId))
      .returning();

    if (!updatedArticle) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);

  } catch (error) {
    console.error(`Error updating article ${articleId}:`, error);
    return NextResponse.json(
      { message: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const articleId = (await params).id;
  try {
    const [deletedArticle] = await db.delete(articles)
      .where(eq(articles.id, articleId))
      .returning();

    if (!deletedArticle) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Article deleted successfully' });

  } catch (error) {
    console.error(`Error deleting article ${articleId}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete article' },
      { status: 500 }
    );
  }
}