"use client";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState("00:42:15");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");

      setTime(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-gradient-to-b from-background via-background/80 to-transparent px-margin-safe">
      <div className="flex items-center gap-8">
        <span className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface">
          MISSION CONTROL
        </span>

        <nav className="hidden gap-6 md:flex">
          <span className="border-b border-primary pb-1 font-label-mono text-label-mono text-primary">
            THREAT LEVEL: ALPHA
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded border border-primary/20 bg-primary/10 px-4 py-2">
          <span className="material-symbols-outlined text-sm text-primary">
            schedule
          </span>

          <span className="font-data-point text-data-point text-primary">
            {time}
          </span>
        </div>

        <div className="flex items-center gap-4 text-on-surface-variant">
          <button className="material-symbols-outlined transition-colors hover:text-primary">
            notifications_active
          </button>

          <button className="material-symbols-outlined transition-colors hover:text-primary">
            sensors
          </button>
        </div>

        <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/30 p-0.5">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpkywrQUX2G-IAXbM_aQVbpaepEI3vZ87KEXp48CiMVuBp0Tinx6yFgZRA1ncR9OQ6rO8ZQ7p-m9qNfnWukSzEAxQeCihi2lgvypluS9D0wphoHRQW4Ks99nJL7mBqHgOHGqH6F3i-inDJrXHLGkIqWer2IQO5MFLVrUhWuP7ttuu2XVlho0T4N1t4Yj0DjqE28TAhbNm7JZ_WtLFwuJse5_F71Eexvd9YdXbDT9RkLj9EmACfWZHWJeLeeyJWd2i9eLFpI_ODIHQ"
            alt="IRIS"
          />
        </div>
      </div>
    </header>
  );
}
