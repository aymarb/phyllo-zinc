import { Leaf, ArrowRight } from "lucide-react"
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link"

// 1. Define the type for the article data fetched from the API
interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

// 2. Function to fetch data from your new backend API
async function getArticles(): Promise<Article[]> {
  // IMPORTANT: We use process.env.NEXT_PUBLIC_BASE_URL to build the full URL, 
  // defaulting to localhost for dev. We set cache: 'no-store' to ensure 
  // Next.js always fetches fresh data on request.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    // If the API call fails (e.g., 500 error), throw an error
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function ArticlesPage() {
  // 3. Call the fetch function right inside the component (Server Component)
  const allArticles = await getArticles(); 

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation (unchanged) */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-green-700 transition">
            <img
                src="/phyllozinc.png"
                alt="PhylloZinc Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
            <span className="font-semibold text-lg">Phyllo Zinc</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>
            <a href="/#background" className="hover:text-green-700 transition">
              Background
            </a>
            <a href="/#method" className="hover:text-green-700 transition">
              Method
            </a>
            <a href="/#contact" className="hover:text-green-700 transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section (unchanged) */}
      <section className="relative py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light leading-tight text-balance">
              Research Articles & Publications
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest research findings, insights, and publications on green synthesis and sustainable
              agriculture
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid: NOW USES REAL DATA */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {allArticles.length === 0 ? (
            <div className="text-center p-12 border border-border rounded-lg bg-green-50/50">
              <h2 className="text-2xl font-semibold text-muted-foreground">No articles found.</h2>
              <p className="text-sm text-muted-foreground mt-2">The database is currently empty. Please add articles via the Admin Dashboard.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This loop now uses the data fetched from your PostgreSQL database */}
              {allArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`}>
                  <div className="group cursor-pointer h-full">
                    <div className="border border-border rounded-lg overflow-hidden hover:border-green-300 transition bg-background h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-green-50">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-700 text-white text-xs font-medium rounded-full">
                          {article.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs text-muted-foreground mb-3">{article.date}</p>
                        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-green-700 transition">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{article.excerpt}</p>

                        {/* Read More Button */}
                        <div className="flex items-center gap-2 text-green-700 font-medium text-sm group-hover:gap-3 transition-all">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}