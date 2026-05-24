"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faBars,
	faChartColumn,
	faCoins,
	faGear,
	faHeartCircleBolt,
	faStar,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
	user: {
		name: string;
		xp: number;
		level: number;
		streak: number;
		lives: number;
		coins: number;
	} | null;
	onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const userStats = (
		<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm">
			<div className="flex items-center gap-1 text-warning font-bold">
				<span className="text-lg">&#128293;</span>
				<span>{user?.streak}</span>
			</div>
			<div className="flex items-center gap-1 text-destructive font-bold">
				<FontAwesomeIcon
					icon={faHeartCircleBolt}
					style={{ color: "rgb(214, 27, 27)" }}
				/>
				<span>{user?.lives}</span>
			</div>
			<div className="flex items-center gap-1 text-warning font-bold">
				<FontAwesomeIcon
					icon={faCoins}
					style={{ color: "rgb(255, 212, 59)" }}
				/>
				<span>{user?.coins}</span>
			</div>
			<div className="flex items-center gap-1 text-warning font-bold">
				<FontAwesomeIcon
					icon={faStar}
					style={{ color: "rgb(255, 212, 59)" }}
				/>
				<span>{user?.xp} XP</span>
			</div>
			<div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
				<div
					className="h-full bg-primary rounded-full transition-all duration-500"
					style={{ width: `${user?.xp ? user.xp % 100 : 0}%` }}
				/>
			</div>
			<div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">
				Nv. {user?.level}
			</div>
		</div>
	);

	return (
		<nav className="bg-card border-b-2 border-border sticky top-0 z-50">
			<div className="max-w-4xl mx-auto px-4 py-2 sm:py-0 sm:h-16">
				<div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
					<Link
						href="/mapa"
						className="flex justify-center sm:justify-start"
					>
						<span className="text-2xl font-extrabold text-primary">
							Fin
						</span>
						<span className="text-2xl font-extrabold text-foreground">
							Ly
						</span>
					</Link>

					{user ? (
						<>
							<div className="flex flex-col items-center gap-3 sm:hidden">
								{userStats}
								<button
									onClick={() =>
										setIsMobileMenuOpen((open) => !open)
									}
									className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-foreground"
									aria-label="Abrir menu"
									aria-expanded={isMobileMenuOpen}
								>
									<FontAwesomeIcon
										icon={
											isMobileMenuOpen ? faXmark : faBars
										}
									/>
								</button>
							</div>

							<div className="hidden sm:flex items-center gap-4 text-sm">
								<Link
									href="/simulador"
									className="text-muted-foreground hover:text-primary font-medium transition-colors"
								>
									<FontAwesomeIcon icon={faChartColumn} />
									Simulador
								</Link>
								{userStats}
								<Link
									href="/configuracao"
									className="text-muted-foreground hover:text-primary font-medium transition-colors"
								>
									<FontAwesomeIcon icon={faGear} />
								</Link>
								<button
									onClick={onLogout}
									className="text-muted-foreground hover:text-foreground font-medium transition-colors"
								>
									<FontAwesomeIcon
										icon={faArrowRightFromBracket}
									/>
								</button>
							</div>

							{isMobileMenuOpen && (
								<div className="flex flex-col items-center gap-3 pb-2 sm:hidden">
									<Link
										href="/simulador"
										className="text-muted-foreground hover:text-primary font-medium transition-colors"
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										<FontAwesomeIcon icon={faChartColumn} />
										Simulador
									</Link>
									<Link
										href="/configuracao"
										className="text-muted-foreground hover:text-primary font-medium transition-colors"
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										<FontAwesomeIcon icon={faGear} />
										Configuração
									</Link>
									<button
										onClick={() => {
											setIsMobileMenuOpen(false);
											onLogout();
										}}
										className="text-muted-foreground hover:text-foreground font-medium transition-colors"
									>
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
										/>
										Sair
									</button>
								</div>
							)}
						</>
					) : (
						<div className="flex items-center gap-3">
							<Link
								href="/login"
								className="text-muted-foreground hover:text-primary font-medium transition-colors"
							>
								Entrar
							</Link>
							<Link
								href="/registro"
								className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors"
							>
								Criar conta
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
