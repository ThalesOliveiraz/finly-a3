"use client";

import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  lives: number;
}

interface Progress {
  id: string;
  phaseId: number;
  lessonId: number;
  completed: boolean;
  score: number;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("finlingo_token") : null;

  const fetchUser = useCallback(async () => {
    const storedToken = localStorage.getItem("finlingo_token");
    if (!storedToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("finlingo_token");
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const fetchProgress = useCallback(async () => {
    const storedToken = localStorage.getItem("finlingo_token");
    if (!storedToken) return;
    try {
      const res = await fetch("/api/progress", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchProgress();
  }, [fetchUser, fetchProgress]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem("finlingo_token", data.token);
    setUser(data.user);
    await fetchProgress();
    return data;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem("finlingo_token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("finlingo_token");
    setUser(null);
    setProgress([]);
  };

  const saveProgress = async (
    phaseId: number,
    lessonId: number,
    score: number
  ) => {
    const storedToken = localStorage.getItem("finlingo_token");
    if (!storedToken) return;
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ phaseId, lessonId, score }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser((prev) =>
        prev ? { ...prev, xp: data.totalXp, level: data.level } : null
      );
      await fetchProgress();
    }
    return data;
  };

  const isLessonCompleted = (phaseId: number, lessonId: number) => {
    return progress.some(
      (p) => p.phaseId === phaseId && p.lessonId === lessonId && p.completed
    );
  };

  const isPhaseCompleted = (phaseId: number, totalLessons: number) => {
    const completed = progress.filter(
      (p) => p.phaseId === phaseId && p.completed
    ).length;
    return completed >= totalLessons;
  };

  const isPhaseUnlocked = (phaseId: number) => {
    if (phaseId === 1) return true;
    // Check if previous phase is completed
    const prevPhaseProgress = progress.filter(
      (p) => p.phaseId === phaseId - 1 && p.completed
    );
    return prevPhaseProgress.length >= 2; // At least 2 lessons completed
  };

  return {
    user,
    progress,
    loading,
    token,
    login,
    register,
    logout,
    saveProgress,
    fetchProgress,
    fetchUser,
    isLessonCompleted,
    isPhaseCompleted,
    isPhaseUnlocked,
  };
}
