"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { LIFE_REGEN_MS, LIFE_COST } from "@/lib/lives";

interface OutOfLivesProps {
	livesUpdatedAt: string | null;
	coins: number;
	/** Chamado quando o cronômetro zera, para recarregar as vidas do usuário. */
	onRegen: () => void;
	/** Compra 1 vida com moedas. Retorna a resposta da API. */
	onBuy: () => Promise<{ error?: string } | undefined>;
}

function formatRemaining(ms: number) {
	const total = Math.max(Math.ceil(ms / 1000), 0);
	const minutes = Math.floor(total / 60);
	const seconds = total % 60;
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function OutOfLives({
	livesUpdatedAt,
	coins,
	onRegen,
	onBuy,
}: OutOfLivesProps) {
	const target = livesUpdatedAt
		? new Date(livesUpdatedAt).getTime() + LIFE_REGEN_MS
		: null;

	const [remaining, setRemaining] = useState(() =>
		target ? target - Date.now() : 0,
	);
	const [buying, setBuying] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!target) return;
		const tick = () => {
			const left = target - Date.now();
			setRemaining(left);
			if (left <= 0) {
				onRegen();
			}
		};
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, [target, onRegen]);

	const canAfford = coins >= LIFE_COST;

	const handleBuy = async () => {
		setError(null);
		setBuying(true);
		const result = await onBuy();
		setBuying(false);
		if (result?.error) {
			setError(result.error);
		}
	};

	return (
		<div className="text-center py-12">
			<div className="text-6xl mb-4">{"💔"}</div>
			<h2 className="text-2xl font-bold text-foreground mb-2">
				Voce ficou sem vidas!
			</h2>
			<p className="text-muted-foreground mb-6">
				Espere a recuperacao ou compre uma vida para continuar.
			</p>

			{target ? (
				<div className="bg-card rounded-2xl p-6 border border-border shadow-sm max-w-xs mx-auto mb-6">
					<p className="text-sm text-muted-foreground mb-1">
						Proxima vida em
					</p>
					<p className="text-4xl font-extrabold text-primary tabular-nums">
						{formatRemaining(remaining)}
					</p>
				</div>
			) : null}

			{/* Compra de vida com moedas */}
			<div className="bg-card rounded-2xl p-6 border border-border shadow-sm max-w-xs mx-auto mb-6">
				<div className="flex items-center justify-center gap-2 mb-4 text-lg font-bold text-foreground">
					<FontAwesomeIcon
						icon={faCoins}
						style={{ color: "rgb(255, 212, 59)" }}
					/>
					<span>{coins} moedas</span>
				</div>
				<button
					onClick={handleBuy}
					disabled={!canAfford || buying}
					className={`w-full py-3 rounded-xl font-bold transition-all ${
						canAfford && !buying
							? "bg-primary text-primary-foreground hover:bg-primary/90"
							: "bg-muted text-muted-foreground cursor-not-allowed"
					}`}
				>
					{buying
						? "Comprando..."
						: `Comprar 1 vida (${LIFE_COST} moedas)`}
				</button>
				{!canAfford && (
					<p className="text-xs text-muted-foreground mt-2">
						Voce precisa de {LIFE_COST} moedas. Conclua licoes para
						ganhar mais!
					</p>
				)}
				{error && (
					<p className="text-xs text-destructive mt-2">{error}</p>
				)}
			</div>

			<Link
				href="/mapa"
				className="inline-block border-2 border-border text-muted-foreground px-6 py-3 rounded-xl font-bold hover:border-primary/50 transition-all"
			>
				Ver mapa
			</Link>
		</div>
	);
}
