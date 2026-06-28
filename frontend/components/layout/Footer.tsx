"use client";

export default function Footer() {
  return (
    <footer className="h-16 px-margin-safe flex items-center justify-between border-t border-primary/5 bg-surface-container-low/50 backdrop-blur-md">
      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
            Sim Fidelity: High
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">
            Quantum Accuracy: 98.2%
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <span className="font-label-mono text-[10px] text-primary animate-pulse">
          SCANNING TEMPORAL VECTORS...
        </span>
      </div>
    </footer>
  );
}
