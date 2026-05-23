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
			onComplete(
				score + (selected === question.answer && !showResult ? 1 : 0),
			);
		}
	};

	if (finished) {
		const percentage = Math.round((score / questions.length) * 100);
		return (
			<div className="text-center py-12">
				<div className="text-6xl mb-4">
					{percentage >= 70 ? "\uD83C\uDF89" : "\uD83D\uDCAA"}
				</div>
				<h2 className="text-2xl font-bold text-foreground mb-2">
					{percentage >= 70 ? "Parabens!" : "Continue praticando!"}
				</h2>
				<p className="text-muted-foreground mb-4">
					Voce acertou {score} de {questions.length} perguntas (
					{percentage}%)
				</p>
				<div className="w-full max-w-xs mx-auto bg-muted rounded-full h-4 mb-6">
					<div
						className={`h-4 rounded-full transition-all duration-1000 ${
							percentage >= 70
								? "bg-primary"
								: "bg-warning"
						}`}
						style={{ width: `${percentage}%` }}
					/>
				</div>
				<p className="text-warning font-bold text-lg">
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
								? "bg-primary"
								: i === currentIndex
									? "bg-primary/30"
									: "bg-muted"
						}`}
					/>
				))}
			</div>

			{/* Question */}
			<div className="mb-8">
				<p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
					Pergunta {currentIndex + 1} de {questions.length}
				</p>
				<h3 className="text-xl font-bold text-foreground leading-relaxed">
					{question.question}
				</h3>
			</div>

			{/* Options */}
			<div className="space-y-3 mb-8">
				{question.options?.map((option) => {
					let optionStyle =
						"border-2 border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/10";

					if (selected === option && !showResult) {
						optionStyle =
							"border-2 border-primary bg-primary/10 text-primary ring-2 ring-primary/20";
					}

					if (showResult) {
						if (option === question.answer) {
							optionStyle =
								"border-2 border-primary bg-primary/10 text-primary";
						} else if (option === selected && !isCorrect) {
							optionStyle =
								"border-2 border-destructive bg-destructive/10 text-destructive";
						} else {
							optionStyle =
								"border-2 border-border bg-muted/10 text-muted-foreground";
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
							? "bg-primary/10 border border-primary/20"
							: "bg-destructive/10 border border-destructive/20"
					}`}
				>
					<p
						className={`font-bold mb-1 ${
							isCorrect ? "text-primary" : "text-destructive"
						}`}
					>
						{isCorrect ? "Correto!" : "Incorreto!"}
					</p>
					<p
						className={`text-sm ${
							isCorrect ? "text-primary" : "text-destructive"
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
							? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
							: "bg-muted text-muted-foreground cursor-not-allowed"
					}`}
				>
					Verificar
				</button>
			) : (
				<button
					onClick={handleNext}
					className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
				>
					{currentIndex < questions.length - 1
						? "Proximo"
						: "Finalizar"}
				</button>
			)}
		</div>
	);
}
