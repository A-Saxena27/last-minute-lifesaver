"use client";

import { useEffect, useState } from "react";
import { getReplan } from "@/lib/aiApi";

export default function Replan() {
  const [plans, setPlans] = useState<any[]>([]);
  const [motivation, setMotivation] = useState("");
  const load = async () => {
    try {
      const result = await getReplan();

      const raw = result?.data?.response || result?.result?.response || "";

      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      if (!cleaned) return;

      const parsed = JSON.parse(cleaned);

      setPlans(parsed.replan || []);
      setMotivation(parsed.motivation || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();

    const refresh = () => load();

    window.addEventListener("mission-created", refresh);

    return () => window.removeEventListener("mission-created", refresh);
  }, []);

  return (
    <div className="glass-panel p-6 rounded-xl">
      <h3 className="text-primary mb-6">Recovery Protocol</h3>

      {plans.map((plan, i) => (
        <div key={i} className="border border-white/10 rounded p-4 mb-4">
          <h4>{plan.task}</h4>
          <p>{plan.new_deadline}</p>
          <p>{plan.strategy}</p>
        </div>
      ))}

      <p className="italic mt-4">{motivation}</p>
    </div>
  );
}
