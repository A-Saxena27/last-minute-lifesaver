"use client";

import MainMission from "@/components/layout/MainMission";

import React from "react";

export default function MissionCard() {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 z-20">
        <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="font-mono text-[10px] uppercase font-bold">
            Critical Risk
          </span>
        </div>
      </div>

      <div className="h-48 relative overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuADRxmUM38aYigq4nV6Od6ACJ3YTxrzSReQ2CQneiSh84xcEJqb2Q6b_DI3SfZDgVvjzi1WPVl1q8rfT0U751uo9uUx9k1TFGkgjMGt9n5CcHzAD8eV_WMB9klDY9Jt_j-Lvzr4frTuSFTT0dZPR1Bp4JUrhbAKaJbBmHB5w5TwXx4wbEjAgUN7BtaKZ19my1Z5c_pOXpVHVYmaEAwoDVvf3fu3_tA33PhNzGYQYwiujwVuY4FjwPkRS885hLRmrn__Rehhw2vpP84"
          alt="Mission"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      <MainMission />

      <button className="w-full py-5 bg-blue-500 text-white font-bold tracking-widest uppercase rounded-xl hover:bg-blue-400 transition-all active:scale-95 flex items-center justify-center gap-3">
        <span className="material-symbols-outlined">bolt</span>
        INITIATE RESCUE
      </button>
    </div>
  );
}
