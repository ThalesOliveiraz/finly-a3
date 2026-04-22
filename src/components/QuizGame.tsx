"use client";

import { useState } from "react";

interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

interface QuizGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function QuizGame({ questions, onComplete }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = selected === question?.answer;

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
  };

  const handleCheck = () => {
    if (!selected) return;
    setShowResult(true);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (isCorrect ? 0 : 0); // score already updated
      setFinished(true);
      onComplete(score + (selected === question.answer && !showResult ? 1 : 0));
    }
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">
          {percentage >= 70 ? "\uD83C\uDF89" : "\uD83D\uDCAA"}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {percentage >= 70 ? "Parabens!" : "Continue praticando!"}
        </h2>
        <p className="text-gray-600 mb-4">
          Voce acertou {score} de {questions.length} perguntas ({percentage}%)
        </p>
        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-4 mb-6">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              percentage >= 70 ? "bg-emerald-500" : "bg-orange-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-yellow-500 font-bold text-lg">
          +{score * 10} XP ganhos!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i < currentIndex
                ? "bg-emerald-500"
                : i === currentIndex
                ? "bg-emerald-300"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          Pergunta {currentIndex + 1} de {questions.length}
        </p>
        <h3 className="text-xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options?.map((option) => {
          let optionStyle =
            "border-2 border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50";

          if (selected === option && !showResult) {
            optionStyle =
              "border-2 border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200";
          }

          if (showResult) {
            if (option === question.answer) {
              optionStyle =
                "border-2 border-emerald-500 bg-emerald-50 text-emerald-700";
            } else if (option === selected && !isCorrect) {
              optionStyle =
                "border-2 border-red-500 bg-red-50 text-red-700";
            } else {
              optionStyle =
                "border-2 border-gray-100 bg-gray-50 text-gray-400";
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl font-medium transition-all ${optionStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div
          className={`p-4 rounded-xl mb-6 ${
            isCorrect
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-bold mb-1 ${
              isCorrect ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {isCorrect ? "Correto!" : "Incorreto!"}
          </p>
          <p
            className={`text-sm ${
              isCorrect ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {question.explanation}
          </p>
        </div>
      )}

      {/* Action button */}
      {!showResult ? (
        <button
          onClick={handleCheck}
          disabled={!selected}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            selected
              ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Verificar
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all"
        >
          {currentIndex < questions.length - 1 ? "Proximo" : "Finalizar"}
        </button>
      )}
    </div>
  );
}
