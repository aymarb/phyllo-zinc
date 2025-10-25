"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  expertise: string[]
}

const teamMembers: TeamMember[] = [
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
]

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1))
    setExpandedId(null)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1))
    setExpandedId(null)
  }

  const currentMember = teamMembers[currentIndex]
  const isExpanded = expandedId === currentMember.id

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Card Container */}
        <div className="bg-background border border-border rounded-lg overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="relative h-64 md:h-80 overflow-hidden bg-green-50">
            <img
              src={currentMember.image || "/placeholder.svg"}
              alt={currentMember.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{currentMember.name}</h3>
              <p className="text-green-700 font-medium">{currentMember.role}</p>
            </div>

            {/* Expandable Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-4 pt-4 border-t border-border">
                <p className="text-muted-foreground leading-relaxed">{currentMember.bio}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentMember.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expand Button */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : currentMember.id)}
              className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-medium text-sm"
            >
              {isExpanded ? "Show Less" : "Learn More"}
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-2 hover:bg-green-100 rounded-full transition"
          aria-label="Previous member"
        >
          <ChevronLeft className="w-6 h-6 text-green-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-2 hover:bg-green-100 rounded-full transition"
          aria-label="Next member"
        >
          <ChevronRight className="w-6 h-6 text-green-700" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {teamMembers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx)
              setExpandedId(null)
            }}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-green-700 w-8" : "bg-green-200 w-2"
            }`}
            aria-label={`Go to member ${idx + 1}`}
          />
        ))}
      </div>

      {/* Member Counter */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        {currentIndex + 1} / {teamMembers.length}
      </p>
    </div>
  )
}
