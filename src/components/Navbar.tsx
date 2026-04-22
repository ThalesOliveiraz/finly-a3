"use client";

import Link from "next/link";

interface NavbarProps {
  user: {
    name: string;
    xp: number;
    level: number;
    streak: number;
    lives: number;
  } | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/mapa" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-emerald-500">
            Fin
          </span>
          <span className="text-2xl font-extrabold text-gray-800">
            Ly
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/simulador"
              className="text-gray-600 hover:text-emerald-500 font-medium transition-colors"
            >
              Simulador
            </Link>
            <div className="flex items-center gap-1 text-orange-500 font-bold">
              <span className="text-lg">&#128293;</span>
              <span>{user.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500 font-bold">
              <span className="text-lg">&#10084;&#65039;</span>
              <span>{user.lives}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <span className="text-lg">&#11088;</span>
              <span>{user.xp} XP</span>
            </div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${user.xp % 100}%` }}
              />
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">
              Nv. {user.level}
            </div>
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-gray-600 font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-600 hover:text-emerald-500 font-medium transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/registro"
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
            >
              Criar conta
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
}
