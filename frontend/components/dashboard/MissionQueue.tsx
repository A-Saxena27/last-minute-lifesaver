"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/taskApi";

export default function MissionQueue() {
  const [tasks, setTasks] = useState<any[]>([]);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  }

  // HOOKS MUST BE HERE
  useEffect(() => {
    loadTasks();

    const refresh = () => loadTasks();

    window.addEventListener("mission-created", refresh);

    return () => {
      window.removeEventListener("mission-created", refresh);
    };
  }, []);

  return (
    <main>
      <section>
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-label-mono uppercase tracking-widest text-on-surface-variant">
              Mission Queue
            </h3>
            <span className="text-[10px] font-label-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
              {tasks.length} ACTIVE
            </span>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 border-b border-white/5 hover:bg-white/5 transition"
              >
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-xs text-gray-400">
                    Priority: {task.priority}
                  </p>
                </div>

                <span className="text-xs uppercase text-primary">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
