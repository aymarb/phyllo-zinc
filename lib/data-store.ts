export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
  readTime: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  expertise: string[]
}

// Articles Store
export const articlesStore = {
  articles: [
    {
      id: "1",
      title: "Green Synthesis Breakthrough: Sustainable ZnO Nanoparticle Production",
      excerpt:
        "Our latest research demonstrates a novel approach to synthesizing zinc oxide nanoparticles using plant-based materials. This breakthrough offers significant environmental benefits...",
      image: "/article-green-synthesis.jpg",
      date: "October 15, 2025",
      author: "Dr. Sarah Chen",
      category: "Research",
      readTime: "8 min read",
      content: "Full article content...",
    },
    {
      id: "2",
      title: "Methane Mitigation in Livestock: The Role of Nanoparticles",
      excerpt:
        "Methane emissions from ruminant livestock are a major contributor to climate change. Our research shows how ZnO nanoparticles can effectively reduce these emissions...",
      image: "/article-methane-mitigation.jpg",
      date: "September 28, 2025",
      author: "Prof. James Mitchell",
      category: "Agriculture",
      readTime: "10 min read",
      content: "Full article content...",
    },
    {
      id: "3",
      title: "Phyllanthus niruri: Ancient Plant, Modern Solutions",
      excerpt:
        "Discover how traditional medicinal plants like Phyllanthus niruri are being used in cutting-edge nanotechnology research to create sustainable solutions...",
      image: "/article-phyllanthus.jpg",
      date: "September 10, 2025",
      author: "Dr. Priya Patel",
      category: "Botany",
      readTime: "7 min read",
      content: "Full article content...",
    },
  ] as Article[],

  getAll(): Article[] {
    return this.articles
  },

  getById(id: string): Article | undefined {
    return this.articles.find((a) => a.id === id)
  },

  create(article: Omit<Article, "id">): Article {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
    }
    this.articles.unshift(newArticle)
    return newArticle
  },

  update(id: string, updates: Partial<Article>): Article | undefined {
    const index = this.articles.findIndex((a) => a.id === id)
    if (index === -1) return undefined

    this.articles[index] = { ...this.articles[index], ...updates }
    return this.articles[index]
  },

  delete(id: string): boolean {
    const index = this.articles.findIndex((a) => a.id === id)
    if (index === -1) return false

    this.articles.splice(index, 1)
    return true
  },

  getFeatured(count = 3): Article[] {
    return this.articles.slice(0, count)
  },
}

// Team Members Store
export const teamStore = {
  members: [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Lead Researcher",
      image: "/female-scientist-researcher.jpg",
      bio: "Dr. Chen leads the green synthesis research with over 15 years of experience in nanotechnology and sustainable chemistry.",
      expertise: ["Nanotechnology", "Green Chemistry", "Materials Science"],
    },
    {
      id: 2,
      name: "Prof. James Mitchell",
      role: "Co-Investigator",
      image: "/male-professor-scientist.jpg",
      bio: "Prof. Mitchell specializes in ruminant nutrition and has published extensively on sustainable feed additives.",
      expertise: ["Animal Nutrition", "Sustainable Agriculture", "Feed Science"],
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      role: "Synthesis Specialist",
      image: "/female-chemist-laboratory.jpg",
      bio: "Dr. Patel is an expert in plant-based synthesis methods and bioactive compound extraction.",
      expertise: ["Plant Chemistry", "Extraction Methods", "Synthesis"],
    },
    {
      id: 4,
      name: "Dr. Marcus Johnson",
      role: "Data Analyst",
      image: "/male-scientist-data-analysis.jpg",
      bio: "Dr. Johnson manages all analytical characterization and statistical analysis of research findings.",
      expertise: ["Data Analysis", "Characterization", "Statistics"],
    },
  ] as TeamMember[],

  getAll(): TeamMember[] {
    return this.members
  },

  getById(id: number): TeamMember | undefined {
    return this.members.find((m) => m.id === id)
  },

  create(member: Omit<TeamMember, "id">): TeamMember {
    const newMember: TeamMember = {
      ...member,
      id: Math.max(...this.members.map((m) => m.id), 0) + 1,
    }
    this.members.push(newMember)
    return newMember
  },

  update(id: number, updates: Partial<TeamMember>): TeamMember | undefined {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) return undefined

    this.members[index] = { ...this.members[index], ...updates }
    return this.members[index]
  },

  delete(id: number): boolean {
    const index = this.members.findIndex((m) => m.id === id)
    if (index === -1) return false

    this.members.splice(index, 1)
    return true
  },
}
