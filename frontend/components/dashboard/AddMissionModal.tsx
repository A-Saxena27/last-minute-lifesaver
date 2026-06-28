// components/tasks/AddMissionModal.tsx

"use client";

import { useState } from "react";
import { createTask } from "@/lib/taskApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddMissionModal({ open, onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    estimated_hours: 1,
    deadline: "",
    status: "pending",
  });

  if (!open) return null;

  async function submit() {
    try {
      setLoading(true);

      await createTask(task);

      onCreated();
      onClose();

      setTask({
        title: "",
        description: "",
        priority: "Medium",
        estimated_hours: 1,
        deadline: "",
        status: "pending",
      });
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="glass-panel w-[550px] p-8 rounded-2xl">
        <h2 className="text-2xl text-primary mb-8">Add Mission</h2>
        <div className="text-white bold">
          TITLE
          <div className="space-y-4">
            <input
              placeholder="Mission Title"
              value={task.title}
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
              className="w-full p-3 rounded bg-black/20 border border-white/10"
            />
          </div>
          <div className="text-white bold">
            DESCRIPTION
            <textarea
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask({
                  ...task,
                  description: e.target.value,
                })
              }
              className="w-full p-3 rounded bg-black/20 border border-white/10"
            />
          </div>
          <div className="text-white bold">
            PRIORITY
            <select
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
                  priority: e.target.value,
                })
              }
              className="w-full p-3 rounded bg-black/20 border border-white/10"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="text-white bold">
            HOURS
            <input
              type="number"
              placeholder="Estimated Hours"
              value={task.estimated_hours}
              onChange={(e) =>
                setTask({
                  ...task,
                  estimated_hours: Number(e.target.value),
                })
              }
              className="w-full p-3 rounded bg-black/20 border border-white/10"
            />
          </div>
          <div className="text-white bold">
            DEADLINE
            <input
              type="date"
              value={task.deadline}
              onChange={(e) =>
                setTask({
                  ...task,
                  deadline: e.target.value,
                })
              }
              className="w-full p-3 rounded bg-black/20 border border-white/10"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 border border-white/10 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Creating..." : "Create Mission"}
          </button>
        </div>
      </div>
    </div>
  );
}
