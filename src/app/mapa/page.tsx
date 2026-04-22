"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";
import PhaseNode from "@/components/PhaseNode";
import { phases } from "@/data/phases";

export default function MapaPage() {
  const { user, loading, logout, isPhaseCompleted, isPhaseUnlocked, progress } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Sua Trilha Financeira
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Complete as fases para dominar o mundo dos investimentos
          </p>
        </div>

        {/* Phase map - vertical trail */}
        <div className="flex flex-col items-center">
          {phases.map((phase, index) => {
            const unlocked = isPhaseUnlocked(phase.id);
            const completed = isPhaseCompleted(phase.id, phase.lessons.length);
            const completedLessons = progress.filter(
              (p) => p.phaseId === phase.id && p.completed
            ).length;

            let status: "completed" | "current" | "locked" = "locked";
            if (completed) status = "completed";
            else if (unlocked) status = "current";

            return (
              <div key={phase.id} className="flex flex-col items-center">
                {index > 0 && (
                  <div
                    className={`w-1 h-8 ${
                      unlocked ? "bg-emerald-300" : "bg-gray-200"
                    }`}
                  />
                )}
                <PhaseNode
                  phase={phase}
                  status={status}
                  completedLessons={completedLessons}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
