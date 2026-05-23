"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function Home() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (user) {
		return <meta httpEquiv="refresh" content="0;url=/mapa" />;
	}

	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero */}
			<div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
				<div className="mb-8">
					<h1 className="text-5xl md:text-7xl font-extrabold mb-2">
						<span className="text-primary">Fin</span>
						<span className="text-foreground">Ly</span>
					</h1>
					<p className="text-xl text-muted-foreground font-medium">
						Aprenda a investir de forma divertida
					</p>
				</div>

				<div className="grid grid-cols-3 gap-6 mb-12 max-w-md">
					<div className="flex flex-col items-center gap-2">
						<span className="text-4xl">{"\uD83C\uDFAE"}</span>
						<span className="text-sm text-muted-foreground font-medium">
							Gamificado
						</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<span className="text-4xl">{"\uD83D\uDCDA"}</span>
						<span className="text-sm text-muted-foreground font-medium">
							Licoes curtas
						</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<span className="text-4xl">{"\uD83D\uDCC8"}</span>
						<span className="text-sm text-muted-foreground font-medium">
							Simulador
						</span>
					</div>
				</div>

				<div className="flex flex-col gap-3 w-full max-w-xs">
					<Link
						href="/registro"
						className="bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-center"
					>
						Comecar agora
					</Link>
					<Link
						href="/login"
						className="border-2 border-border text-muted-foreground py-4 rounded-2xl font-bold text-lg hover:border-primary/50 hover:text-primary transition-all text-center"
					>
						Ja tenho conta
					</Link>
				</div>
			</div>

			{/* Features */}
			<div className="bg-card border-t border-border py-16 px-4">
				<div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="text-3xl mb-3">{"\uD83E\uDE99"}</div>
						<h3 className="font-bold text-foreground mb-1">
							Aprenda sobre dinheiro
						</h3>
						<p className="text-sm text-muted-foreground">
							Do basico ao avancado, com linguagem simples
						</p>
					</div>
					<div className="text-center">
						<div className="text-3xl mb-3">{"\u2753"}</div>
						<h3 className="font-bold text-foreground mb-1">
							Quiz interativo
						</h3>
						<p className="text-sm text-muted-foreground">
							Teste seus conhecimentos e ganhe XP
						</p>
					</div>
					<div className="text-center">
						<div className="text-3xl mb-3">{"\uD83C\uDFC6"}</div>
						<h3 className="font-bold text-foreground mb-1">
							Conquistas e badges
						</h3>
						<p className="text-sm text-muted-foreground">
							Mantenha o streak e suba de nivel
						</p>
					</div>
				</div>
			</div>

			<footer className="text-center py-4 text-sm text-muted-foreground">
				FinLingo - Educacao financeira para adolescentes
			</footer>
		</div>
	);
}
