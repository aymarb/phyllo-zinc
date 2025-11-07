import { Leaf, ArrowLeft, Calendar, User } from "lucide-react";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";

// Define the shape of the data we expect from the API
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

// Async function to fetch a single article from the backend
async function getArticle(id: string): Promise<Article | null> {
  // Use the full URL and disable caching
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/articles/${id}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    // If the API returns 404, the article doesn't exist
    return null;
  }

  if (!res.ok) {
    // Handle other server errors
    console.error(`Failed to fetch article ${id}`, await res.text());
    throw new Error("Failed to fetch article data");
  }

  // Return the article data
  return res.json();
}

export default async function ArticlePage({
  // Use params directly in the destructured object
  params,
}: {
  // Use the type for the full destructured object
  params: { id: string };
}) {
  // The error points to the usage of params.id.
  // By using the simple signature above, we guarantee Next.js resolves it.
  const article = await getArticle(params.id);

  if (!article) {
    // Display the Not Found UI if no data was returned
    return (
      <main className="min-h-screen bg-background text-foreground">
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-green-700 transition"
            >
              <Leaf className="w-6 h-6 text-green-700" />
              <span className="font-semibold text-lg">Phyllo Zinc</span>
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-light mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/articles"
            className="text-green-700 hover:underline font-medium"
          >
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  // If the article exists, render the content using the fetched data
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation (unchanged) */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-700 transition"
          >
            <img
              src="/phyllozinc.png"
              alt="PhylloZinc Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold text-lg">Phyllo Zinc</span>
          </Link>
          <Link
            href="/articles"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Articles</span>
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden bg-green-50">
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {article.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light leading-tight text-balance">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="text-sm">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{article.date}</span>
              </div>
            </div>
          </div>

          {/* Article Body: Uses the content fetched from the database */}
          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="space-y-6 leading-relaxed text-muted-foreground"
            >
              {/* Content rendered from HTML */}
            </div>
          </div>

          {/* NOTE: Related Articles removed for simplicity, as they rely on local data */}
          {/* You may re-add them later by querying the database for other articles */}
        </div>
      </article>

      <PublicFooter />
    </main>
  );
}
