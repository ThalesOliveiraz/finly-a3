"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProgressStarsProps {
	completedLessons: number;
	totalLessons: number;
}

export default function ProgressStars({
	completedLessons,
	totalLessons,
}: ProgressStarsProps) {
	const progressPercentage = (completedLessons / totalLessons) * 100;

	// Array de estrelas
	const stars = Array.from({ length: totalLessons }, (_, i) => i);

	return (
		<div className="flex flex-col items-center gap-3 mt-4">
			{/* Barra de Progresso */}
			<div className="w-24 h-2 bg-muted rounded-full overflow-hidden border border-border">
				<div
					className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>

			{/* Estrelas */}
			<div className="flex gap-1.5">
				{stars.map((index) => {
					const isCompleted = index < completedLessons;

					return (
						<div
							key={index}
							className={`text-lg transition-colors duration-300 ${
								isCompleted
									? "text-warning"
									: "text-muted-foreground"
							}`}
						>
							{isCompleted ? (
								<FontAwesomeIcon
									icon={faStar}
									style={{ color: "rgb(255, 212, 59)" }}
								/>
							) : (
								"☆"
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
