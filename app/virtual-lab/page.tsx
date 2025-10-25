"use client";

import { useState } from "react";
import { ChevronRight, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { VirtualLabSimulation } from "@/components/virtual-lab-simulation";

export default function VirtualLabPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 0,
      title: "Step 1: Extract Meniran Leaves",
      description:
        "Prepare the Phyllanthus niruri (Meniran) leaves for extraction",
      substeps: [
        "Chop meniran leaves to small pieces",
        "Roast in oven at 35°C for 3 days",
        "Grind until it becomes powder",
        "Weigh the powder",
        "Dissolve using aquadest (ratio 1:10)",
        "Extract using hot maceration method",
        "Filter using Whatman No.1 filtration paper",
        "Collect the meniran leaves extract",
      ],
    },
    {
      id: 1,
      title: "Step 2: Synthesize ZnO Nanoparticles",
      description:
        "Create zinc oxide nanoparticles using the green synthesis method",
      substeps: [
        "Prepare 0.1 M Zn(CH₃COO)₂·2H₂O solution in 50 mL distilled water",
        "Stir using magnetic stirrer for 10 minutes",
        "Add 2.5 mL meniran leaf extract dropwise over 2 hours",
        "Maintain temperature at 60°C on hotplate magnetic stirrer",
        "Add 0.1 M NaOH to maintain pH at 12",
        "Centrifuge colloidal solution at 6,000 rpm for 5 minutes",
        "Wash residue with distilled water",
        "Dry in oven at 105°C for 24 hours until pale white",
        "Calcine at 550°C for 30 minutes in muffle furnace",
        "Collect final ZnO nanoparticle product (gn-ZnO)",
      ],
    },
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      if (stepId < steps.length - 1) {
        setCurrentStep(stepId + 1);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-700 transition"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-xl font-semibold">Virtual Lab Simulation</h1>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-green-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    currentStep === step.id
                      ? "bg-green-700 text-white"
                      : completedSteps.includes(step.id)
                        ? "bg-green-200 text-green-700"
                        : "bg-border text-muted-foreground"
                  }`}
                >
                  {completedSteps.includes(step.id) ? "✓" : idx + 1}
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 ${completedSteps.includes(step.id) ? "bg-green-200" : "bg-border"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-light">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Panel - Instructions */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-green-900">Sub-steps</h3>
              <div className="space-y-2">
                {steps[currentStep].substeps.map((substep, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <span className="text-green-700 font-bold flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="text-muted-foreground">{substep}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-blue-900">Hint:</p>
              <p className="text-sm text-blue-800">
                {currentStep === 0
                  ? "Drag the meniran leaves to the oven to start the roasting process."
                  : "Drag the zinc solution to the extraction flask and add the meniran extract."}
              </p>
            </div>
          </div>

          {/* Right Panel - Simulation */}
          <div className="md:col-span-2">
            <VirtualLabSimulation
              stepId={currentStep}
              onStepComplete={() => handleStepComplete(currentStep)}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12 justify-end">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-border rounded-lg hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handleStepComplete(currentStep)}
            disabled={completedSteps.includes(currentStep)}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {completedSteps.includes(currentStep)
              ? "Completed"
              : "Complete Step"}
            {!completedSteps.includes(currentStep) && (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Completion Message */}
        {completedSteps.length === steps.length && (
          <div className="mt-12 p-8 bg-green-50 border border-green-200 rounded-lg text-center space-y-4">
            <h3 className="text-2xl font-semibold text-green-900">
              Congratulations!
            </h3>
            <p className="text-green-800">
              You have successfully completed the virtual lab simulation. You
              now understand the complete process of green synthesis of ZnO
              nanoparticles using Phyllanthus niruri leaf extract.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
