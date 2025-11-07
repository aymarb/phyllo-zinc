"use client";
/*
Phyllozinc Virtual Lab — Top-down 2D multi-scene interactive (Next.js + dnd-kit + Framer Motion)

This file is a revised version where drag & drop uses dnd-kit hooks:
- useDraggable for draggable items
- useDroppable for drop zones

The navbar has been made minimal & consistent with the workspace: centered max width,
sticky translucent background, small progress indicator, scene label, and reset control.
*/

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";

const SCENES = [
  "Collect Leaves",
  "Grind Leaves",
  "Mix Solvent",
  "Hot Maceration",
  "Filter Extract",
  "Make Zinc NP",
  "Final Mix",
];

const SCENE_DESCRIPTIONS = [
  "Collect 5 leaves by dragging them into the beaker.",
  "Place the beaker into the grinder and press Start to obtain powder.",
  "Add solvent to the beaker to begin extraction.",
  "Move the beaker to the heater to simulate maceration.",
  "Drag the beaker to the filter to separate solids and filtrate.",
  "Add zinc reagent to the mixer to prepare nanoparticles (simulated).",
  "Combine nanoparticles with the extract to finalize the product.",
];

export default function PhyllozincTopDownLab() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [globalState, setGlobalState] = useState({
    isGrounded: false,
    zincPrepared: false,
    extractFiltered: false,
  });

  function goNext() {
    setSceneIndex((i) => Math.min(SCENES.length - 1, i + 1));
  }
  function goPrev() {
    setSceneIndex((i) => Math.max(0, i - 1));
  }

  function handleReset() {
    setSceneIndex(0);
    setGlobalState({
      isGrounded: false,
      zincPrepared: false,
      extractFiltered: false,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white flex flex-col">
      {/* Minimal consistent nav with progress and reset */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 hover:text-green-700 transition"
          >
            <Home className="w-5 h-5 text-green-700" />
            <span className="font-semibold text-sm text-green-700">Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {SCENES[sceneIndex]}
            </div>

            <div className="flex items-center gap-3 bg-background border border-border rounded-md px-3 py-1 text-sm">
              <div className="text-muted-foreground">
                {sceneIndex + 1}/{SCENES.length}
              </div>
              <div className="w-36 h-2 bg-green-50 rounded overflow-hidden">
                <div
                  className="h-full bg-green-700 transition-all"
                  style={{
                    width: `${((sceneIndex + 1) / SCENES.length) * 100}%`,
                  }}
                  aria-hidden
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              aria-label="Reset simulation"
              title="Reset simulation"
              className="flex items-center gap-2 px-3 py-1 border border-border rounded-md hover:bg-green-50 transition text-sm text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
            <div className="flex-1 min-h-[60vh] p-6 bg-emerald-50/20 flex items-center justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <SceneManager
                  sceneIndex={sceneIndex}
                  setSceneIndex={setSceneIndex}
                  setGlobalState={(s) =>
                    setGlobalState((prev) => ({ ...prev, ...s }))
                  }
                  globalState={globalState}
                />
              </div>
            </div>

            <aside className="hidden md:block w-96 p-6 bg-white border-l">
              <h3 className="text-sm font-semibold mb-2">
                {SCENES[sceneIndex]}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {SCENE_DESCRIPTIONS[sceneIndex]}
              </p>

              <div className="text-xs text-muted-foreground">
                Assets:
                <ul className="list-disc list-inside mt-2">
                  <li>See individual scene panel for specific assets</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="p-3 text-xs text-slate-500 text-center">
        Replace images in <code>/public/images/</code> — see asset list in
        bottom panel inside scenes.
      </footer>
    </div>
  );
}

function SceneManager({
  sceneIndex,
  setSceneIndex,
  setGlobalState,
  globalState,
}) {
  const commonProps = {
    setSceneIndex,
    setGlobalState,
    globalState,
    compactLayout: true,
    sceneIndex,
  };
  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {sceneIndex === 0 && <SceneCollectLeaves key="s1" {...commonProps} />}
        {sceneIndex === 1 && <SceneGrind key="s2" {...commonProps} />}
        {sceneIndex === 2 && <SceneMixSolvent key="s3" {...commonProps} />}
        {sceneIndex === 3 && <SceneHotMaceration key="s4" {...commonProps} />}
        {sceneIndex === 4 && <SceneFilter key="s5" {...commonProps} />}
        {sceneIndex === 5 && <SceneMakeZinc key="s6" {...commonProps} />}
        {sceneIndex === 6 && <SceneFinalMix key="s7" {...commonProps} />}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Scene 1: Collect Leaves (drag 5 leaves into beaker) ----------------
function SceneCollectLeaves({ setSceneIndex, setGlobalState, compactLayout }) {
  // now 5 leaves
  const [leaves] = useState(() => [
    "leaf-1",
    "leaf-2",
    "leaf-3",
    "leaf-4",
    "leaf-5",
  ]);
  const [collected, setCollected] = useState([]); // ids collected
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (
      over.id === "beaker-drop" &&
      active?.id &&
      active.id.startsWith("leaf-")
    ) {
      setCollected((prev) => {
        if (prev.includes(active.id)) return prev;
        return [...prev, active.id];
      });
    }
  }

  useEffect(() => {
    // require 5 leaves now
    if (collected.length >= 5) {
      setTimeout(() => {
        setGlobalState({}); // no global change here
        setSceneIndex((i) => i + 1);
      }, 900);
    }
  }, [collected, setGlobalState, setSceneIndex]);

  return (
    <motion.section
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="w-full h-full flex items-stretch"
    >
      {/* left: play area */}
      <div className="flex-1 p-8 relative bg-emerald-50/30 overflow-hidden">
        <div className="absolute left-8 top-8 text-sm text-slate-600">
          Collect 5 leaves into the beaker
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* beaker drop zone at center-right */}
          <div className="absolute right-24 top-1/2 -translate-y-1/2">
            <DropZoneBeaker
              id="beaker-drop"
              collectedCount={collected.length}
            />
          </div>

          {/* scattered leaves pool (top-left) */}
          <div className="absolute left-12 top-24 grid grid-cols-3 gap-4">
            {leaves.map((id, idx) => (
              <DraggableLeaf
                key={id}
                id={id}
                collected={collected.includes(id)}
                style={{ transform: `rotate(${(idx % 5) * 6 - 6}deg)` }}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium mb-2">Step 1 — Pengumpulan Daun</h2>
          <p className="text-sm text-slate-600 mb-3">
            Drag daun-daun yang berserakan ke beaker. Kamu butuh{" "}
            <strong>5 daun</strong> untuk lanjut.
          </p>

          <div className="mt-4">
            <div className="text-sm">Collected:</div>
            <div className="mt-2 flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center ${
                    i < collected.length ? "bg-emerald-100" : "bg-slate-50"
                  }`}
                >
                  {i < collected.length ? "✓" : ""}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Assets to replace:
            <ul className="list-disc list-inside mt-2">
              <li>/images/leaves_topdown_1.png — ALT: leaf small top-down</li>
              <li>
                /images/beaker_topdown.png — ALT: beaker top-down (drop target)
              </li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function DraggableLeaf({ id, collected, style }) {
  // If collected, don't render the leaf (disappear instead of lowered opacity)
  if (collected) return null;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: false,
  });

  // Filter out aria-describedby which dnd-kit may generate differently between server and client
  const safeAttributes = { ...attributes };
  if ("aria-describedby" in safeAttributes)
    delete safeAttributes["aria-describedby"];

  const draggingStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...safeAttributes}
      className={`w-24 h-24 cursor-grab`}
      style={{ ...style, ...draggingStyle }}
      aria-hidden={false}
    >
      <img
        src="/meniranleaves.png"
        alt="LEAF - top-down"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function DropZoneBeaker({ id, collectedCount }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="w-48 h-56 flex items-end justify-center">
      <motion.div
        animate={{
          scale: isOver ? 1.02 : collectedCount >= 5 ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={`w-36 h-40 bg-white/80 rounded-2xl border flex items-end justify-center p-2 shadow ${
          isOver ? "ring-2 ring-emerald-300" : ""
        }`}
      >
        <img
          src="/beaker.png"
          alt="BEAKER - top-down"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}

// ---------------- Scene 2: Grind Leaves (drag beaker to grinder then press start) ----------------
function SceneGrind({ setSceneIndex, setGlobalState, compactLayout }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const [placed, setPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "grinder-drop" && active.id === "beaker-top") {
      setPlaced(true);
    }
  }

  function startGrind() {
    if (!placed) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setGlobalState({ isGrounded: true });
      setTimeout(() => setSceneIndex((i) => i + 1), 700);
    }, 1100);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-slate-50">
        <div className="absolute left-8 top-8 text-sm">
          Drag beaker (top) to grinder and press Start
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/3">
            <DraggableBeaker id="beaker-top" placed={placed} />
          </div>
          <div className="absolute right-32 top-1/2 -translate-y-1/2">
            <GrinderDrop id="grinder-drop" placed={placed} />
          </div>
        </DndContext>

        {/* grinder panel */}
        <div className="absolute right-32 bottom-12 w-60 p-4 bg-white border rounded">
          <div className="text-sm font-medium">Grinder</div>
          <div className="mt-2 text-xs text-slate-500">
            {placed
              ? processing
                ? "Grinding..."
                : "Ready"
              : "Awaiting beaker"}
          </div>
          <button
            onClick={startGrind}
            disabled={!placed || processing}
            className="mt-3 px-3 py-1 bg-emerald-50 border rounded disabled:opacity-50"
          >
            Start
          </button>
        </div>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 2 — Grinding</h2>
          <p className="text-sm text-slate-600">
            Drag beaker ke grinder lalu tekan "Start". Setelah selesai, daun
            berubah menjadi bubuk.
          </p>

          <div className="mt-6 text-xs text-slate-500">
            Assets to replace:
            <ul className="list-disc list-inside mt-2">
              <li>/images/beaker_topdown.png — beaker (same as previous)</li>
              <li>/images/grinder_topdown.png — grinder top-down</li>
              <li>/images/powder_icon.png — powder icon</li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function DraggableBeaker({ id, placed }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: placed,
  });

  const safeAttributes = { ...attributes };
  if ("aria-describedby" in safeAttributes)
    delete safeAttributes["aria-describedby"];

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...safeAttributes}
      className={`w-32 h-36 ${placed ? "opacity-60" : "cursor-grab"}`}
      style={style}
    >
      <img
        src="/beaker.png"
        alt="beaker"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function GrinderDrop({ id, placed }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-56 h-56 flex items-center justify-center relative"
    >
      <img
        src="/grinder.png"
        alt="GRINDER - top-down"
        className="w-56 h-56 object-contain"
      />
      {placed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute text-emerald-600 font-medium"
        >
          Placed
        </motion.div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-emerald-300 rounded" />
      ) : null}
    </div>
  );
}

// ---------------- Scene 3: Mix Solvent ----------------
function SceneMixSolvent({ setSceneIndex, compactLayout }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const [poured, setPoured] = useState(false);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "beaker-drop" && active.id === "solvent-bottle") {
      setPoured(true);
      setTimeout(() => {
        setSceneIndex((i) => i + 1);
      }, 700);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-amber-50/10">
        <div className="absolute left-8 top-8 text-sm">
          Drag the solvent bottle to the beaker to mix (aquadest)
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableSolvent id="solvent-bottle" poured={poured} />
          </div>

          <div className="absolute right-32 top-1/2 -translate-y-1/2">
            <BeakerDropStatic id="beaker-drop" poured={poured} />
          </div>
        </DndContext>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 3 — Mix with Aquadest</h2>
          <p className="text-sm text-slate-600">
            Pouring solvent will start the extraction process (simulated).
          </p>

          <div className="mt-6 text-xs text-slate-500">
            Assets:
            <ul className="list-disc list-inside mt-2">
              <li>
                /images/solvent_bottle_topdown.png — aquadest bottle top-down
              </li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function DraggableSolvent({ id, poured }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: poured,
  });

  const safeAttributes = { ...attributes };
  if ("aria-describedby" in safeAttributes)
    delete safeAttributes["aria-describedby"];

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...safeAttributes}
      className={`w-28 h-28 ${poured ? "opacity-40" : "cursor-grab"}`}
      style={style}
    >
      <img
        src="/solvent.png"
        alt="solvent"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function BeakerDropStatic({ id, poured }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-48 h-52 flex items-end justify-center relative"
    >
      <img
        src="/beaker.png"
        alt="beaker"
        className="w-40 h-40 object-contain"
      />
      {poured ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute text-blue-600"
        >
          Mixed
        </motion.div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-blue-300 rounded" />
      ) : null}
    </div>
  );
}

// ---------------- Scene 4: Hot Maceration ----------------
function SceneHotMaceration({ setSceneIndex, compactLayout }) {
  const [placed, setPlaced] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "heater-drop" && active.id === "beaker-top") {
      setPlaced(true);
      setTimeout(() => setSceneIndex((i) => i + 1), 900);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-orange-50/10">
        <div className="absolute left-8 top-8 text-sm">
          Drag beaker to heater (Hot Maceration)
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableBeaker id="beaker-top" placed={false} />
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <HotHeaterDrop id="heater-drop" placed={placed} />
          </div>
        </DndContext>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 4 — Hot Maceration</h2>
          <p className="text-sm text-slate-600">
            Drag the beaker into the heater to simulate hot maceration. Wait a
            little for color change.
          </p>
          <div className="mt-6 text-xs text-slate-500">
            Assets:
            <ul className="list-disc list-inside mt-2">
              <li>/images/heater_topdown.png — heater top-down</li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function HotHeaterDrop({ id, placed }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-60 h-60 flex items-center justify-center border rounded relative"
    >
      <img
        src="/hotplate.png"
        alt="heater"
        className="w-40 h-40 object-contain"
      />
      {placed ? (
        <div className="absolute text-amber-600">Heating...</div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-amber-300 rounded" />
      ) : null}
    </div>
  );
}

// ---------------- Scene 5: Filter Extract ----------------
function SceneFilter({ setSceneIndex, compactLayout }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const [filtered, setFiltered] = useState(false);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "filter-drop" && active.id === "beaker-top") {
      setFiltered(true);
      setTimeout(() => setSceneIndex((i) => i + 1), 900);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-white">
        <div className="absolute left-8 top-8 text-sm">
          Drag beaker to filter paper to perform filtration
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableBeaker id="beaker-top" placed={false} />
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <FilterDrop id="filter-drop" filtered={filtered} />
          </div>
        </DndContext>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 5 — Filtration</h2>
          <p className="text-sm text-slate-600">
            Drag the beaker to the filter paper. The filtrate will pass through
            and solids remain on paper.
          </p>
          <div className="mt-6 text-xs text-slate-500">
            Assets:
            <ul className="list-disc list-inside mt-2">
              <li>/images/filterpaper_topdown.png — filter paper top-down</li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function FilterDrop({ id, filtered }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-56 h-56 flex items-center justify-center border rounded relative"
    >
      <img
        src="/filterpaper.png"
        alt="filter paper"
        className="w-40 h-40 object-contain"
      />
      {filtered ? (
        <div className="absolute text-slate-600">Filtered</div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-slate-300 rounded" />
      ) : null}
    </div>
  );
}

// ---------------- Scene 6: Make Zinc NP ----------------
function SceneMakeZinc({ setSceneIndex, setGlobalState, compactLayout }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const [prepared, setPrepared] = useState(false);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "mix-drop" && active.id === "zinc-bottle") {
      setPrepared(true);
      setTimeout(() => {
        setGlobalState({ zincPrepared: true });
        setSceneIndex((i) => i + 1);
      }, 900);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-sky-50/10">
        <div className="absolute left-8 top-8 text-sm">
          Prepare Zinc Acetate nanoparticles — drag reagent to mixer
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableZinc id="zinc-bottle" prepared={prepared} />
          </div>
          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <MixerDrop id="mix-drop" prepared={prepared} />
          </div>
        </DndContext>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 6 — Nanoparticle Synthesis</h2>
          <p className="text-sm text-slate-600">
            Drag zinc acetate reagent into mixer to prepare nanoparticles
            (simulated).
          </p>
          <div className="mt-6 text-xs text-slate-500">
            Assets:
            <ul className="list-disc list-inside mt-2">
              <li>
                /images/zinc_bottle_topdown.png — zinc acetate reagent bottle
              </li>
              <li>
                /images/nanoparticle_icon.png — nanoparticle icon (result)
              </li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function DraggableZinc({ id, prepared }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: prepared,
  });

  const safeAttributes = { ...attributes };
  if ("aria-describedby" in safeAttributes)
    delete safeAttributes["aria-describedby"];

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...safeAttributes}
      className={`w-28 h-28 ${prepared ? "opacity-40" : "cursor-grab"}`}
      style={style}
    >
      <img
        src="/zinc.jpg"
        alt="zinc bottle"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function MixerDrop({ id, prepared }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-56 h-56 flex items-center justify-center border rounded relative"
    >
      <div className="text-sm">Mixer</div>
      {prepared ? (
        <div className="absolute text-emerald-700">Prepared</div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-emerald-300 rounded" />
      ) : null}
    </div>
  );
}

// ---------------- Scene 7: Final Mix ----------------
function SceneFinalMix({ globalState, compactLayout }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const [done, setDone] = useState(false);

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (
      over.id === "final-beaker" &&
      active.id === "np-icon" &&
      globalState.zincPrepared
    ) {
      setDone(true);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex"
    >
      <div className="flex-1 p-8 relative bg-violet-50/10">
        <div className="absolute left-8 top-8 text-sm">
          Combine nanoparticle with extract to finish Phyllozinc product
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableNP id="np-icon" enabled={!!globalState.zincPrepared} />
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <FinalBeakerDrop id="final-beaker" done={done} />
          </div>
        </DndContext>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-1/2 top-24 -translate-x-1/2 bg-transparent p-0 rounded shadow flex flex-col items-center"
            >
              {/* Top: product image contained in a white card with rounded top corners */}
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="bg-white rounded-t-lg p-4"
              >
                <img
                  src="/finalproduct.png"
                  alt="Phyllozinc final product"
                  className="w-70 h-70 object-contain"
                />
              </motion.div>

              {/* Bottom: seamless congratulatory strip connected to the image */}
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  delay: 0.08,
                }}
                className="w-full bg-emerald-700 text-white text-center rounded-b-lg px-6 py-3"
              >
                <div className="text-lg font-semibold">
                  Produk Selesai — Phyllozinc
                </div>
                <div className="text-sm mt-1">
                  Selamat! Kamu telah membuat Phyllozinc-mu sendiri.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!compactLayout ? (
        <aside className="w-80 bg-white p-6 border-l">
          <h2 className="font-medium">Step 7 — Final Mixing</h2>
          <p className="text-sm text-slate-600">
            Drag the nanoparticle onto the extract to finalize the product.
          </p>

          <div className="mt-6 text-xs text-slate-500">
            Final assets:
            <ul className="list-disc list-inside mt-2">
              <li>/images/nanoparticle_icon.png — nanoparticle icon</li>
              <li>/images/beaker_topdown.png — final beaker</li>
            </ul>
          </div>
        </aside>
      ) : null}
    </motion.section>
  );
}

function DraggableNP({ id, enabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !enabled,
  });

  const safeAttributes = { ...attributes };
  if ("aria-describedby" in safeAttributes)
    delete safeAttributes["aria-describedby"];

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...safeAttributes}
      className={`w-32 h-32 ${!enabled ? "opacity-40" : "cursor-grab"}`}
      style={style}
    >
      <img
        src="/images/nanoparticle_icon.png"
        alt="np icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function FinalBeakerDrop({ id, done }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="w-56 h-56 flex items-center justify-center border rounded relative"
    >
      <img
        src="/beaker.png"
        alt="final beaker"
        className="w-40 h-40 object-contain"
      />
      {done ? (
        <div className="absolute text-emerald-700 font-semibold">
          Phyllozinc Ready
        </div>
      ) : null}
      {isOver ? (
        <div className="absolute inset-0 ring-2 ring-emerald-300 rounded" />
      ) : null}
    </div>
  );
}

/*
Asset summary (place in /public/images/):
- leaves_topdown_1.png
- beaker_topdown.png
- grinder_topdown.png
- powder_icon.png
- solvent_bottle_topdown.png
- heater_topdown.png
- filterpaper_topdown.png
- zinc_bottle_topdown.png
- nanoparticle_icon.png
*/
