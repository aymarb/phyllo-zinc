"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  major: string[];
  isSupervisor?: boolean; // Flag to identify the supervisor
}

// --- TEAM DATA (Unchanged) ---
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Moh Sofi’ul Anam",
    role: "Supervisor Lecturer",
    image: "/paksofi.png",
    major: ["Faculty of Animal Science"],
    isSupervisor: true,
  },
  {
    id: 2,
    name: "Catherine Noor",
    role: "Lead",
    image: "/catherine.jpg",
    major: ["Animal Science"],
  },
  {
    id: 3,
    name: "Zahwa T. A. Zahra",
    role: "Member",
    image: "/zahwa.jpg",
    major: ["Biology"],
  },
    {
    id: 4,
    name: "Jesslyn Beatrice",
    role: "Member",
    image: "/jesslyn.jpg",
    major: ["Animal Science"],
  },
  {
    id: 5,
    name: "Rona Ayyu Happyna",
    role: "Member",
    image: "/rona.jpg",
    major: ["Veterinary"],
  },
  {
    id: 6,
    name: "Ahmad Rizal R. D.",
    role: "Member",
    image: "/rizal.jpg",
    major: ["Animal Science"],
  },
];
// --- END OF TEAM DATA ---

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    const autoPlayTimer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === teamMembers.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(autoPlayTimer);
  }, [isAutoPlay]);

  const handleUserInteraction = () => {
    setIsAutoPlay(false);

    if (idleTimer) clearTimeout(idleTimer);

    const newTimer = setTimeout(() => {
      setIsAutoPlay(true);
    }, 8000);

    setIdleTimer(newTimer);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    handleUserInteraction();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
    handleUserInteraction();
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    handleUserInteraction();
  };

  const getCardPosition = (index: number) => {
    const distance =
      (index - currentIndex + teamMembers.length) % teamMembers.length;
    return distance;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="relative h-96 md:h-[500px]"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          {teamMembers.map((member, index) => {
            const position = getCardPosition(index);
            let transform = "";
            let opacity = 0;
            let zIndex = 0;

            if (position === 0) {
              transform =
                "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
              opacity = 1;
              zIndex = 30;
            } else if (position === 1) {
              // --- 1. MENGURANGI JARAK LAGI (dari 40% ke 35%) ---
              transform =
                "translateX(35%) translateZ(-120px) rotateY(-25deg) scale(0.9)";
              opacity = 0.7;
              zIndex = 20;
            } else if (position === teamMembers.length - 1) {
              // --- 1. MENGURANGI JARAK LAGI (dari -40% ke -35%) ---
              transform =
                "translateX(-35%) translateZ(-120px) rotateY(25deg) scale(0.9)";
              opacity = 0.7;
              zIndex = 20;
            } else {
              opacity = 0;
              zIndex = 0;
            }

            return (
              <div
                key={member.id}
                // --- 2. MEMPERBAIKI PENEMPATAN KARTU ---
                // Menambahkan 'flex justify-center' untuk memastikan centering yang simetris
                className="absolute inset-0 flex justify-center"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  transition:
                    "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
                }}
              >
                {/* --- 3. KARTU SEKARANG TIDAK PERLU 'mx-auto' --- */}
                <div className="w-full h-full max-w-xs">
                  {position === 0 ? (
                    // Center card
                    <div className={`bg-background rounded-lg overflow-hidden shadow-2xl h-full flex flex-col ${
                      member.isSupervisor 
                        ? "border-2 border-green-700" 
                        : "border border-border"
                    }`}>
                      
                      <div className="relative w-full h-80 flex-shrink-0 overflow-hidden bg-green-50">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        {/* Top part */}
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {member.name}
                          </h3>
                          {member.role && (
                            <p className="text-green-700 font-medium mt-1 text-sm">
                              {member.role}
                            </p>
                          )}
                        </div>
                        
                        {/* Bottom part */}
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-2">
                            {member.isSupervisor ? "Faculty:" : "Major:"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {member.major.map((exp, idx) => (
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
                  ) : (
                    // Side cards - Preview only
                    <div className="bg-background border border-border rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center p-4 h-full">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden mb-3 border-2 border-green-200">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-center font-semibold text-sm md:text-base line-clamp-2">
                        {member.name}
                      </h4>
                      <p className="text-center text-xs text-muted-foreground mt-1">
                        {member.role}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 p-2 hover:bg-green-100 rounded-full transition z-40"
          aria-label="Previous member"
        >
          <ChevronLeft className="w-6 h-6 text-green-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 p-2 hover:bg-green-100 rounded-full transition z-40"
          aria-label="Next member"
        >
          <ChevronRight className="w-6 h-6 text-green-700" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {teamMembers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-green-700 w-8"
                : "bg-green-200 w-2 hover:bg-green-300"
            }`}
            aria-label={`Go to member ${idx + 1}`}
          />
        ))}
      </div>

      {/* Member Counter */}
      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} / {teamMembers.length}
        </p>
        {isAutoPlay && (
          <p className="text-xs text-green-600 font-medium">
            Auto-playing... (click to pause)
          </p>
        )}
      </div>
    </div>
  );
}