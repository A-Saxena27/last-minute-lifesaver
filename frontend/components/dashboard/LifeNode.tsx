"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/taskApi";

export default function LifeNode() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    completed: 0,
    pending: 0,
    hours: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await getTasks();

        const tasks = res.data || [];

        setStats({
          total: tasks.length,
          high: tasks.filter((t: any) => t.priority === "High").length,
          completed: tasks.filter((t: any) => t.status === "completed").length,
          pending: tasks.filter((t: any) => t.status === "pending").length,
          hours: tasks.reduce(
            (a: number, b: any) => a + (b.estimated_hours || 0),
            0,
          ),
        });
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="glass-panel p-4 rounded-xl">
        <p className="text-xs text-gray-400">MISSIONS</p>
        <h2 className="text-3xl font-bold">{stats.total}</h2>
      </div>

      <div className="glass-panel p-4 rounded-xl">
        <p className="text-xs text-gray-400">HIGH PRIORITY</p>
        <h2 className="text-3xl font-bold text-red-400">{stats.high}</h2>
      </div>

      <div className="glass-panel p-4 rounded-xl">
        <p className="text-xs text-gray-400">COMPLETED</p>
        <h2 className="text-3xl font-bold text-green-400">{stats.completed}</h2>
      </div>

      <div className="glass-panel p-4 rounded-xl">
        <p className="text-xs text-gray-400">PENDING</p>
        <h2 className="text-3xl font-bold">{stats.pending}</h2>
      </div>

      <div className="glass-panel p-4 rounded-xl">
        <p className="text-xs text-gray-400">WORKLOAD</p>
        <h2 className="text-3xl font-bold">{stats.hours}h</h2>
      </div>
    </div>
  );
}
