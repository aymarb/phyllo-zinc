"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, RotateCcw } from "lucide-react"; // Tambah ChevronLeft
import Link from "next/link";
import { VirtualLabSimulation } from "@/components/virtual-lab-simulation";

export default function VirtualLabPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0); 
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [completedSubSteps, setCompletedSubSteps] = useState<number[][]>([[], []]); // Melacak sub-step yang selesai per step

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

  const totalSubStepsCurrent = steps[currentStep].substeps.length;
  const isLastSubStep = currentSubStepIndex === totalSubStepsCurrent - 1;
  const isFirstSubStep = currentSubStepIndex === 0;
  const isStepComplete = completedSubSteps[currentStep].length === totalSubStepsCurrent;
  const isLastStep = currentStep === steps.length - 1;

  // FUNGSI BARU: Untuk navigasi antar step melalui bulatan (point 3)
  const handleStepChange = (stepId: number) => {
    if (stepId === currentStep) return;
    
    // Pastikan step berikutnya hanya bisa diakses jika step saat ini selesai
    if (stepId > currentStep && !isStepComplete) {
      alert("Please complete the current step before moving to the next one.");
      return;
    }
    
    setCurrentStep(stepId);
    setCurrentSubStepIndex(0); // Reset sub-step index saat pindah step
  };

  // FUNGSI BARU: Menangani penyelesaian satu langkah utama
  const completeCurrentStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  // FUNGSI BARU: Dipanggil oleh VirtualLabSimulation saat satu sub-step selesai
  const handleSubStepComplete = () => {
    setCompletedSubSteps(prev => {
        const newCompleted = [...prev];
        if (!newCompleted[currentStep].includes(currentSubStepIndex)) {
            newCompleted[currentStep] = [...newCompleted[currentStep], currentSubStepIndex];
        }
        return newCompleted;
    });

    // Pindah ke sub-step berikutnya secara otomatis jika belum yang terakhir
    if (!isLastSubStep) {
        setCurrentSubStepIndex(currentSubStepIndex + 1);
    } else {
        // Jika ini adalah sub-step terakhir, tandai langkah utama selesai
        completeCurrentStep(); 
    }
  };

  // FUNGSI BARU: Untuk navigasi mundur di dalam sub-step (point 3)
  const handlePreviousSubStep = () => {
    if (currentSubStepIndex > 0) {
      setCurrentSubStepIndex(currentSubStepIndex - 1);
    } else if (currentStep > 0) { // Navigasi ke Step sebelumnya jika di sub-step 1 (point 3)
      setCurrentStep(currentStep - 1);
      setCurrentSubStepIndex(steps[currentStep - 1].substeps.length - 1); // Pindah ke sub-step terakhir di Step sebelumnya
    }
  };


  const handleReset = () => {
    setCurrentStep(0);
    setCurrentSubStepIndex(0); 
    setCompletedSteps([]);
    setCompletedSubSteps([[], []]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation (tidak ada perubahan) */}
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
        {/* Progress Indicator (Navigasi Antar Step - point 3) */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4">
                <button
                  onClick={() => handleStepChange(step.id)} // Menggunakan fungsi handleStepChange
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    currentStep === step.id
                      ? "bg-green-700 text-white"
                      : completedSteps.includes(step.id)
                        ? "bg-green-200 text-green-700"
                        : "bg-border text-muted-foreground"
                  }`}
                  disabled={idx > 0 && !completedSteps.includes(idx - 1)} // Disable jika step sebelumnya belum selesai
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
                    <span className={`font-bold flex-shrink-0 ${
                      idx === currentSubStepIndex ? "text-red-700" : "text-green-700" 
                    }`}>
                      {idx + 1}.
                    </span>
                    <span className={`${
                      completedSubSteps[currentStep].includes(idx) ? "line-through text-gray-500" : "text-muted-foreground"
                    }`}>{substep}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HINT DIHAPUS (point 1) */}
          </div>

          {/* Right Panel - Simulation */}
          <div className="md:col-span-2">
            <VirtualLabSimulation
              stepId={currentStep}
              subStepIndex={currentSubStepIndex} 
              onSubStepComplete={handleSubStepComplete}
              isComplete={isStepComplete} // Kirim status penyelesaian Step
            />
          </div>
        </div>

        {/* Navigation Buttons (point 3 & 4) */}
        <div className="flex gap-4 mt-12 justify-end">
          
          {/* Previous Substep / Previous Step */}
          <button
            onClick={handlePreviousSubStep}
            disabled={currentStep === 0 && currentSubStepIndex === 0}
            className="px-6 py-2 border border-border rounded-lg hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFirstSubStep ? "Previous Step" : "Previous Substep"} 
          </button>

          {/* Next Step / Complete Message */}
          {isLastSubStep && !isLastStep && isStepComplete && ( // Tombol Next Step manual (point 4)
            <button
              onClick={() => handleStepChange(currentStep + 1)}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition flex items-center gap-2"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

        </div>

        {/* Completion Message for Final Step (point 7) */}
        {completedSteps.length === steps.length && (
          <div className="mt-12 p-8 bg-green-50 border border-green-200 rounded-lg text-center space-y-4">
            <h3 className="text-2xl font-semibold text-green-900">
              Congratulations! You have successfully completed the entire simulation.
            </h3>
            <p className="text-green-800">
              You now understand the complete process of green synthesis of ZnO nanoparticles using *Phyllanthus niruri* leaf extract.
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