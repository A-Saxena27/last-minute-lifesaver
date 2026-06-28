"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";

import AIInsight from "@/components/dashboard/AiInsight";
import MissionCard from "@/components/dashboard/MissionCard";
import MissionQueue from "@/components/dashboard/MissionQueue";
import BattlePlan from "@/components/dashboard/BattlePlan";
import LifeNode from "@/components/dashboard/LifeNode";
import SimulationCore from "@/components/simulator/SimulationCore";
import ReplanButton from "@/components/dashboard/Replan";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Sidebar />

      <div className="ml-64 flex flex-col min-h-screen">
        <Topbar />

        <main className="flex-1 p-8 space-y-8">
          {/* AI alert */}
          <AIInsight />

          {/* main mission */}
          <MissionCard />

          {/* task analytics */}
          <LifeNode />

          {/* mission queue */}
          <MissionQueue />

          {/* future simulator */}
          <SimulationCore />

          {/* battle plan */}
          <BattlePlan />

          {/* replan */}
          <ReplanButton />
        </main>

        <Footer />
      </div>
    </div>
  );
}
