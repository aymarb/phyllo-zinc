import { Mail, Leaf, Beaker, TrendingUp, Users } from "lucide-react";
import { TeamCarousel } from "@/components/team-carousel";
import { ArticlePreview } from "@/components/article-preview";
import { BackgroundSection } from "@/components/background-section";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer"; // Import footer terpusat

// --- 1. IMPORT UNTUK PENGAMBILAN DATA ---
import { db } from "@/lib/index";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";

// --- 2. DEFINISIKAN TIPE ARTIKEL ---
// (Ini diperlukan agar array `featuredArticles` memiliki tipe yang benar)
interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string | null; // Bisa null dari database
  date: string;
}

// --- 3. FUNGSI PENGAMBILAN DATA ---
// (Hanya mengambil 3 artikel terbaru yang diterbitkan)
async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const featured = await db
      .select({
        id: articles.id,
        title: articles.title,
        excerpt: articles.excerpt,
        image: articles.image,
        date: articles.date,
      })
      .from(articles)
      .where(eq(articles.status, "published")) // Hanya ambil yang 'published'
      .orderBy(desc(articles.createdAt)) // Urutkan dari yang terbaru
      .limit(3); // Batasi hanya 3

    return featured;
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

// --- 4. HAPUS ARRAY `featuredArticles` STATIS YANG LAMA ---
// (Array statis tidak lagi diperlukan)

// --- 5. UBAH KOMPONEN `Home` MENJADI `async` ---
export default async function Home() {
  // --- 6. PANGGIL FUNGSI PENGAMBILAN DATA ---
  const featuredArticles = await getFeaturedArticles();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation (Tidak berubah) */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-green-700 flex items-center justify-center">
              <img
                src="phyllozinc.png"
                alt="PhylloZinc logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg">PhylloZinc</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#background" className="hover:text-green-700 transition">
              Background
            </a>
            <a href="#method" className="hover:text-green-700 transition">
              Method
            </a>
            <a href="#benefits" className="hover:text-green-700 transition">
              Benefits
            </a>
            <a href="/virtual-lab" className="hover:text-green-700 transition">
              Virtual Lab
            </a>
            <Link
              href="/auth"
              className="text-green-700 font-medium hover:text-green-800 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Tidak berubah) */}
      <section
        className="relative py-20 md:py-32 px-6 overflow-hidden bg-cover bg-center bg-fixed scroll-smooth"
        style={{
          backgroundImage: "url('meniran.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 "></div>
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div
            className="absolute bottom-0 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/80">
            Research Publication
          </div>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white drop-shadow-lg">
            Empowering Sustainability Through Phyllanthus niruri–Driven ZnO
            Nanoparticles
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Using{" "}
            <span className="font-semibold text-green-200">
              Phyllanthus niruri
            </span>{" "}
            leaf extract to create an innovative solution for mitigating methane
            emissions through sustainable ruminant feed additives.
          </p>
          <div className="pt-4 flex gap-4 justify-center flex-wrap">
            <Link
              href="/virtual-lab"
              className="inline-block px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition font-medium"
            >
              Explore Virtual Lab
            </Link>
          </div>
        </div>
      </section>

      {/* Background Section (Tidak berubah) */}
      <BackgroundSection />

      {/* Information Section (Tidak berubah) */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-green-50/20 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">
                Research Overview
              </h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3 hover:shadow-lg hover:shadow-green-100/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold">Synthesis Method</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly synthesis using plant leaf extract as a reducing
                  and capping agent for ZnO nanoparticle formation.
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3 hover:shadow-lg hover:shadow-green-100/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold">Natural Source</h3>
                <p className="text-sm text-muted-foreground">
                  Phyllanthus niruri, rich in bioactive compounds, serves as the
                  primary biological agent for nanoparticle synthesis.
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3 hover:shadow-lg hover:shadow-green-100/50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Reduces reliance on synthetic chemicals while maintaining
                  efficacy in methane mitigation applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section (Tidak berubah) */}
      <section
        id="method"
        className="py-20 px-6 bg-gradient-to-b from-green-50/30 to-background scroll-smooth"
      >
        {/* ... (Konten method tidak berubah) ... */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Methodology</h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Plant Material Preparation",
                  description:
                    "Phyllanthus niruri leaves are collected, washed, and dried under controlled conditions to preserve bioactive compounds.",
                },
                {
                  step: "02",
                  title: "Extract Preparation",
                  description:
                    "Leaf extract is prepared through aqueous extraction, concentrating the phytochemicals responsible for nanoparticle synthesis.",
                },
                {
                  step: "03",
                  title: "Nanoparticle Synthesis",
                  description:
                    "Zinc salt solution is mixed with plant extract, initiating the green synthesis process at ambient temperature and pressure.",
                },
                {
                  step: "04",
                  title: "Characterization",
                  description:
                    "Synthesized ZnO nanoparticles are characterized using UV-Vis, XRD, SEM, and other analytical techniques to confirm properties.",
                },
                {
                  step: "05",
                  title: "Feed Additive Formulation",
                  description:
                    "Nanoparticles are formulated into stable feed additives suitable for ruminant dietary supplementation.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 hover:translate-x-1 transition-transform"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-700 text-white font-semibold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section (Tidak berubah) */}
      <section
        id="benefits"
        className="py-20 px-6 bg-gradient-to-b from-background to-green-50/20 scroll-smooth"
      >
        {/* ... (Konten benefits tidak berubah) ... */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Key Benefits</h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Environmental Impact",
                  points: [
                    "Reduces methane emissions from ruminants",
                    "Decreases greenhouse gas footprint",
                    "Supports climate change mitigation",
                  ],
                },
                {
                  title: "Sustainability",
                  points: [
                    "Uses renewable plant-based materials",
                    "Eliminates toxic chemical byproducts",
                    "Biodegradable and eco-friendly",
                  ],
                },
                {
                  title: "Economic Viability",
                  points: [
                    "Cost-effective synthesis process",
                    "Utilizes abundant plant resources",
                    "Scalable production methodology",
                  ],
                },
                {
                  title: "Animal Health",
                  points: [
                    "Improves ruminant digestive efficiency",
                    "Enhances nutrient bioavailability",
                    "Supports overall livestock wellness",
                  ],
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-border rounded-lg space-y-4 hover:shadow-lg hover:shadow-green-100/50 transition"
                >
                  <h3 className="text-lg font-semibold text-green-700">
                    {benefit.title}
                  </h3>
                  <ul className="space-y-2">
                    {benefit.points.map((point, pidx) => (
                      <li
                        key={pidx}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-green-700 font-bold mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Tidak berubah) */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-50/30 to-background scroll-smooth">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Research Team</h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
              <p className="text-muted-foreground">
                Meet the dedicated scientists and researchers behind this
                innovative project
              </p>
            </div>
            <TeamCarousel />
          </div>
        </div>
      </section>

      {/* --- 7. FEATURED ARTICLES SECTION (DIPERBARUI) --- */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-green-50/20 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">
                Featured Articles
              </h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
              <p className="text-muted-foreground">
                Explore our latest research publications and insights
              </p>
            </div>

            {/* Cek jika ada artikel */}
            {featuredArticles.length === 0 ? (
              <div className="text-center p-12 border border-border rounded-lg bg-green-50/50">
                <h3 className="text-xl text-muted-foreground">
                  No featured articles found.
                </h3>
              </div>
            ) : (
              // Jika ada, tampilkan grid
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <ArticlePreview
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    // Gunakan placeholder jika 'image' null atau kosong
                    image={article.image || "/placeholder.svg"}
                    date={article.date}
                  />
                ))}
              </div>
            )}

            <div className="text-center pt-4">
              <Link
                href="/articles"
                className="inline-block px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. GUNAKAN FOOTER TERPUSAT --- */}
      <PublicFooter />
    </main>
  );
}
