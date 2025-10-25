"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ghgData = [
  { name: "Methane (CH₄)", value: 28, color: "#15803d" },
  { name: "CO₂", value: 1, color: "#86efac" },
];

const livestockData = [
  { name: "Livestock", value: 84.2 },
  { name: "Oil & Gas", value: 76.57 },
];

const emissionData = [
  { year: "2015", emissions: 3.5 },
  { year: "2016", emissions: 3.6 },
  { year: "2017", emissions: 3.7 },
  { year: "2018", emissions: 3.8 },
  { year: "2019", emissions: 3.9 },
  { year: "2020", emissions: 3.85 },
  { year: "2021", emissions: 3.95 },
  { year: "2022", emissions: 4.0 },
];

const cattleData = [
  { name: "Cattle", value: 95 },
  { name: "Other Livestock", value: 5 },
];

export function BackgroundSection() {
  return (
    <section
      id="background"
      className="py-20 px-6 bg-gradient-to-b from-background to-green-50/20 scroll-smooth"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light">
              Background & Impact
            </h2>
            <div className="w-12 h-1 bg-green-700 mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the critical environmental challenges and the urgent
              need for innovative solutions
            </p>
          </div>

          {/* Impact of GHG Emissions */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                Impact of Greenhouse Gas Emissions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Methane (CH₄) has a global warming potential{" "}
                <span className="font-semibold text-foreground">
                  28 times higher
                </span>{" "}
                than carbon dioxide (CO₂). This makes methane a significant
                contributor to climate change, even though its atmospheric
                concentration is lower than that of CO₂.
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-semibold text-green-700">
                  Global Warming Potential Comparison
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Methane
                    </p>
                    <p className="text-2xl font-bold text-green-700">28x</p>
                  </div>
                  <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      CO₂ Baseline
                    </p>
                    <p className="text-2xl font-bold text-green-700">1x</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ghgData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}x`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ghgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Livestock Sector */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-background border border-border rounded-lg p-6 order-2 md:order-1">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={livestockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#15803d" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-2xl font-semibold">
                Livestock Sector as Major Emission Source
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The livestock sector produces approximately{" "}
                <span className="font-semibold text-foreground">
                  84.2 million metric tons of CO₂ equivalent (MMTCO₂e)
                </span>
                , which is higher than the oil and gas industry (76.57 MMTCO₂e).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Among livestock, cattle are the main contributors, with around{" "}
                <span className="font-semibold text-foreground">
                  95% of methane
                </span>{" "}
                emitted through eructation (the natural belching process during
                digestion).
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-semibold text-green-700">
                  Methane Emission by Livestock Type
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">Cattle</p>
                    <p className="text-2xl font-bold text-green-700">95%</p>
                  </div>
                  <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">
                      Other Livestock
                    </p>
                    <p className="text-2xl font-bold text-green-700">5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Efficiency Impact */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                Effect on Productivity & Feed Efficiency
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Methane production in the rumen not only contributes to
                greenhouse gas emissions but also{" "}
                <span className="font-semibold text-foreground">
                  reduces feed conversion efficiency
                </span>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Energy that should be used for animal growth and productivity is
                instead lost as methane gas, leading to lower livestock
                productivity and economic losses for farmers.
              </p>
              <div className="pt-4 space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-700 mb-2">
                    Energy Loss from Methane
                  </p>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    ~15% of feed energy lost as methane
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emissionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#15803d"
                    strokeWidth={2}
                    dot={{ fill: "#15803d", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Emissions (Gt CO₂e)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Innovation Need */}
          <div className="bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 rounded-lg p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-green-900">
              Urgency for Environmentally Friendly Innovation
            </h3>
            <p className="text-green-800 leading-relaxed">
              There is an urgent need for solutions that can reduce methane
              emissions while improving feed efficiency and livestock health.
              Green technology approaches, such as using zinc oxide (ZnO)
              nanoparticles synthesized through eco-friendly (green) methods,
              have great potential as sustainable alternatives to address this
              issue.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Reduce Emissions
                </p>
                <p className="text-xs text-muted-foreground">
                  Lower methane production in ruminant digestive systems
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Improve Efficiency
                </p>
                <p className="text-xs text-muted-foreground">
                  Enhance feed conversion and animal productivity
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Sustainable Approach
                </p>
                <p className="text-xs text-muted-foreground">
                  Use eco-friendly methods and natural materials
                </p>
              </div>
            </div>
          </div>

          {/* PhylloZinc Solution */}
          <div className="bg-background border border-border rounded-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold">
              PhylloZinc: An Innovative Solution
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              PhylloZinc is developed as a product based on green-synthesized
              ZnO nanoparticles, with the potential to revolutionize sustainable
              livestock management.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Reduce Methane Production</p>
                    <p className="text-sm text-muted-foreground">
                      Effectively lower methane emissions in the ruminant
                      digestive system
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Improve Feed Efficiency</p>
                    <p className="text-sm text-muted-foreground">
                      Enhance animal growth performance and productivity
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">Sustainable Approach</p>
                    <p className="text-sm text-muted-foreground">
                      Offer an environmentally friendly solution to climate
                      challenges
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200 space-y-4">
                <h4 className="font-semibold text-green-900">Key Advantages</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>Green synthesis using plant-based materials</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>No toxic chemical byproducts</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>Cost-effective production</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>Scalable and sustainable</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>Biodegradable and eco-friendly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
