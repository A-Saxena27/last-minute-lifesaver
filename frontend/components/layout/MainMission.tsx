"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/taskApi";

export default function MainMission() {
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await getTasks();

      if (res.data?.length > 0) {
        setTask(res.data[0]);
      }
    }

    load();
  }, []);

  if (!task)
    return <div className="glass-panel p-8 rounded-xl">No active mission.</div>;

  return (
    <div className="glass-panel rounded-2xl p-8">
      <h1 className="text-4xl font-bold text-primary">{task.title}</h1>

      <p className="text-gray-400 mt-3">{task.description}</p>

      <div className="mt-6 flex gap-8">
        <div>
          <p className="text-xs uppercase text-gray-500">Priority</p>

          <p>{task.priority}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">Deadline</p>

          <p>{task.deadline}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">Hours</p>

          <p>{task.estimated_hours}</p>
        </div>
      </div>
    </div>
  );
}
