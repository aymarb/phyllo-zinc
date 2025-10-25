import { Leaf, ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample articles data - in a real app, this would come from a database
const allArticles = [
  {
    id: "1",
    title: "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
    excerpt:
      "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles using plant-based materials. This breakthrough offers significant environmental benefits and opens new possibilities for sustainable nanotechnology.",
    image: "/article-green-synthesis.jpg",
    date: "October 15, 2025",
    category: "Research",
  },
  {
    id: "2",
    title: "Methane Mitigation in Livestock: The Role of Nanoparticles",
    excerpt:
      "Methane emissions from ruminant livestock are a major contributor to climate change. Our research shows how ZnO nanoparticles can effectively reduce these emissions while improving animal health and productivity.",
    image: "/article-methane-mitigation.jpg",
    date: "September 28, 2025",
    category: "Agriculture",
  },
  {
    id: "3",
    title: "Phyllanthus niruri: Ancient Plant, Modern Solutions",
    excerpt:
      "Discover how traditional medicinal plants like Phyllanthus niruri are being used in cutting-edge nanotechnology research to create sustainable solutions for modern agricultural challenges.",
    image: "/article-phyllanthus.jpg",
    date: "September 10, 2025",
    category: "Botany",
  },
  {
    id: "4",
    title: "Characterization Techniques for ZnO Nanoparticles",
    excerpt:
      "A comprehensive overview of the analytical methods used to characterize our synthesized ZnO nanoparticles, including UV-Vis spectroscopy, XRD, and SEM analysis.",
    image: "/article-green-synthesis.jpg",
    date: "August 25, 2025",
    category: "Methods",
  },
  {
    id: "5",
    title: "Sustainability in Nanotechnology: A Green Chemistry Perspective",
    excerpt:
      "Exploring the principles of green chemistry and how they apply to nanotechnology research, with focus on reducing environmental impact and promoting sustainable practices.",
    image: "/article-methane-mitigation.jpg",
    date: "August 12, 2025",
    category: "Sustainability",
  },
  {
    id: "6",
    title: "Feed Additives and Ruminant Nutrition: Current Trends",
    excerpt:
      "An analysis of current trends in ruminant feed additives, including the potential of nanoparticles as a new frontier in animal nutrition and health management.",
    image: "/article-phyllanthus.jpg",
    date: "July 30, 2025",
    category: "Nutrition",
  },
]

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-green-700 transition">
            <Leaf className="w-6 h-6 text-green-700" />
            <span className="font-semibold text-lg">Green Synthesis</span>
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

      {/* Hero Section */}
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

      {/* Articles Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Leaf className="w-5 h-5 text-green-700" />
                Green Synthesis Research
              </div>
              <p className="text-sm text-muted-foreground">
                Advancing sustainable solutions for environmental challenges through innovative green chemistry.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-green-700 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/#background" className="hover:text-green-700 transition">
                    Background
                  </a>
                </li>
                <li>
                  <a href="/#method" className="hover:text-green-700 transition">
                    Methodology
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <a href="mailto:research@greensynthesis.org" className="text-sm text-green-700 hover:underline">
                research@greensynthesis.org
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Green Synthesis Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
