"use client";

import { useEffect, useState } from "react";
import { prioritizeTasks } from "@/lib/aiApi";

export default function AIInsight() {
  const [message, setMessage] = useState("Loading IRIS analysis...");

  useEffect(() => {
    async function fetchAIInsight() {
      try {
        const result = await prioritizeTasks();

        if (!result.success) {
          setMessage(result.error || "AI unavailable");
          return;
        }

        let raw = "";

        if (typeof result.data === "string") {
          raw = result.data;
        } else if (typeof result.data?.response === "string") {
          raw = result.data.response;
        }

        const cleaned = raw
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        if (!cleaned) {
          setMessage("No AI analysis available");
          return;
        }

        const parsed = JSON.parse(cleaned);

        setMessage(parsed.summary || parsed.message || "Analysis complete");
      } catch (err) {
        console.error(err);
        setMessage("IRIS offline");
      }
    }

    fetchAIInsight();
  }, []);

  return (
    <div className="glass-panel p-6 rounded-xl">
      <h3 className="font-label-mono uppercase text-primary mb-3">
        IRIS Intelligence Feedback
      </h3>

      <p className="italic text-on-surface-variant">{message}</p>
    </div>
  );
}
