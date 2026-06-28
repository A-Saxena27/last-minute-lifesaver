"use client";

import { useState } from "react";
import AddMissionModal from "@/components/dashboard/AddMissionModal";

const menu = [
  {
    title: "Mission Control",
    active: true,
  },
  {
    title: "Briefing",
  },
  {
    title: "Future Simulator",
  },
  {
    title: "Battle Plan",
  },
];

export default function Sidebar() {
  const [showEmergency, setShowEmergency] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleEmergency() {
    alert(
      "🚨 EMERGENCY OVERRIDE ACTIVATED\n\n ITS FOCUS TIME. IF YOU WANT TO SURVIVE, FINISH THE TASK NOW!",
    );

    setShowEmergency(false);

    // later:
    // await replanTasks()
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-[60] flex h-screen w-64 flex-col border-r border-primary/10 bg-surface/30 backdrop-blur-xl py-margin-safe">
        {/* Header */}
        <div className="mb-10 px-6">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tighter drop-shadow-[0_0_8px_rgba(173,198,255,0.4)]">
            LIFELINE AI CORE
          </h1>

          <p className="font-label-mono uppercase tracking-widest text-primary/60">
            SYSTEM ACTIVE
          </p>
        </div>

        {/* Add Task */}
        <div className="px-4 mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-redd-100 py-3 font-bold"
          >
            ADD MISSION
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 space-y-2">
          {menu.map((item) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 py-3 px-4 font-label-mono uppercase tracking-widest transition-all duration-300 ${
                item.active
                  ? "bg-primary/5 text-primary border-l-2 border-primary"
                  : "text-on-surface-variant/60 hover:text-on-surface hover:pl-6"
              }`}
            >
              <span className="material-symbols-outlined"></span>

              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Bottom */}
        <div className="space-y-6 px-4 py-8">
          {/* Emergency */}
          <button
            onClick={() => setShowEmergency(true)}
            className="w-full border border-red-500/30 py-4 font-label-mono text-[10px] tracking-widest text-red-400 transition-all duration-150 hover:bg-red-500/10 active:scale-95"
          >
            EMERGENCY OVERRIDE
          </button>

          {/* Settings */}
          <div className="space-y-2">
            <button className="flex items-center gap-3 px-4 font-label-mono uppercase text-on-surface-variant/60 hover:text-on-surface">
              <span className="material-symbols-outlined text-sm">
                settings
              </span>

              <span>Settings</span>
            </button>

            <button className="flex items-center gap-3 px-4 font-label-mono uppercase text-on-surface-variant/60 hover:text-on-surface">
              <span className="material-symbols-outlined text-sm">
                help_center
              </span>

              <span>Support</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-[420px] rounded-2xl p-8">
            <h2 className="text-red-400 text-2xl font-bold mb-4">
              Emergency Override
            </h2>

            <p className="text-on-surface-variant mb-8">
              IRIS will abandon the current strategy and generate a complete
              recovery protocol for all active missions.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowEmergency(false)}
                className="flex-1 border border-white/10 rounded-xl py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleEmergency}
                className="flex-1 rounded-xl py-3 bg-red-500 text-white font-bold"
              >
                INITIATE
              </button>
            </div>
          </div>
        </div>
      )}

      <AddMissionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => {
          window.dispatchEvent(new Event("mission-created"));
        }}
      />
    </>
  );
}
