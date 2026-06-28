"use client";

import { useEffect, useState } from "react";
import ThreeScene from "../animations/ThreeScene";
import { futureSelf } from "@/lib/aiApi";

export default function SimulationCore() {
  const [message, setMessage] = useState("Running future simulation...");

  async function loadSimulation() {
    try {
      const result = await futureSelf();

      const raw =
        result?.data?.response ||
        result?.result?.response ||
        result?.response ||
        "";

      if (!raw) {
        setMessage("No future simulation available.");
        return;
      }

      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      try {
        const parsed = JSON.parse(cleaned);

        setMessage(
          parsed.future_message || parsed.message || parsed.summary || cleaned,
        );
      } catch {
        setMessage(cleaned);
      }
    } catch (error) {
      console.error(error);
      setMessage("Future simulation failed.");
    }
  }

  // ✅ ONE hook only
  useEffect(() => {
    loadSimulation();

    const refresh = () => loadSimulation();

    window.addEventListener("mission-created", refresh);

    return () => {
      window.removeEventListener("mission-created", refresh);
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-8 relative gap-6">
      <div className="w-96 h-64 relative glass-panel rounded-xl overflow-hidden border border-primary/10">
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center z-10">
          <span className="font-label-mono text-[10px] tracking-[0.4em] text-primary/80 uppercase">
            Simulation Core Active
          </span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl max-w-3xl w-full">
        <h3 className="font-label-mono text-primary uppercase mb-4">
          Future Simulator
        </h3>

        <p className="text-on-surface-variant italic leading-relaxed">
          {message}
        </p>
      </div>
    </section>
  );
}
