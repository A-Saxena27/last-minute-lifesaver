"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signInGoogle() {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      router.push("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,198,255,0.12),transparent_70%)]" />

      {/* grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="glass-panel w-[480px] p-12 rounded-3xl relative overflow-hidden">
        {/* scanning line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary animate-pulse" />

        {/* logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-2 border border-primary/20 rounded-full animate-spin duration-[10000ms]" />

            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">
                psychology
              </span>
            </div>
          </div>

          <h1 className="font-display-lg text-4xl text-primary text-center">
            LIFELINE AI CORE
          </h1>

          <p className="font-label-mono uppercase tracking-[0.4em] text-primary/60 mt-2">
            Identity Verification
          </p>
        </div>

        {/* text */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Initialize Neural Profile
          </h2>

          <p className="text-on-surface-variant">
            Authenticate with Google to activate your personalized mission
            intelligence system.
          </p>
        </div>

        {/* google button */}
        <button
          onClick={signInGoogle}
          disabled={loading}
          className="
            w-full
            h-14
            rounded-xl
            border
            border-primary/20
            bg-primary/10
            hover:bg-primary
            hover:text-black
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-4
            font-bold
            tracking-widest
            uppercase
            group
          "
        >
          <svg width="22" height="22" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20H42V19H24v10h14.1C36 33.9 30.5 38 24 38c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.9 1.4 9.4 3.6l7.1-7.1C36.1 2.5 30.4 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24c0-1.3-.1-2.7-.4-4z"
            />
          </svg>

          {loading ? "AUTHENTICATING..." : "SIGN IN WITH GOOGLE"}
        </button>

        {/* footer */}
        <div className="mt-10 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-mono text-[10px] uppercase text-primary/60">
              Secure Channel
            </span>
          </div>

          <span className="font-label-mono text-[10px] uppercase text-primary/60">
            Firebase Auth
          </span>
        </div>
      </div>
    </main>
  );
}
