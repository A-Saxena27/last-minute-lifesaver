"use client";

import { useEffect, useState } from "react";
import { getBattlePlan } from "@/lib/aiApi";

export default function BattlePlan() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    async function loadPlan() {
      try {
        const result = await getBattlePlan();
        if (!result.success) {
          setPlans([
            {
              task: "AI unavailable",
              start: "--",
              end: "--",
              reason: result.error,
            },
          ]);
          return;
        }

        useEffect(() => {
          loadPlan();

          const refresh = () => loadPlan();

          window.addEventListener("mission-created", refresh);

          return () => window.removeEventListener("mission-created", refresh);
        }, []);

        console.log("RESULT:", result);
        console.log("TYPE:", typeof result);

        let raw = "";

        if (typeof result?.data === "string") {
          raw = result.data;
        } else if (typeof result?.data?.response === "string") {
          raw = result.data.response;
        } else if (typeof result?.data?.response?.response === "string") {
          raw = result.data.response.response;
        } else if (typeof result?.result === "string") {
          raw = result.result;
        } else if (typeof result?.result?.response === "string") {
          raw = result.result.response;
        }

        console.log("RAW:", raw);

        const cleaned = raw
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        if (!cleaned) {
          throw new Error("Empty AI response");
        }

        const parsed = JSON.parse(cleaned);

        console.log("PARSED:", parsed);

        setPlans(parsed.battle_plan || []);
      } catch (err) {
        console.error("Battle Plan Error:", err);
      }
    }

    loadPlan();
  }, []);

  return (
    <div className="glass-panel p-6 rounded-xl">
      <h3 className="font-label-mono uppercase text-primary mb-6">
        Battle Plan
      </h3>
      <div className="space-y-6">
        {plans.map((plan, index) => (
          <div key={index} className="border border-white/10 rounded-lg p-4">
            <h4 className="font-bold mb-2">{plan.task}</h4>

            <p className="text-sm text-gray-300">Start: {plan.start}</p>

            <p className="text-sm text-gray-300">End: {plan.end}</p>

            <p className="text-xs text-primary mt-2">{plan.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
