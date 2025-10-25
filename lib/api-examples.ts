export const getArticlesExample = `
import { articlesStore } from '@/lib/data-store'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  
  let articles = articlesStore.getAll()
  
  if (category) {
    articles = articles.filter(a => a.category === category)
  }
  
  return Response.json(articles)
}
`

/**
 * Example: GET /api/articles/[id]
 * Fetch a single article by ID
 */
export const getArticleByIdExample = `
import { articlesStore } from '@/lib/data-store'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = articlesStore.getById(params.id)
  
  if (!article) {
    return Response.json({ error: 'Article not found' }, { status: 404 })
  }
  
  return Response.json(article)
}
`

/**
 * Example: POST /api/articles
 * Create a new article
 */
export const createArticleExample = `
import { articlesStore } from '@/lib/data-store'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Validate required fields
  if (!data.title || !data.excerpt || !data.author) {
    return Response.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }
  
  const article = articlesStore.create(data)
  return Response.json(article, { status: 201 })
}
`

/**
 * Example: PUT /api/articles/[id]
 * Update an article
 */
export const updateArticleExample = `
import { articlesStore } from '@/lib/data-store'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json()
  const article = articlesStore.update(params.id, data)
  
  if (!article) {
    return Response.json({ error: 'Article not found' }, { status: 404 })
  }
  
  return Response.json(article)
}
`

/**
 * Example: DELETE /api/articles/[id]
 * Delete an article
 */
export const deleteArticleExample = `
import { articlesStore } from '@/lib/data-store'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = articlesStore.delete(params.id)
  
  if (!success) {
    return Response.json({ error: 'Article not found' }, { status: 404 })
  }
  
  return Response.json({ message: 'Article deleted' })
}
`

/**
 * Example: GET /api/team
 * Fetch all team members
 */
export const getTeamExample = `
import { teamStore } from '@/lib/data-store'

export async function GET() {
  const members = teamStore.getAll()
  return Response.json(members)
}
`
