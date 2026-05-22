"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";
import SimulatorChart from "@/components/SimulatorChart";

export default function SimuladorPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/mapa"
          className="text-primary font-medium text-sm hover:underline mb-4 block"
        >
          &larr; Voltar ao mapa
        </Link>
        <SimulatorChart />
      </main>
    </div>
  );
}
