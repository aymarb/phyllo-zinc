"use client";

import type React from "react";

import { useState, useRef } from "react";
import { AlertCircle } from "lucide-react";

interface DragItem {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface LabEquipment {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string;
}

interface VirtualLabSimulationProps {
  stepId: number;
  onStepComplete: () => void;
}

export function VirtualLabSimulation({
  stepId,
  onStepComplete,
}: VirtualLabSimulationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Step 1: Leaf Extraction
  const step1Equipment: LabEquipment[] = [
    {
      id: "oven",
      name: "Oven (35°C)",
      x: 50,
      y: 50,
      width: 120,
      height: 100,
      icon: "🔥",
    },
    {
      id: "grinder",
      name: "Grinder",
      x: 250,
      y: 50,
      width: 120,
      height: 100,
      icon: "⚙️",
    },
    {
      id: "scale",
      name: "Scale",
      x: 450,
      y: 50,
      width: 120,
      height: 100,
      icon: "⚖️",
    },
    {
      id: "beaker",
      name: "Beaker",
      x: 50,
      y: 200,
      width: 120,
      height: 100,
      icon: "🧪",
    },
    {
      id: "filter",
      name: "Filter Paper",
      x: 250,
      y: 200,
      width: 120,
      height: 100,
      icon: "📄",
    },
    {
      id: "collection",
      name: "Collection Vial",
      x: 450,
      y: 200,
      width: 120,
      height: 100,
      icon: "🧫",
    },
  ];

  // Step 2: Nanoparticle Synthesis
  const step2Equipment: LabEquipment[] = [
    {
      id: "zinc-solution",
      name: "Zn Solution",
      x: 50,
      y: 50,
      width: 120,
      height: 100,
      icon: "🧪",
    },
    {
      id: "extraction-flask",
      name: "Extraction Flask",
      x: 250,
      y: 50,
      width: 120,
      height: 100,
      icon: "🧫",
    },
    {
      id: "hotplate",
      name: "Hotplate (60°C)",
      x: 450,
      y: 50,
      width: 120,
      height: 100,
      icon: "🔥",
    },
    {
      id: "naoh-solution",
      name: "NaOH Solution",
      x: 50,
      y: 200,
      width: 120,
      height: 100,
      icon: "🧪",
    },
    {
      id: "centrifuge",
      name: "Centrifuge",
      x: 250,
      y: 200,
      width: 120,
      height: 100,
      icon: "⚡",
    },
    {
      id: "muffle-furnace",
      name: "Muffle Furnace",
      x: 450,
      y: 200,
      width: 120,
      height: 100,
      icon: "🔥",
    },
  ];

  const equipment = stepId === 0 ? step1Equipment : step2Equipment;

  const requiredActions =
    stepId === 0
      ? ["oven", "grinder", "scale", "beaker", "filter", "collection"]
      : [
          "zinc-solution",
          "extraction-flask",
          "hotplate",
          "naoh-solution",
          "centrifuge",
          "muffle-furnace",
        ];

  const handleDragStart = (item: LabEquipment) => {
    setDraggedItem({ id: item.id, name: item.name, x: item.x, y: item.y });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if dropped on correct equipment
    const targetEquipment = equipment.find(
      (eq) =>
        x >= eq.x && x <= eq.x + eq.width && y >= eq.y && y <= eq.y + eq.height,
    );

    if (targetEquipment && !completedActions.includes(draggedItem.id)) {
      setCompletedActions([...completedActions, draggedItem.id]);
      setFeedback({
        message: `✓ ${draggedItem.name} used correctly!`,
        type: "success",
      });

      if (completedActions.length + 1 === requiredActions.length) {
        setTimeout(() => {
          onStepComplete();
        }, 1000);
      }
    } else if (targetEquipment && completedActions.includes(draggedItem.id)) {
      setFeedback({ message: "Already used this equipment", type: "error" });
    } else {
      setFeedback({ message: "Drop on the correct equipment!", type: "error" });
    }

    setDraggedItem(null);

    setTimeout(() => setFeedback(null), 2000);
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
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}

      {/* Lab Canvas */}
      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 border-2 border-dashed border-green-300 rounded-lg p-6 min-h-96"
      >
        {/* Equipment Grid */}
        <div className="grid grid-cols-3 gap-4 h-full">
          {equipment.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className={`p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition ${
                completedActions.includes(item.id)
                  ? "bg-green-100 border-green-400 opacity-60"
                  : "bg-white border-border hover:border-green-400 hover:shadow-lg"
              }`}
            >
              <div className="text-4xl mb-2 text-center">{item.icon}</div>
              <p className="text-sm font-medium text-center">{item.name}</p>
              {completedActions.includes(item.id) && (
                <p className="text-xs text-green-700 text-center mt-1 font-semibold">
                  ✓ Used
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Progress</p>
          <p className="text-sm text-muted-foreground">
            {completedActions.length} / {requiredActions.length}
          </p>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-green-700 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedActions.length / requiredActions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Instructions:</span> Drag each piece
          of equipment to use it in the correct order. Complete all steps to
          proceed to the next stage.
        </p>
      </div>
    </div>
  );
}
