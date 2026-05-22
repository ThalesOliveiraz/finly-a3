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
		<nav className="bg-card border-b-2 border-border sticky top-0 z-50">
			<div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/mapa" className="flex items-center gap-2">
					<p className="text-2xl font-extrabold text-primary">Fin</p>
					<span className="text-2xl font-extrabold text-foreground">
						Ly
					</span>
				</Link>

				{user ? (
					<div className="flex items-center gap-4 text-sm">
						<Link
							href="/simulador"
							className="text-muted-foreground hover:text-primary font-medium transition-colors"
						>
							Simulador
						</Link>
						<div className="flex items-center gap-1 text-warning font-bold">
							<span className="text-lg">&#128293;</span>
							<span>{user.streak}</span>
						</div>
						<div className="flex items-center gap-1 text-destructive font-bold">
							<span className="text-lg">&#10084;&#65039;</span>
							<span>{user.lives}</span>
						</div>
						<div className="flex items-center gap-1 text-warning font-bold">
							<span className="text-lg">&#11088;</span>
							<span>{user.xp} XP</span>
						</div>
						<div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
							<div
								className="h-full bg-primary rounded-full transition-all duration-500"
								style={{ width: `${user.xp % 100}%` }}
							/>
						</div>
						<div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">
							Nv. {user.level}
						</div>
						<Link
							href="/configuracao"
							className="text-muted-foreground hover:text-primary font-medium transition-colors"
						>
							Configuração
						</Link>
						<button
							onClick={onLogout}
							className="text-muted-foreground hover:text-foreground font-medium transition-colors"
						>
							Sair
						</button>
					</div>
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
		</nav>
	);
}
