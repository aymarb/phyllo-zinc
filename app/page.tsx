import {
  Mail,
  Leaf,
  Beaker,
  TrendingUp,
  Users,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { TeamCarousel } from "@/components/team-carousel";
import { ArticlePreview } from "@/components/article-preview";
import { BackgroundSection } from "@/components/background-section";
import Link from "next/link";

// Sample articles data
const featuredArticles = [
  {
    id: "1",
    title:
      "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
    excerpt:
      "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles using plant-based materials. This breakthrough offers significant environmental benefits...",
    image: "/article-green-synthesis.jpg",
    date: "October 15, 2025",
  },
  {
    id: "2",
    title: "Methane Mitigation in Livestock: The Role of Nanoparticles",
    excerpt:
      "Methane emissions from ruminant livestock are a major contributor to climate change. Our research shows how ZnO nanoparticles can effectively reduce these emissions...",
    image: "/article-methane-mitigation.jpg",
    date: "September 28, 2025",
  },
  {
    id: "3",
    title: "Phyllanthus niruri: Ancient Plant, Modern Solutions",
    excerpt:
      "Discover how traditional medicinal plants like Phyllanthus niruri are being used in cutting-edge nanotechnology research to create sustainable solutions...",
    image: "/article-phyllanthus.jpg",
    date: "September 10, 2025",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-green-700 flex items-center justify-center">
              <img
                src="phyllozinc.png" // 🖼️ your logo path
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
            <a href="#contact" className="hover:text-green-700 transition">
              Contact
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

      {/* Hero Section */}

      <section
        className="relative py-20 md:py-32 px-6 overflow-hidden bg-cover bg-center bg-fixed scroll-smooth"
        style={{
          backgroundImage: "url('meniran.jpg')", // your background
        }}
      >
        {/* dark gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 "></div>

        {/* soft green glow for depth */}
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
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-white text-green-900 rounded-lg hover:bg-green-100 transition font-medium shadow-md"
            >
              Get in Touch
            </a>
            <Link
              href="/virtual-lab"
              className="inline-block px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition font-medium"
            >
              Explore Virtual Lab
            </Link>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <BackgroundSection />

      {/* Information Section */}
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

      {/* Method Section */}
      <section
        id="method"
        className="py-20 px-6 bg-gradient-to-b from-green-50/30 to-background scroll-smooth"
      >
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

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-6 bg-gradient-to-b from-background to-green-50/20 scroll-smooth"
      >
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

      {/* Team Section */}
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

      {/* Featured Articles Section */}
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

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "1",
                  title:
                    "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
                  excerpt:
                    "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles using plant-based materials. This breakthrough offers significant environmental benefits...",
                  image: "/article-green-synthesis.jpg",
                  date: "October 15, 2025",
                },
                {
                  id: "2",
                  title:
                    "Methane Mitigation in Livestock: The Role of Nanoparticles",
                  excerpt:
                    "Methane emissions from ruminant livestock are a major contributor to climate change. Our research shows how ZnO nanoparticles can effectively reduce these emissions...",
                  image: "/article-methane-mitigation.jpg",
                  date: "September 28, 2025",
                },
                {
                  id: "3",
                  title: "Phyllanthus niruri: Ancient Plant, Modern Solutions",
                  excerpt:
                    "Discover how traditional medicinal plants like Phyllanthus niruri are being used in cutting-edge nanotechnology research to create sustainable solutions...",
                  image: "/article-phyllanthus.jpg",
                  date: "September 10, 2025",
                },
              ].map((article) => (
                <ArticlePreview key={article.id} {...article} />
              ))}
            </div>

            <div className="text-center pt-4">
              <a
                href="/articles"
                className="inline-block px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
              >
                View All Articles
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-b from-green-50/30 to-background scroll-smooth"
      >
        <div className="max-w-2xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Get in Touch</h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
              <p className="text-muted-foreground">
                Interested in learning more about our research or potential
                collaborations?
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:research@greensynthesis.org"
                    className="text-green-700 hover:underline"
                  >
                    research@greensynthesis.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We welcome partnerships with research institutions,
                    agricultural organizations, and industry stakeholders.
                  </p>
                </div>
              </div>

              <form className="space-y-4 pt-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-green-700"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <span>PhylloZinc Research</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advancing sustainable solutions for environmental challenges
                through innovative green chemistry.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#background"
                    className="hover:text-green-700 transition"
                  >
                    Background
                  </a>
                </li>
                <li>
                  <a href="#method" className="hover:text-green-700 transition">
                    Methodology
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-green-700 transition"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="/virtual-lab"
                    className="hover:text-green-700 transition"
                  >
                    Virtual Lab
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Our Sponsors</h4>
              <div className="flex flex-wrap gap-3">
                <div className="w-12 h-12 bg-green-50 border border-border rounded-lg flex items-center justify-center text-xs font-semibold text-green-700">
                  Sponsor 1
                </div>
                <div className="w-12 h-12 bg-green-50 border border-border rounded-lg flex items-center justify-center text-xs font-semibold text-green-700">
                  Sponsor 2
                </div>
                <div className="w-12 h-12 bg-green-50 border border-border rounded-lg flex items-center justify-center text-xs font-semibold text-green-700">
                  Sponsor 3
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-green-700" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                  title="TikTok"
                >
                  <span className="text-green-700 font-bold">TK</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5 text-green-700" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-50 border border-border rounded-lg flex items-center justify-center hover:bg-green-100 transition"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5 text-green-700" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 PhylloZinc Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
