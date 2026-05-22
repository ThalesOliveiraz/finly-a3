"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(email, password);
			router.push("/mapa");
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Erro ao fazer login",
			);
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-extrabold">
						<span className="text-primary">Fin</span>
						<span className="text-foreground">Ly</span>
					</h1>
					<p className="text-muted-foreground mt-2">Entre na sua conta</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm">
							{error}
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full border-2 border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
							placeholder="seu@email.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Senha
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full border-2 border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
							placeholder="Sua senha"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
					>
						{loading ? "Entrando..." : "Entrar"}
					</button>
				</form>

				<p className="text-center text-muted-foreground mt-6 text-sm">
					Nao tem conta?{" "}
					<Link
						href="/registro"
						className="text-primary font-bold hover:underline"
					>
						Crie uma agora
					</Link>
				</p>

				<Link
					href="/"
					className="block text-center text-muted-foreground mt-4 text-sm hover:text-muted-foreground"
				>
					Voltar ao inicio
				</Link>
			</div>
		</div>
	);
}
