"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";
import QuizGame from "@/components/QuizGame";
import { getPhase, getLesson } from "@/data/phases";

function LicaoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading, logout, saveProgress, isLessonCompleted } = useAuth();

  const phaseId = Number(searchParams.get("fase")) || 1;
  const lessonId = Number(searchParams.get("licao")) || 0;

  const phase = getPhase(phaseId);
  const lesson = lessonId ? getLesson(phaseId, lessonId) : null;

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user || !phase) {
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

  const handleQuizComplete = async (score: number) => {
    if (lesson) {
      await saveProgress(phaseId, lesson.id, score);
      setQuizDone(true);
    }
  };

  // Lesson list view
  if (!lesson) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="max-w-lg mx-auto px-4 py-8">
          <Link
            href="/mapa"
            className="text-emerald-500 font-medium text-sm hover:underline mb-4 block"
          >
            &larr; Voltar ao mapa
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-800">
              {phase.title}
            </h1>
            <p className="text-gray-500 text-sm">{phase.description}</p>
          </div>

          <div className="space-y-3">
            {phase.lessons.map((l) => {
              const completed = isLessonCompleted(phaseId, l.id);
              return (
                <Link
                  key={l.id}
                  href={`/licao?fase=${phaseId}&licao=${l.id}`}
                  className={`block p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    completed
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800">{l.title}</p>
                      <p className="text-sm text-gray-500">
                        {l.questions.length} perguntas
                      </p>
                    </div>
                    <span className="text-2xl">
                      {completed ? "\u2705" : "\u25B6\uFE0F"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Single lesson view
  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link
          href={`/licao?fase=${phaseId}`}
          className="text-emerald-500 font-medium text-sm hover:underline mb-4 block"
        >
          &larr; Voltar as licoes
        </Link>

        {!showQuiz && !quizDone && (
          <>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-4">
              {lesson.title}
            </h1>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                {lesson.content}
              </p>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm font-bold text-emerald-700 mb-1">
                  Exemplo:
                </p>
                <p className="text-sm text-emerald-600">{lesson.example}</p>
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(true)}
              className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
            >
              Iniciar Quiz
            </button>
          </>
        )}

        {showQuiz && !quizDone && (
          <QuizGame
            questions={lesson.questions}
            onComplete={handleQuizComplete}
          />
        )}

        {quizDone && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">{"\uD83C\uDF89"}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Licao concluida!
            </h2>
            <p className="text-gray-500 mb-6">
              Continue sua trilha para aprender mais
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href={`/licao?fase=${phaseId}`}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all"
              >
                Mais licoes
              </Link>
              <Link
                href="/mapa"
                className="border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold hover:border-emerald-300 transition-all"
              >
                Ver mapa
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function LicaoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LicaoContent />
    </Suspense>
  );
}
