/*
Phyllozinc Virtual Lab — Top-down 2D multi-scene interactive (Next.js + dnd-kit + Framer Motion)

Placement
- Put this file in your Next.js project route, for example:
  /app/phyllozinc/page.jsx  (App router) or /pages/phyllozinc.jsx (Pages router)

Dependencies
- npm install @dnd-kit/core framer-motion zustand
- Tailwind CSS recommended for styling (used in classes throughout)

What this file contains
- SceneManager: controller for scenes/levels
- SceneCollectLeaves: scene 1 (drag 3 leaves into beaker)
- SceneGrind: scene 2 (drag beaker to grinder + action)
- SceneMixSolvent: scene 3 (drag solvent bottle)
- SceneHotMaceration: scene 4 (drag to heater)
- SceneFilter: scene 5 (drag to filter paper)
- SceneMakeZinc: scene 6 (prepare zinc NP)
- SceneFinalMix: scene 7 (combine zinc NP with extract -> finish)

Notes
- All images referenced under /public/images/*.png — replace them with your assets. See "Assets to replace" section below for alt captions.
- The implementation focuses on easy-to-extend, game-like top-down interactions. Each scene is fullscreen and self-contained.
- Audio is omitted but hooks are present where you can add short sound effects.

*/

import React, { useState, useEffect, useMemo } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

const SCENES = [
  "Collect Leaves",
  "Grind Leaves",
  "Mix Solvent",
  "Hot Maceration",
  "Filter Extract",
  "Make Zinc NP",
  "Final Mix",
];

export default function VirtualLabSimulation() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white flex flex-col">
      <header className="p-4 flex items-center justify-between bg-white/60 backdrop-blur border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            Phyllozinc — Virtual Top-down Lab
          </h1>
          <div className="text-sm text-slate-600">
            Scene: {SCENES[sceneIndex]}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="px-3 py-1 rounded bg-slate-50 border"
          >
            Prev
          </button>
          <div className="px-3 py-1 rounded bg-white border">
            {sceneIndex + 1}/{SCENES.length}
          </div>
          <button
            onClick={goNext}
            className="px-3 py-1 rounded bg-emerald-50 border text-emerald-700"
          >
            Next
          </button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        <SceneManager
          sceneIndex={sceneIndex}
          setSceneIndex={setSceneIndex}
          setGlobalState={(s) => setGlobalState((prev) => ({ ...prev, ...s }))}
          globalState={globalState}
        />
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
  // route to the correct scene
  const commonProps = { setSceneIndex, setGlobalState, globalState };
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

// ---------------- Scene 1: Collect Leaves (drag 3 leaves into beaker) ----------------
function SceneCollectLeaves({ setSceneIndex, setGlobalState }) {
  const [leaves, setLeaves] = useState(() => [
    "leaf-1",
    "leaf-2",
    "leaf-3",
    "leaf-4",
  ]);
  const [collected, setCollected] = useState([]); // ids collected
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "beaker-drop" && active.id.startsWith("leaf-")) {
      // add to collected (if not already)
      setCollected((prev) => {
        if (prev.includes(active.id)) return prev;
        return [...prev, active.id];
      });
    }
  }

  useEffect(() => {
    if (collected.length >= 3) {
      // success animation then advance
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
          Collect 3 leaves into the beaker
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
          <div className="absolute left-12 top-24 grid grid-cols-2 gap-4">
            {leaves.map((id, idx) => (
              <DraggableLeaf
                key={id}
                id={id}
                collected={collected.includes(id)}
                style={{ transform: `rotate(${(idx % 4) * 8 - 8}deg)` }}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {/* right: HUD & hints */}
      <aside className="w-80 bg-white p-6 border-l">
        <h2 className="font-medium mb-2">Step 1 — Pengumpulan Daun</h2>
        <p className="text-sm text-slate-600 mb-3">
          Drag daun-daun yang berserakan ke beaker. Kamu butuh{" "}
          <strong>3 daun</strong> untuk lanjut.
        </p>

        <div className="mt-4">
          <div className="text-sm">Collected:</div>
          <div className="mt-2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-md border flex items-center justify-center ${i < collected.length ? "bg-emerald-100" : "bg-slate-50"}`}
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
    </motion.section>
  );
}

function DraggableLeaf({ id, collected, style }) {
  return (
    <div
      id={id}
      draggable={!collected}
      className={`w-24 h-24 ${collected ? "opacity-40" : "cursor-grab"}`}
      style={style}
    >
      <img
        src="/images/leaves_topdown_1.png"
        alt="LEAF - top-down"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function DropZoneBeaker({ id, collectedCount }) {
  return (
    <div id={id} className="w-48 h-56 flex items-end justify-center">
      <motion.div
        animate={{ scale: collectedCount >= 3 ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={`w-36 h-40 bg-white/80 rounded-2xl border flex items-end justify-center p-2 shadow`}
      >
        <img
          src="/images/beaker_topdown.png"
          alt="BEAKER - top-down"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}

// ---------------- Scene 2: Grind Leaves (drag beaker to grinder then press start) ----------------
function SceneGrind({ setSceneIndex, setGlobalState, globalState }) {
  const sensors = useSensors(useSensor(PointerSensor));
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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/3">
            <DraggableBeaker id="beaker-top" placed={placed} />
          </div>
          <div className="absolute right-32 top-1/2 -translate-y-1/2">
            <div
              id="grinder-drop"
              className="w-56 h-56 flex items-center justify-center"
            >
              <img
                src="/images/grinder_topdown.png"
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
            </div>
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
    </motion.section>
  );
}

function DraggableBeaker({ id, placed }) {
  return (
    <div
      id={id}
      draggable={!placed}
      className={`w-32 h-36 ${placed ? "opacity-60" : "cursor-grab"}`}
    >
      <img
        src="/images/beaker_topdown.png"
        alt="beaker"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ---------------- Scene 3: Mix Solvent ----------------
function SceneMixSolvent({ setSceneIndex, setGlobalState, globalState }) {
  const sensors = useSensors(useSensor(PointerSensor));
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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableSolvent id="solvent-bottle" poured={poured} />
          </div>

          <div className="absolute right-32 top-1/2 -translate-y-1/2">
            <div
              id="beaker-drop"
              className="w-48 h-52 flex items-end justify-center"
            >
              <img
                src="/images/beaker_topdown.png"
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
            </div>
          </div>
        </DndContext>
      </div>

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
    </motion.section>
  );
}

function DraggableSolvent({ id, poured }) {
  return (
    <div
      id={id}
      draggable={!poured}
      className={`w-28 h-28 ${poured ? "opacity-40" : "cursor-grab"}`}
    >
      <img
        src="/images/solvent_bottle_topdown.png"
        alt="solvent"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ---------------- Scene 4: Hot Maceration ----------------
function SceneHotMaceration({ setSceneIndex }) {
  const [placed, setPlaced] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <div id="beaker-top" draggable className="w-36 h-40 cursor-grab">
              <img
                src="/images/beaker_topdown.png"
                alt="beaker"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <div
              id="heater-drop"
              className="w-60 h-60 flex items-center justify-center border rounded"
            >
              <img
                src="/images/heater_topdown.png"
                alt="heater"
                className="w-40 h-40 object-contain"
              />
              {placed ? (
                <div className="absolute text-amber-600">Heating...</div>
              ) : null}
            </div>
          </div>
        </DndContext>
      </div>

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
    </motion.section>
  );
}

// ---------------- Scene 5: Filter Extract ----------------
function SceneFilter({ setSceneIndex }) {
  const sensors = useSensors(useSensor(PointerSensor));
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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <div id="beaker-top" draggable className="w-36 h-40 cursor-grab">
              <img
                src="/images/beaker_topdown.png"
                alt="beaker"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <div
              id="filter-drop"
              className="w-56 h-56 flex items-center justify-center border rounded"
            >
              <img
                src="/images/filterpaper_topdown.png"
                alt="filter paper"
                className="w-40 h-40 object-contain"
              />
              {filtered ? (
                <div className="absolute text-slate-600">Filtered</div>
              ) : null}
            </div>
          </div>
        </DndContext>
      </div>

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
    </motion.section>
  );
}

// ---------------- Scene 6: Make Zinc NP ----------------
function SceneMakeZinc({ setSceneIndex, setGlobalState }) {
  const sensors = useSensors(useSensor(PointerSensor));
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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <DraggableZinc id="zinc-bottle" prepared={prepared} />
          </div>
          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <div
              id="mix-drop"
              className="w-56 h-56 flex items-center justify-center border rounded"
            >
              <div className="text-sm">Mixer</div>
              {prepared ? (
                <div className="absolute text-emerald-700">Prepared</div>
              ) : null}
            </div>
          </div>
        </DndContext>
      </div>

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
            <li>/images/nanoparticle_icon.png — nanoparticle icon (result)</li>
          </ul>
        </div>
      </aside>
    </motion.section>
  );
}

function DraggableZinc({ id, prepared }) {
  return (
    <div
      id={id}
      draggable={!prepared}
      className={`w-28 h-28 ${prepared ? "opacity-40" : "cursor-grab"}`}
    >
      <img
        src="/images/zinc_bottle_topdown.png"
        alt="zinc bottle"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ---------------- Scene 7: Final Mix ----------------
function SceneFinalMix({ globalState }) {
  // final mixing area — user drags the prepared zinc nanoparticle icon onto the extract (beaker)
  const sensors = useSensors(useSensor(PointerSensor));
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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="absolute left-24 top-1/2 -translate-y-1/2">
            <div
              id="np-icon"
              draggable
              className={`w-32 h-32 cursor-grab ${globalState.zincPrepared ? "" : "opacity-40"}`}
            >
              <img
                src="/images/nanoparticle_icon.png"
                alt="np icon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute right-28 top-1/2 -translate-y-1/2">
            <div
              id="final-beaker"
              className="w-56 h-56 flex items-center justify-center border rounded"
            >
              <img
                src="/images/beaker_topdown.png"
                alt="final beaker"
                className="w-40 h-40 object-contain"
              />
              {done ? (
                <div className="absolute text-emerald-700 font-semibold">
                  Phyllozinc Ready
                </div>
              ) : null}
            </div>
          </div>
        </DndContext>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-1/2 top-24 -translate-x-1/2 bg-white p-6 rounded shadow"
            >
              <div className="text-lg font-semibold">
                Produk Selesai — Phyllozinc
              </div>
              <div className="text-sm text-slate-600 mt-2">
                Selamat! Anda telah menyelesaikan proses simulasi.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
    </motion.section>
  );
}

// ---------------- End of file ----------------

/*
Asset summary (place in /public/images/):
- leaves_topdown_1.png   — leaf image (small, top-down)
- beaker_topdown.png     — beaker (top-down)
- grinder_topdown.png    — grinder unit (top-down)
- powder_icon.png        — powder / ground leaves icon
- solvent_bottle_topdown.png — aquadest bottle (top-down)
- heater_topdown.png     — heater for hot maceration
- filterpaper_topdown.png — filter paper (top-down)
- zinc_bottle_topdown.png — zinc acetate reagent bottle
- nanoparticle_icon.png  — nanoparticle visual (small icon)

Replace these files with your own assets. Each scene's right panel lists the essential assets used in that scene.
*/
