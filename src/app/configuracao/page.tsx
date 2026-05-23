"use client";

import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, Sun, Moon, Eye, Check } from "lucide-react";
import { Card } from "../../components/Card";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function ConfigPage() {
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const { user, loading, logout } = useAuth();

	const themeOptions = [
		{
			id: "light",
			name: "Modo Claro",
			description: "Tema padrão com fundo claro",
			icon: Sun,
			preview: "bg-gradient-to-br from-emerald-50 to-teal-50",
			borderColor: "border-emerald-500",
		},
		{
			id: "dark",
			name: "Modo Escuro",
			description: "Reduz o brilho da tela para ambientes com pouca luz",
			icon: Moon,
			preview: "bg-gradient-to-br from-slate-800 to-slate-900",
			borderColor: "border-blue-500",
		},
		{
			id: "high-contrast",
			name: "Alto Contraste",
			description: "Melhora a legibilidade com cores mais fortes",
			icon: Eye,
			preview: "bg-gradient-to-br from-black to-gray-900",
			borderColor: "border-yellow-400",
		},
	];

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [loading, user, router]);

	if (loading || !user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<div className="min-h-screen">
			<Navbar user={user} onLogout={handleLogout} />
			<main className="max-w-lg mx-auto px-4 py-8">
				<Link
					href="/mapa"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors high-contrast:!text-yellow-400"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Voltar
				</Link>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="space-y-6"
				>
					<div>
						<h1 className="text-3xl font-bold mb-2 high-contrast:!text-white">
							Configurações
						</h1>
						<p className="text-muted-foreground high-contrast:!text-yellow-400">
							Personalize sua experiência no FinLy
						</p>
					</div>

					<Card className="p-6 md:p-8 rounded-3xl border-2 shadow-xl high-contrast:!border-yellow-400">
						<div className="mb-6">
							<h2 className="text-xl font-semibold mb-2 high-contrast:!text-white">
								Aparência e Acessibilidade
							</h2>
							<p className="text-sm text-muted-foreground high-contrast:!text-yellow-400">
								Escolha como você prefere visualizar o
								aplicativo
							</p>
						</div>

						<div className="space-y-4">
							{themeOptions.map((option, index) => {
								const isSelected = theme === option.id;
								const Icon = option.icon;

								return (
									<motion.button
										key={option.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.4,
											delay: index * 0.1,
										}}
										onClick={() =>
											setTheme(
												option.id as
													| "light"
													| "dark"
													| "high-contrast",
											)
										}
										className={`w-full p-5 rounded-2xl border-2 transition-all text-left high-contrast:!border-yellow-400 ${
											isSelected
												? `${option.borderColor} high-contrast:!border-yellow-400 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 high-contrast:!bg-black shadow-lg`
												: "border-border hover:border-primary/50 hover:shadow-md"
										}`}
									>
										<div className="flex items-start gap-4">
											<div
												className={`w-16 h-16 ${option.preview} rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${isSelected ? option.borderColor + " high-contrast:!border-yellow-400" : "border-border high-contrast:!border-yellow-400"}`}
											>
												<Icon
													className={`w-8 h-8 ${option.id === "light" ? "text-amber-600" : "text-white high-contrast:!text-yellow-400"}`}
												/>
											</div>

											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between mb-1">
													<p className="text-base font-semibold cursor-pointer high-contrast:!text-white">
														{option.name}
													</p>
													{isSelected && (
														<motion.div
															initial={{
																scale: 0,
															}}
															animate={{
																scale: 1,
															}}
															className="w-6 h-6 bg-primary high-contrast:!bg-yellow-400 rounded-full flex items-center justify-center"
														>
															<Check className="w-4 h-4 text-primary-foreground high-contrast:!text-black" />
														</motion.div>
													)}
												</div>
												<p className="text-sm text-muted-foreground high-contrast:!text-yellow-400">
													{option.description}
												</p>
											</div>
										</div>
									</motion.button>
								);
							})}
						</div>

						<div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/50 high-contrast:!bg-black rounded-xl border-2 border-blue-200 dark:border-blue-800 high-contrast:!border-yellow-400">
							<div className="flex gap-3">
								<div className="w-5 h-5 bg-blue-500 high-contrast:!bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white high-contrast:!text-black text-xs font-bold">
										i
									</span>
								</div>
								<div>
									<p className="text-sm font-medium text-blue-900 dark:text-blue-100 high-contrast:!text-yellow-400 mb-1">
										Sobre as opções de acessibilidade
									</p>
									<p className="text-xs text-blue-700 dark:text-blue-300 high-contrast:!text-white">
										O modo de alto contraste foi
										desenvolvido para pessoas com baixa
										visão ou sensibilidade a cores,
										oferecendo maior distinção entre
										elementos da interface com bordas mais
										espessas e cores vibrantes.
									</p>
								</div>
							</div>
						</div>
					</Card>

					<Card className="p-6 md:p-8 rounded-3xl border-2 high-contrast:!border-yellow-400">
						<h2 className="text-xl font-semibold mb-2 high-contrast:!text-white">
							Outras Configurações
						</h2>
						<p className="text-sm text-muted-foreground mb-4 high-contrast:!text-yellow-400">
							Em breve mais opções de personalização
						</p>
						<div className="space-y-3">
							<div className="p-4 rounded-xl bg-muted/50 dark:bg-muted/20 high-contrast:!bg-black border border-border high-contrast:!border-yellow-400">
								<p className="text-sm text-muted-foreground high-contrast:!text-yellow-400">
									Notificações (em breve)
								</p>
							</div>
							<div className="p-4 rounded-xl bg-muted/50 dark:bg-muted/20 high-contrast:!bg-black border border-border high-contrast:!border-yellow-400">
								<p className="text-sm text-muted-foreground high-contrast:!text-yellow-400">
									Tamanho da fonte (em breve)
								</p>
							</div>
							<div className="p-4 rounded-xl bg-muted/50 dark:bg-muted/20 high-contrast:!bg-black border border-border high-contrast:!border-yellow-400">
								<p className="text-sm text-muted-foreground high-contrast:!text-yellow-400">
									Idioma (em breve)
								</p>
							</div>
						</div>
					</Card>
				</motion.div>
			</main>
		</div>
	);
}
