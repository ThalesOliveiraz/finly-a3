"use client";

import Link from "next/link";

interface PhaseNodeProps {
  phase: {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    lessons: { id: number }[];
  };
  status: "completed" | "current" | "locked";
  completedLessons: number;
}

const icons: Record<string, string> = {
  coins: "\uD83E\uDE99",
  "piggy-bank": "\uD83D\uDC37",
  "trending-up": "\uD83D\uDCC8",
  bank: "\uD83C\uDFE6",
  chart: "\uD83D\uDCCA",
  bitcoin: "\u20BF",
};

export default function PhaseNode({
  phase,
  status,
  completedLessons,
}: PhaseNodeProps) {
  const icon = icons[phase.icon] || "\uD83D\uDCDA";
  const totalLessons = phase.lessons.length;

  const statusStyles = {
    completed: {
      bg: "bg-emerald-500",
      border: "border-emerald-600",
      shadow: "shadow-emerald-200",
      ring: "ring-emerald-300",
    },
    current: {
      bg: "bg-white",
      border: `border-2`,
      shadow: "shadow-lg",
      ring: "ring-4 ring-emerald-200",
    },
    locked: {
      bg: "bg-gray-200",
      border: "border-gray-300",
      shadow: "shadow-none",
      ring: "",
    },
  };

  const style = statusStyles[status];

  const content = (
    <div className="flex flex-col items-center gap-2 group">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl
          ${style.bg} ${style.border} ${style.shadow} ${style.ring}
          ${status === "current" ? "animate-bounce-slow cursor-pointer" : ""}
          ${status === "locked" ? "opacity-60" : ""}
          ${status === "completed" ? "text-white" : ""}
          transition-all duration-300`}
        style={
          status === "current"
            ? { borderColor: phase.color, boxShadow: `0 0 20px ${phase.color}40` }
            : {}
        }
      >
        {status === "locked" ? (
          "\uD83D\uDD12"
        ) : (
          <span className="font-extrabold text-2xl" style={status === "current" ? { color: phase.color } : {}}>
            {phase.id}
          </span>
        )}
      </div>
      <div className="text-center">
        <p
          className={`font-bold text-sm ${
            status === "locked" ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {phase.title}
        </p>
        {status !== "locked" && (
          <p className="text-xs text-gray-500">
            {completedLessons}/{totalLessons} licoes
          </p>
        )}
      </div>
    </div>
  );

  if (status === "locked") {
    return <div className="py-4">{content}</div>;
  }

  return (
    <Link
      href={`/licao?fase=${phase.id}`}
      className="py-4 block hover:scale-105 transition-transform"
    >
      {content}
    </Link>
  );
}
