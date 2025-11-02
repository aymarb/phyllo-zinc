"use client";

import { useEffect, useState } from "react";

export function BackgroundSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="background" className="py-24 px-6 bg-background scroll-smooth">
      <div className="max-w-6xl mx-auto space-y-32">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-balance">
            The Crisis We're Addressing
          </h2>
          <p className="text-lg text-muted-foreground">
            Understanding the environmental urgency behind PhylloZinc's
            innovation
          </p>
        </div>

        {/* Problem 1: Methane Impact */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold text-green-700">
                  28×
                </span>
                <span className="text-lg text-muted-foreground">
                  more potent than CO₂
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                Methane's Climate Impact
              </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Methane (CH₄) has a global warming potential 28 times higher than
              carbon dioxide. Though atmospheric concentration is lower than
              CO₂, methane's potency makes it a critical driver of climate
              change.
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-sm">Rapid Climate Warming</p>
                  <p className="text-sm text-muted-foreground">
                    Acts much faster than CO₂ in the atmosphere
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700 text-sm font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    Extended Atmospheric Life
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Remains active for approximately 12 years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-700 rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-green-600 rounded-full"></div>
            </div>
            <div className="relative z-10 text-center space-y-4">
              <div className="text-6xl font-bold text-green-700">28</div>
              <div className="text-muted-foreground text-sm font-medium">
                times the warming potential
              </div>
            </div>
          </div>
        </div>

        {/* Problem 2: Livestock Emissions */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-12 h-96 flex flex-col items-center justify-center relative overflow-hidden order-2 md:order-1">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
                <div className="border border-green-700 rounded-lg"></div>
                <div className="border border-green-600 rounded-lg"></div>
                <div className="border border-green-700 rounded-lg"></div>
              </div>
            </div>
            <div className="relative z-10 text-center space-y-4">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-green-700">84.2M</div>
                <div className="text-sm text-muted-foreground">
                  MMTCO₂e per year
                </div>
              </div>
              <div className="w-full h-1 bg-green-200 rounded-full mt-6">
                <div
                  className="h-1 bg-green-700 rounded-full"
                  style={{ width: "52%" }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground pt-2">
                vs 76.57M from Oil & Gas
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                Livestock: The Hidden Emitter
              </h3>
              <p className="text-lg text-muted-foreground">
                Producing more emissions than the entire oil and gas industry
                combined
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  84.2M MMTCO₂e
                </p>
                <p className="text-sm text-muted-foreground">
                  Annual emissions from livestock sector
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  95% from Cattle
                </p>
                <p className="text-sm text-muted-foreground">
                  Methane released through enteric fermentation (belching)
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  ~14.5% of GHGs
                </p>
                <p className="text-sm text-muted-foreground">
                  Livestock accounts for nearly 1/7 of global emissions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem 3: Feed Efficiency */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                The Feed Efficiency Paradox
              </h3>
              <p className="text-lg text-muted-foreground">
                Energy wasted as methane instead of animal growth
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Methane production in the rumen doesn't just harm the climate—it
                directly reduces feed efficiency. Energy meant for animal growth
                is lost as methane gas instead.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">
                    Energy Allocation in Ruminants
                  </span>
                  <span className="text-green-700 font-semibold">15%</span>
                </div>
                <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Lost as methane emissions
                </p>

                <div className="flex justify-between text-sm mb-2 pt-4">
                  <span className="font-semibold">Potential Growth Energy</span>
                  <span className="text-green-700 font-semibold">85%</span>
                </div>
                <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Available for productivity (if emissions reduced)
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-700 mb-2">
                Economic Impact
              </p>
              <p className="text-sm text-muted-foreground">
                Lower productivity translates to reduced profitability for
                farmers and higher food production costs
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Energy Lost
              </div>
              <div className="text-7xl font-bold text-red-600">15%</div>
              <div className="text-sm text-muted-foreground mt-2">
                as methane waste
              </div>
            </div>
          </div>
        </div>

        {/* Solution: PhylloZinc */}
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-light">
              The Solution: PhylloZinc
            </h3>
            <p className="text-lg text-muted-foreground">
              An innovative green technology to address multiple environmental
              challenges simultaneously
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 space-y-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-700 text-2xl font-bold">
                  ↓
                </div>
                <h4 className="text-xl font-semibold">Reduce Emissions</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Green-synthesized ZnO nanoparticles inhibit methane-producing
                  microbes in the rumen, directly reducing CH₄ emissions.
                </p>
              </div>
            </div>

            {/* Solution Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 space-y-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-700 text-2xl font-bold">
                  ↑
                </div>
                <h4 className="text-xl font-semibold">Improve Efficiency</h4>
                <p className="text-muted-foreground leading-relaxed">
                  By reducing methane production, more feed energy is channeled
                  toward animal growth and productivity.
                </p>
              </div>
            </div>

            {/* Solution Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 space-y-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-700 text-2xl font-bold">
                  🌱
                </div>
                <h4 className="text-xl font-semibold">Sustainable Approach</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Synthesized entirely from plant materials using green
                  chemistry—no toxic byproducts or environmental harm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-12 md:p-16 text-white space-y-8">
          <h3 className="text-3xl font-semibold">
            PhylloZinc's Potential Impact
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">50%</div>
              <p className="text-green-100 text-sm">
                Potential methane reduction
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">+12%</div>
              <p className="text-green-100 text-sm">
                Estimated feed efficiency gain
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">100%</div>
              <p className="text-green-100 text-sm">Natural, green synthesis</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">∞</div>
              <p className="text-green-100 text-sm">Scalable & sustainable</p>
            </div>
          </div>
        </div>

        {/* Why PhylloZinc Matters */}
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-light text-center">
            Why PhylloZinc Matters
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">
                For the Planet
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Directly reduces greenhouse gas emissions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Supports global climate change mitigation
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Uses sustainable, renewable resources
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Produces zero toxic waste
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">
                For Farmers & Industry
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Improves livestock productivity and profitability
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Enhances animal health and nutrition
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Cost-effective feed additive
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-700 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-muted-foreground">
                    Simple integration into existing practices
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
