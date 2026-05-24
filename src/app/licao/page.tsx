"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";
import QuizGame from "@/components/QuizGame";
import OutOfLives from "@/components/OutOfLives";
import { getPhase, getLesson } from "@/data/phases";
import confetti from "canvas-confetti";

function LicaoContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const {
		user,
		loading,
		logout,
		saveProgress,
		isLessonCompleted,
		fetchUser,
		loseLife,
		buyLife,
	} = useAuth();

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
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	const launchConfetti = () => {
		const duration = 3000;
		const animationEnd = Date.now() + duration;
		const defaults = {
			startVelocity: 30,
			spread: 360,
			ticks: 60,
			zIndex: 0,
		};

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval = window.setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	};

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const handleQuizComplete = async (score: number) => {
		if (!lesson) {
			return;
		}

		await saveProgress(phaseId, lesson.id, score);

		const successThreshold = Math.ceil(lesson.questions.length * 0.7);
		if (score >= successThreshold) {
			launchConfetti();
		}

		setQuizDone(true);
	};

	// Lesson list view
	if (!lesson) {
		return (
			<div className="min-h-screen">
				<Navbar user={user} onLogout={handleLogout} />
				<main className="max-w-lg mx-auto px-4 py-8">
					<Link
						href="/mapa"
						className="text-primary font-medium text-sm hover:underline mb-4 block"
					>
						&larr; Voltar ao mapa
					</Link>

					<div className="mb-6">
						<h1 className="text-2xl font-extrabold text-foreground">
							{phase.title}
						</h1>
						<p className="text-muted-foreground text-sm">
							{phase.description}
						</p>
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
											? "border-primary/20 bg-primary/10"
											: "border-border bg-card hover:border-primary/50"
									}`}
								>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-bold text-foreground">
												{l.title}
											</p>
											<p className="text-sm text-muted-foreground">
												{l.questions.length} perguntas
											</p>
										</div>
										<span className="text-2xl">
											{completed
												? "\u2705"
												: "\u25B6\uFE0F"}
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

	// Single lesson view — bloqueia o quiz se o usuario estiver sem vidas
	if (user.lives <= 0 && !quizDone) {
		return (
			<div className="min-h-screen">
				<Navbar user={user} onLogout={handleLogout} />
				<main className="max-w-lg mx-auto px-4 py-8">
					<Link
						href={`/licao?fase=${phaseId}`}
						className="text-primary font-medium text-sm hover:underline mb-4 block"
					>
						&larr; Voltar as licoes
					</Link>
					<OutOfLives
						livesUpdatedAt={user.livesUpdatedAt}
						coins={user.coins}
						onRegen={fetchUser}
						onBuy={buyLife}
					/>
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
					className="text-primary font-medium text-sm hover:underline mb-4 block"
				>
					&larr; Voltar as licoes
				</Link>

				{!showQuiz && !quizDone && (
					<>
						<h1 className="text-2xl font-extrabold text-foreground mb-4">
							{lesson.title}
						</h1>

						<div className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-6">
							<p className="text-foreground leading-relaxed mb-4">
								{lesson.content}
							</p>
							<div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
								<p className="text-sm font-bold text-primary mb-1">
									Exemplo:
								</p>
								<p className="text-sm text-primary">
									{lesson.example}
								</p>
							</div>
						</div>

						<button
							onClick={() => setShowQuiz(true)}
							className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
						>
							Iniciar Quiz
						</button>
					</>
				)}

				{showQuiz && !quizDone && (
					<QuizGame
						questions={lesson.questions}
						onComplete={handleQuizComplete}
						onWrongAnswer={loseLife}
					/>
				)}

				{quizDone && (
					<div className="text-center py-8">
						<div className="text-6xl mb-4">{"\uD83C\uDF89"}</div>
						<h2 className="text-2xl font-bold text-foreground mb-2">
							Licao concluida!
						</h2>
						<p className="text-muted-foreground mb-6">
							Continue sua trilha para aprender mais
						</p>
						<div className="flex gap-3 justify-center">
							<Link
								href={`/licao?fase=${phaseId}`}
								className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
							>
								Mais licoes
							</Link>
							<Link
								href="/mapa"
								className="border-2 border-border text-muted-foreground px-6 py-3 rounded-xl font-bold hover:border-primary/50 transition-all"
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
					<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				</div>
			}
		>
			<LicaoContent />
		</Suspense>
	);
}
