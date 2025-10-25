import { Leaf, ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Sample article data - in a real app, this would come from a database
const articlesData: Record<
  string,
  {
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
> = {
  "1": {
    id: "1",
    title:
      "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
    excerpt:
      "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles using plant-based materials.",
    image: "/article-green-synthesis.jpg",
    date: "October 15, 2025",
    author: "Dr. Sarah Chen",
    category: "Research",
    readTime: "8 min read",
    content: `
      <h2>Introduction</h2>
      <p>The synthesis of zinc oxide (ZnO) nanoparticles has been a subject of intense research due to their wide range of applications in electronics, cosmetics, pharmaceuticals, and environmental remediation. However, conventional synthesis methods often involve toxic chemicals and high energy consumption, making them environmentally unfavorable.</p>

      <p>Our research presents a breakthrough in green synthesis methodology that utilizes plant-based materials, specifically Phyllanthus niruri leaf extract, to produce high-quality ZnO nanoparticles in a sustainable and eco-friendly manner.</p>

      <h2>Methodology</h2>
      <p>The synthesis process involves several key steps:</p>
      <ul>
        <li><strong>Plant Material Collection:</strong> Fresh Phyllanthus niruri leaves were collected from sustainable sources and processed under controlled conditions.</li>
        <li><strong>Extract Preparation:</strong> The leaves were subjected to aqueous extraction to obtain a concentrated solution rich in bioactive compounds.</li>
        <li><strong>Nanoparticle Synthesis:</strong> Zinc nitrate solution was mixed with the plant extract at ambient temperature and pressure, initiating the synthesis process.</li>
        <li><strong>Characterization:</strong> The resulting nanoparticles were analyzed using UV-Vis spectroscopy, X-ray diffraction (XRD), and scanning electron microscopy (SEM).</li>
      </ul>

      <h2>Results and Discussion</h2>
      <p>Our findings demonstrate that the green synthesis method produces ZnO nanoparticles with excellent properties:</p>
      <ul>
        <li>Particle size: 20-50 nm with narrow size distribution</li>
        <li>High crystallinity confirmed by XRD analysis</li>
        <li>Excellent biocompatibility and low toxicity</li>
        <li>Superior antimicrobial properties compared to conventional synthesis</li>
      </ul>

      <p>The use of plant extract not only serves as a reducing agent but also provides natural capping agents that stabilize the nanoparticles, preventing aggregation and ensuring long-term stability.</p>

      <h2>Environmental Impact</h2>
      <p>This green synthesis approach offers significant environmental advantages:</p>
      <ul>
        <li>Eliminates the use of toxic chemical reducing agents</li>
        <li>Operates at ambient temperature and pressure, reducing energy consumption</li>
        <li>Utilizes renewable plant-based materials</li>
        <li>Produces biodegradable byproducts</li>
        <li>Scalable for industrial production</li>
      </ul>

      <h2>Applications in Ruminant Feed</h2>
      <p>The synthesized ZnO nanoparticles have been formulated into feed additives for ruminant livestock. Preliminary studies show promising results in reducing methane emissions while improving digestive efficiency and overall animal health.</p>

      <h2>Conclusion</h2>
      <p>This research represents a significant advancement in sustainable nanotechnology. By combining traditional plant knowledge with modern scientific techniques, we have developed a method that is not only environmentally friendly but also economically viable for large-scale production.</p>

      <p>Future research will focus on optimizing the synthesis parameters, conducting long-term animal trials, and exploring additional applications of these nanoparticles in agriculture and medicine.</p>
    `,
  },
  "2": {
    id: "2",
    title: "Methane Mitigation in Livestock: The Role of Nanoparticles",
    excerpt:
      "Methane emissions from ruminant livestock are a major contributor to climate change. Our research shows how ZnO nanoparticles can effectively reduce these emissions.",
    image: "/article-methane-mitigation.jpg",
    date: "September 28, 2025",
    author: "Prof. James Mitchell",
    category: "Agriculture",
    readTime: "10 min read",
    content: `
      <h2>The Methane Problem</h2>
      <p>Livestock agriculture contributes approximately 14-18% of global greenhouse gas emissions, with methane being one of the most potent contributors. Ruminant animals like cattle, sheep, and goats produce methane through enteric fermentation, a natural digestive process.</p>

      <p>Methane has a global warming potential 28-34 times higher than carbon dioxide over a 100-year period, making methane reduction a critical component of climate change mitigation strategies.</p>

      <h2>Current Mitigation Strategies</h2>
      <p>Traditional approaches to reducing methane emissions include:</p>
      <ul>
        <li>Dietary modifications and feed additives</li>
        <li>Selective breeding for low-methane animals</li>
        <li>Improved grazing management</li>
        <li>Methane capture and utilization technologies</li>
      </ul>

      <p>However, many of these approaches have limitations in terms of effectiveness, cost, or scalability.</p>

      <h2>Nanoparticles as a Solution</h2>
      <p>Our research demonstrates that ZnO nanoparticles can significantly reduce methane emissions through multiple mechanisms:</p>
      <ul>
        <li><strong>Enzyme Inhibition:</strong> Nanoparticles inhibit methane-producing enzymes in the rumen</li>
        <li><strong>Microbial Modulation:</strong> They alter the composition of rumen microbiota, reducing methanogenic bacteria</li>
        <li><strong>Improved Digestion:</strong> Enhanced nutrient absorption reduces overall fermentation</li>
      </ul>

      <h2>Research Findings</h2>
      <p>In our trials with dairy cattle, ZnO nanoparticles reduced methane emissions by 25-35% while maintaining or improving milk production and animal health indicators.</p>

      <h2>Economic and Environmental Benefits</h2>
      <p>The implementation of nanoparticle-based feed additives offers multiple benefits:</p>
      <ul>
        <li>Reduced greenhouse gas emissions</li>
        <li>Improved feed efficiency and productivity</li>
        <li>Lower production costs compared to other mitigation strategies</li>
        <li>Sustainable and scalable solution</li>
      </ul>

      <h2>Future Perspectives</h2>
      <p>As we continue to refine this technology, we anticipate even greater reductions in methane emissions and broader adoption across the livestock industry.</p>
    `,
  },
  "3": {
    id: "3",
    title: "Phyllanthus niruri: Ancient Plant, Modern Solutions",
    excerpt:
      "Discover how traditional medicinal plants like Phyllanthus niruri are being used in cutting-edge nanotechnology research.",
    image: "/article-phyllanthus.jpg",
    date: "September 10, 2025",
    author: "Dr. Priya Patel",
    category: "Botany",
    readTime: "7 min read",
    content: `
      <h2>Traditional Uses of Phyllanthus niruri</h2>
      <p>Phyllanthus niruri, commonly known as stone root or chanca piedra, has been used in traditional medicine systems for centuries, particularly in Ayurveda and traditional Chinese medicine.</p>

      <p>The plant is traditionally used to treat various ailments including kidney stones, liver disorders, and digestive issues. Its effectiveness in traditional medicine is attributed to its rich content of bioactive compounds.</p>

      <h2>Bioactive Compounds</h2>
      <p>Our analysis of Phyllanthus niruri leaf extract has identified numerous bioactive compounds:</p>
      <ul>
        <li>Polyphenols and flavonoids</li>
        <li>Alkaloids</li>
        <li>Tannins</li>
        <li>Lignans</li>
        <li>Essential oils</li>
      </ul>

      <p>These compounds possess strong antioxidant, antimicrobial, and anti-inflammatory properties, making them ideal for nanotechnology applications.</p>

      <h2>Application in Nanotechnology</h2>
      <p>In our research, we utilize the reducing and capping properties of these bioactive compounds to synthesize ZnO nanoparticles. The plant extract serves multiple functions:</p>
      <ul>
        <li>Acts as a reducing agent to convert zinc ions to metallic zinc</li>
        <li>Provides natural capping agents that stabilize nanoparticles</li>
        <li>Imparts bioactive properties to the nanoparticles</li>
      </ul>

      <h2>Advantages of Plant-Based Synthesis</h2>
      <p>Using Phyllanthus niruri for nanoparticle synthesis offers several advantages over chemical methods:</p>
      <ul>
        <li>Environmentally friendly and sustainable</li>
        <li>Non-toxic and biocompatible</li>
        <li>Cost-effective and scalable</li>
        <li>Combines traditional knowledge with modern science</li>
      </ul>

      <h2>Sustainability Considerations</h2>
      <p>Our research emphasizes sustainable harvesting practices to ensure the long-term availability of Phyllanthus niruri. We work with local communities and agricultural partners to promote responsible cultivation.</p>

      <h2>Conclusion</h2>
      <p>The integration of traditional plant knowledge with modern nanotechnology represents a powerful approach to solving contemporary environmental and agricultural challenges. Phyllanthus niruri exemplifies how ancient wisdom can inform innovative solutions for a sustainable future.</p>
    `,
  },
  "4": {
    id: "4",
    title: "Characterization Techniques for ZnO Nanoparticles",
    excerpt:
      "A comprehensive overview of the analytical methods used to characterize our synthesized ZnO nanoparticles.",
    image: "/article-green-synthesis.jpg",
    date: "August 25, 2025",
    author: "Dr. Marcus Johnson",
    category: "Methods",
    readTime: "9 min read",
    content: `
      <h2>Introduction to Characterization</h2>
      <p>Comprehensive characterization of synthesized nanoparticles is essential to understand their properties and ensure their suitability for intended applications. Our research employs multiple complementary techniques.</p>

      <h2>UV-Visible Spectroscopy</h2>
      <p>UV-Vis spectroscopy provides information about the optical properties and particle size of nanoparticles. The absorption spectra reveal the characteristic absorption peaks of ZnO nanoparticles, typically around 370-380 nm.</p>

      <h2>X-Ray Diffraction (XRD)</h2>
      <p>XRD analysis confirms the crystalline structure and phase purity of the synthesized nanoparticles. Our results show the characteristic peaks of hexagonal wurtzite ZnO structure.</p>

      <h2>Scanning Electron Microscopy (SEM)</h2>
      <p>SEM provides detailed information about particle morphology, size distribution, and surface characteristics. Our nanoparticles exhibit spherical morphology with sizes ranging from 20-50 nm.</p>

      <h2>Transmission Electron Microscopy (TEM)</h2>
      <p>TEM offers higher resolution imaging, allowing us to observe individual nanoparticles and their crystal structure at the atomic level.</p>

      <h2>Fourier Transform Infrared Spectroscopy (FTIR)</h2>
      <p>FTIR analysis identifies functional groups and confirms the presence of bioactive compounds from the plant extract on the nanoparticle surface.</p>

      <h2>Conclusion</h2>
      <p>The combination of these characterization techniques provides a comprehensive understanding of our synthesized ZnO nanoparticles, confirming their quality and suitability for agricultural applications.</p>
    `,
  },
  "5": {
    id: "5",
    title: "Sustainability in Nanotechnology: A Green Chemistry Perspective",
    excerpt:
      "Exploring the principles of green chemistry and how they apply to nanotechnology research.",
    image: "/article-methane-mitigation.jpg",
    date: "August 12, 2025",
    author: "Dr. Sarah Chen",
    category: "Sustainability",
    readTime: "8 min read",
    content: `
      <h2>Principles of Green Chemistry</h2>
      <p>Green chemistry, also known as sustainable chemistry, is the design of chemical products and processes that reduce or eliminate the use and generation of hazardous substances.</p>

      <p>The 12 principles of green chemistry provide a framework for developing environmentally benign chemical processes and products.</p>

      <h2>Application to Nanotechnology</h2>
      <p>Our research applies green chemistry principles to nanotechnology:</p>
      <ul>
        <li>Prevention of waste through efficient synthesis</li>
        <li>Use of renewable feedstocks (plant materials)</li>
        <li>Reduction of energy consumption</li>
        <li>Elimination of toxic solvents and reagents</li>
        <li>Design for biodegradability</li>
      </ul>

      <h2>Environmental Benefits</h2>
      <p>By adopting green chemistry principles, we achieve significant environmental benefits without compromising the quality or effectiveness of our nanoparticles.</p>

      <h2>Future Outlook</h2>
      <p>As the field of nanotechnology continues to grow, the adoption of green chemistry principles becomes increasingly important for ensuring sustainable development.</p>
    `,
  },
  "6": {
    id: "6",
    title: "Feed Additives and Ruminant Nutrition: Current Trends",
    excerpt:
      "An analysis of current trends in ruminant feed additives, including the potential of nanoparticles.",
    image: "/article-phyllanthus.jpg",
    date: "July 30, 2025",
    author: "Prof. James Mitchell",
    category: "Nutrition",
    readTime: "9 min read",
    content: `
      <h2>Evolution of Feed Additives</h2>
      <p>The use of feed additives in ruminant nutrition has evolved significantly over the past decades, from simple mineral supplements to complex bioactive compounds.</p>

      <h2>Current Trends</h2>
      <p>Modern feed additives focus on:</p>
      <ul>
        <li>Improving feed efficiency and productivity</li>
        <li>Enhancing animal health and welfare</li>
        <li>Reducing environmental impact</li>
        <li>Ensuring food safety and quality</li>
      </ul>

      <h2>Nanoparticles as Next-Generation Additives</h2>
      <p>Nanoparticles represent a new frontier in feed additive technology, offering unique advantages in terms of bioavailability, efficacy, and sustainability.</p>

      <h2>Regulatory Considerations</h2>
      <p>As nanoparticle-based feed additives emerge, regulatory frameworks are being developed to ensure their safety and efficacy.</p>

      <h2>Market Potential</h2>
      <p>The global market for advanced feed additives is expected to grow significantly, with nanoparticles playing an increasingly important role.</p>

      <h2>Conclusion</h2>
      <p>Nanoparticle-based feed additives represent a promising development in ruminant nutrition, offering solutions to multiple challenges in modern livestock agriculture.</p>
    `,
  },
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const article = articlesData[Number(id)];
  if (!article) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-green-700 transition"
            >
              <Leaf className="w-6 h-6 text-green-700" />
              <span className="font-semibold text-lg">Green Synthesis</span>
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-700 transition"
          >
            <Leaf className="w-6 h-6 text-green-700" />
            <span className="font-semibold text-lg">Green Synthesis</span>
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

          {/* Article Body */}
          <div className="prose prose-sm max-w-none space-y-6 text-foreground">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="space-y-6 leading-relaxed text-muted-foreground"
            >
              {/* Content rendered from HTML */}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-2xl font-light mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.values(articlesData)
                .filter((a) => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/articles/${relatedArticle.id}`}
                  >
                    <div className="group cursor-pointer border border-border rounded-lg overflow-hidden hover:border-green-300 transition">
                      <div className="relative h-40 overflow-hidden bg-green-50">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {relatedArticle.date}
                        </p>
                        <h4 className="font-semibold line-clamp-2 group-hover:text-green-700 transition">
                          {relatedArticle.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>

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
                Advancing sustainable solutions for environmental challenges
                through innovative green chemistry.
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
                  <Link
                    href="/articles"
                    className="hover:text-green-700 transition"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="hover:text-green-700 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Contact</h4>
              <a
                href="mailto:research@greensynthesis.org"
                className="text-sm text-green-700 hover:underline"
              >
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
  );
}
