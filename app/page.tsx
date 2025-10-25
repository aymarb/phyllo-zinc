import { Mail, TrendingUp, Leaf, Users, Beaker } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-700" />
            <span className="font-semibold text-lg">Green Synthesis</span>
          </div>
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
            <a href="#contact" className="hover:text-green-700 transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700">
              Research Publication
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
              Green Synthesis of ZnO Nanoparticles
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Using{" "}
              <span className="font-semibold text-foreground">
                Phyllanthus niruri
              </span>{" "}
              leaf extract to create an innovative solution for mitigating
              methane emissions through sustainable ruminant feed additives.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="py-20 px-6 bg-green-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Background</h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-green-700" />
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Methane emissions from ruminant livestock represent a
                  significant contributor to global greenhouse gas emissions.
                  Traditional mitigation strategies often rely on synthetic
                  additives with limited sustainability credentials.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                  Our Approach
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We leverage the bioactive properties of Phyllanthus niruri, a
                  traditional medicinal plant, to synthesize zinc oxide
                  nanoparticles through an environmentally benign green
                  chemistry approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">
                Research Overview
              </h2>
              <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold">Synthesis Method</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly synthesis using plant leaf extract as a reducing
                  and capping agent for ZnO nanoparticle formation.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold">Natural Source</h3>
                <p className="text-sm text-muted-foreground">
                  Phyllanthus niruri, rich in bioactive compounds, serves as the
                  primary biological agent for nanoparticle synthesis.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg hover:border-green-300 transition space-y-3">
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
      <section id="method" className="py-20 px-6 bg-green-50/30">
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
                <div key={idx} className="flex gap-6">
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
      <section id="benefits" className="py-20 px-6">
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
                  className="p-6 border border-border rounded-lg space-y-4"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50/30">
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
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Research</h4>
              <p className="text-sm text-muted-foreground">
                Published research on green synthesis of ZnO nanoparticles for
                sustainable agriculture.
              </p>
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
