"use client";

import React, { useState, useRef, useMemo } from "react";
import { AlertCircle, Scissors, Leaf, UtensilsCrossed, Scale, Beaker, FlaskConical, Filter, Droplet, Zap, Trello, Thermometer, SlidersHorizontal, Package, Flame } from "lucide-react";

interface VirtualLabSimulationProps {
  stepId: number;
  subStepIndex: number;
  onSubStepComplete: () => void;
  isComplete: boolean; // Status Step Utama selesai
}

// Definisikan KONFIGURASI UNTUK SETIAP SUB-STEP (point 6)
const SUB_STEP_CONFIG = {
  // --- Konfigurasi Step 1: Extract Meniran Leaves (ID 0) ---
  0: [
    // Sub-step 1: Chop meniran leaves to small pieces
    {
      action: "Chop meniran leaves to small pieces",
      items: [
        { id: "leaves", name: "Meniran Leaves", icon: <Leaf className="w-12 h-12" /> },
        { id: "knife", name: "Knife/Chopper", icon: <Scissors className="w-12 h-12" /> },
      ],
      target: { drag: "knife", drop: "leaves" },
      successMessage: "Leaves successfully chopped!", // point 2
    },
    // Sub-step 2: Roast in oven at 35°C for 3 days
    {
      action: "Roast in oven at 35°C for 3 days",
      items: [
        { id: "chopped-leaves", name: "Chopped Leaves", icon: <Leaf className="w-12 h-12 text-green-700" /> },
        { id: "oven", name: "Oven (35°C)", icon: <UtensilsCrossed className="w-12 h-12" /> },
      ],
      target: { drag: "chopped-leaves", drop: "oven" },
      successMessage: "Roasting complete. Ready for grinding!",
    },
    // Sub-step 3: Grind until it becomes powder
    {
      action: "Grind until it becomes powder",
      items: [
        { id: "roasted-leaves", name: "Roasted Leaves", icon: <Leaf className="w-12 h-12 text-yellow-700" /> },
        { id: "grinder", name: "Grinder", icon: <Zap className="w-12 h-12" /> },
      ],
      target: { drag: "roasted-leaves", drop: "grinder" },
      successMessage: "Leaves powdered. Ready for weighing!",
    },
    // Sub-step 4: Weigh the powder
    {
      action: "Weigh the powder",
      items: [
        { id: "powder", name: "Meniran Powder", icon: <Droplet className="w-12 h-12 text-gray-700" /> },
        { id: "scale", name: "Scale", icon: <Scale className="w-12 h-12" /> },
      ],
      target: { drag: "powder", drop: "scale" },
      successMessage: "Powder weighed. Ready for dissolution!",
    },
    // Sub-step 5: Dissolve using aquadest (ratio 1:10)
    {
      action: "Dissolve using aquadest (ratio 1:10)",
      items: [
        { id: "weighed-powder", name: "Weighed Powder", icon: <Droplet className="w-12 h-12 text-gray-700" /> },
        { id: "aquadest", name: "Aquadest (1:10)", icon: <Beaker className="w-12 h-12 text-blue-500" /> },
      ],
      target: { drag: "weighed-powder", drop: "aquadest" },
      successMessage: "Mixture for maceration prepared!",
    },
    // Sub-step 6: Extract using hot maceration method
    {
      action: "Extract using hot maceration method",
      items: [
        { id: "mixture", name: "Powder/Aquadest Mixture", icon: <FlaskConical className="w-12 h-12" /> },
        { id: "hotplate", name: "Hot Macerator", icon: <UtensilsCrossed className="w-12 h-12 text-red-500" /> },
      ],
      target: { drag: "mixture", drop: "hotplate" },
      successMessage: "Hot maceration complete. Ready for filtration!",
    },
    // Sub-step 7: Filter using Whatman No.1 filtration paper
    {
      action: "Filter using Whatman No.1 filtration paper",
      items: [
        { id: "raw-extract", name: "Raw Extract", icon: <FlaskConical className="w-12 h-12 text-yellow-500" /> },
        { id: "filter-setup", name: "Filter Setup (Whatman No.1)", icon: <Filter className="w-12 h-12" /> },
      ],
      target: { drag: "raw-extract", drop: "filter-setup" },
      successMessage: "Filtrate collected!",
    },
    // Sub-step 8: Collect the meniran leaves extract (Sub-step terakhir Step 1)
    {
      action: "Collect the meniran leaves extract",
      items: [
        { id: "filtered-extract", name: "Filtered Extract", icon: <Droplet className="w-12 h-12 text-yellow-500" /> },
        { id: "collection-vial", name: "Collection Vial", icon: <Beaker className="w-12 h-12 text-green-500" /> },
      ],
      target: { drag: "filtered-extract", drop: "collection-vial" },
      successMessage: "Meniran Extract collected. Step 1 Complete! Click 'Next Step' to continue.",
    },
  ],
  // --- Konfigurasi Step 2: Synthesize ZnO Nanoparticles (ID 1) ---
  1: [
    // Sub-step 1: Prepare 0.1 M Zn(CH₃COO)₂·2H₂O solution in 50 mL distilled water
    {
      action: "Prepare 0.1 M Zn(CH₃COO)₂·2H₂O solution",
      items: [
        { id: "zn-salt", name: "Zn Salt Powder", icon: <Package className="w-12 h-12 text-gray-400" /> },
        { id: "distilled-water", name: "50 mL Distilled Water", icon: <Beaker className="w-12 h-12 text-blue-300" /> },
      ],
      target: { drag: "zn-salt", drop: "distilled-water" },
      successMessage: "Zn Acetate solution prepared!",
    },
    // Sub-step 2: Stir using magnetic stirrer for 10 minutes
    {
      action: "Stir using magnetic stirrer for 10 minutes",
      items: [
        { id: "zn-solution", name: "Zn Solution", icon: <Beaker className="w-12 h-12 text-purple-400" /> },
        { id: "stirrer", name: "Magnetic Stirrer", icon: <Trello className="w-12 h-12" /> },
      ],
      target: { drag: "zn-solution", drop: "stirrer" },
      successMessage: "Stirring complete!",
    },
    // Sub-step 3: Add 2.5 mL meniran leaf extract dropwise over 2 hours
    {
      action: "Add 2.5 mL meniran leaf extract dropwise over 2 hours",
      items: [
        { id: "extract-pipette", name: "Meniran Extract (2.5 mL)", icon: <Droplet className="w-12 h-12 text-yellow-600" /> },
        { id: "stirred-zn", name: "Stirred Zn Solution", icon: <Beaker className="w-12 h-12 text-purple-400" /> },
      ],
      target: { drag: "extract-pipette", drop: "stirred-zn" },
      successMessage: "Extract added. Colloidal solution formed!",
    },
    // Sub-step 4: Maintain temperature at 60°C on hotplate magnetic stirrer
    {
      action: "Maintain temperature at 60°C on hotplate magnetic stirrer",
      items: [
        { id: "colloidal-sol", name: "Colloidal Solution", icon: <FlaskConical className="w-12 h-12 text-green-400" /> },
        { id: "hotplate-60c", name: "Hotplate (60°C)", icon: <Thermometer className="w-12 h-12 text-red-600" /> },
      ],
      target: { drag: "colloidal-sol", drop: "hotplate-60c" },
      successMessage: "Temperature maintained. Reaction ongoing!",
    },
    // Sub-step 5: Add 0.1 M NaOH to maintain pH at 12
    {
      action: "Add 0.1 M NaOH to maintain pH at 12",
      items: [
        { id: "naoh-solution", name: "0.1 M NaOH", icon: <Droplet className="w-12 h-12 text-red-400" /> },
        { id: "reacting-sol", name: "Reacting Solution", icon: <FlaskConical className="w-12 h-12 text-green-400" /> },
      ],
      target: { drag: "naoh-solution", drop: "reacting-sol" },
      successMessage: "pH adjusted to 12. Precursor precipitation complete!",
    },
    // Sub-step 6: Centrifuge colloidal solution at 6,000 rpm for 5 minutes
    {
      action: "Centrifuge colloidal solution at 6,000 rpm for 5 minutes",
      items: [
        { id: "precursor-sol", name: "Precursor Solution", icon: <Beaker className="w-12 h-12 text-green-600" /> },
        { id: "centrifuge", name: "Centrifuge (6,000 rpm)", icon: <SlidersHorizontal className="w-12 h-12" /> },
      ],
      target: { drag: "precursor-sol", drop: "centrifuge" },
      successMessage: "Centrifugation complete. Residue isolated!",
    },
    // Sub-step 7: Wash residue with distilled water
    {
      action: "Wash residue with distilled water",
      items: [
        { id: "residue", name: "Residue (Precursor)", icon: <Package className="w-12 h-12 text-gray-500" /> },
        { id: "distilled-water-wash", name: "Distilled Water for Wash", icon: <Beaker className="w-12 h-12 text-blue-300" /> },
      ],
      target: { drag: "distilled-water-wash", drop: "residue" }, // Drag air ke residu
      successMessage: "Residue washed clean!",
    },
    // Sub-step 8: Dry in oven at 105°C for 24 hours until pale white
    {
      action: "Dry in oven at 105°C for 24 hours until pale white",
      items: [
        { id: "washed-residue", name: "Washed Precursor", icon: <Package className="w-12 h-12 text-yellow-200" /> },
        { id: "oven-105c", name: "Drying Oven (105°C)", icon: <UtensilsCrossed className="w-12 h-12 text-orange-600" /> },
      ],
      target: { drag: "washed-residue", drop: "oven-105c" },
      successMessage: "Precursor dried. Ready for calcination!",
    },
    // Sub-step 9: Calcine at 550°C for 30 minutes in muffle furnace
    {
      action: "Calcine at 550°C for 30 minutes in muffle furnace",
      items: [
        { id: "dried-precursor", name: "Dried Precursor", icon: <Package className="w-12 h-12 text-yellow-400" /> },
        { id: "muffle-furnace", name: "Muffle Furnace (550°C)", icon: <Flame className="w-12 h-12 text-red-800" /> },
      ],
      target: { drag: "dried-precursor", drop: "muffle-furnace" },
      successMessage: "Calcination complete. ZnO Nanoparticles formed!",
    },
    // Sub-step 10: Collect final ZnO nanoparticle product (gn-ZnO) (Sub-step terakhir Step 2)
    {
      action: "Collect final ZnO nanoparticle product (gn-ZnO)",
      items: [
        { id: "gn-zno", name: "gn-ZnO Nanoparticles", icon: <Package className="w-12 h-12 text-white bg-gray-600" /> },
        { id: "collection-vial-final", name: "Final Collection Vial", icon: <Beaker className="w-12 h-12 text-gray-500" /> },
      ],
      target: { drag: "gn-zno", drop: "collection-vial-final" },
      successMessage: "Final ZnO Nanoparticle product collected. Simulation Complete!",
    },
  ],
};


// Komponen yang mewakili item yang dapat diseret/dijatuhkan
const LabItem = ({ item, handleDragStart, handleDrop, isTarget, isDraggable }: any) => {
    return (
        <div 
            key={item.id}
            draggable={isDraggable}
            onDragStart={(e) => isDraggable && handleDragStart(e, item.id)}
            onDragOver={(e) => isTarget && e.preventDefault()}
            onDrop={(e) => isTarget && handleDrop(e, item.id)} 
            data-id={item.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center h-40 w-40 text-center ${
                isDraggable 
                    ? "bg-white border-blue-400 hover:border-blue-600 shadow-md active:cursor-grabbing" 
                    : isTarget 
                        ? "bg-green-50 border-green-500 border-dashed hover:border-green-700 hover:shadow-lg"
                        : "bg-gray-100 border-gray-300"
            }`}
        >
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium">{item.name}</p>
             {/* Hapus label drag/drop zone (point 5) */}
        </div>
    );
};


export function VirtualLabSimulation({
  stepId,
  subStepIndex,
  onSubStepComplete,
  isComplete
}: VirtualLabSimulationProps) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Dapatkan konfigurasi untuk sub-step saat ini
  const currentStepConfig = SUB_STEP_CONFIG[stepId as keyof typeof SUB_STEP_CONFIG];
  const currentSubStep = useMemo(() => {
    if (currentStepConfig && subStepIndex < currentStepConfig.length) {
      return currentStepConfig[subStepIndex];
    }
    return null;
  }, [stepId, subStepIndex, currentStepConfig]);
  
  // Tampilkan pesan Step Selesai
  if (!currentSubStep) {
    return (
        <div className="p-8 bg-green-100 border border-green-300 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-green-800">
                Step {stepId + 1} is Complete!
            </h3>
            {stepId === 0 ? (
                <p className="mt-2 text-green-700">Please click the **Next Step** button below to continue to the synthesis stage.</p>
            ) : (
                <p className="mt-2 text-green-700">All steps are finalized. You may now return to the home screen.</p>
            )}
        </div>
    );
  }

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItemId(itemId);
    e.dataTransfer.setData("text/plain", itemId);
  };

  const handleDrop = (e: React.DragEvent, droppedOnId: string) => {
    e.preventDefault();
    
    const dragId = e.dataTransfer.getData("text/plain"); 
    
    if (dragId === currentSubStep.target.drag && droppedOnId === currentSubStep.target.drop) {
      // Interaksi SUKSES!
      setFeedback({
        message: `✓ ${currentSubStep.successMessage}`,
        type: "success",
      });

      // Panggil fungsi penyelesaian dan pindah ke sub-step berikutnya
      setTimeout(() => {
        setFeedback(null);
        onSubStepComplete();
      }, 1500);
      
    } else {
      // Interaksi GAGAL
      setFeedback({ message: "❌ Incorrect action! Drag the correct item to the correct target.", type: "error" }); // point 2
      setTimeout(() => setFeedback(null), 2000);
    }
    
    setDraggedItemId(null);
  };

  return (
    <div className="space-y-4">
      {/* Feedback Message */}
      {feedback && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            feedback.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{feedback.message}</p>
        </div>
      )}

      {/* Lab Canvas */}
      <div
        className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 border-2 border-dashed border-green-300 rounded-lg p-6 min-h-96 flex items-center justify-center"
      >
        <div className="grid grid-cols-2 gap-8">
            {currentSubStep.items.map((item) => (
                <LabItem 
                    key={item.id}
                    item={item}
                    isDraggable={item.id === currentSubStep.target.drag}
                    isTarget={item.id === currentSubStep.target.drop}
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                />
            ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Progress Sub-step</p>
          <p className="text-sm text-muted-foreground">
            {subStepIndex + 1} / {currentStepConfig.length}
          </p>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-green-700 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((subStepIndex + 1) / currentStepConfig.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Current Task:</span> {currentSubStep.action}. Drag the **{currentSubStep.target.drag.toUpperCase().replace('-', ' ')}** to the **{currentSubStep.target.drop.toUpperCase().replace('-', ' ')}** to proceed.
        </p>
      </div>
    </div>
  );
}