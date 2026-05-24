// Regras de vidas (estilo Duolingo): regeneração por tempo.

export const MAX_LIVES = 5;
export const LIFE_REGEN_MS = 30 * 60 * 1000; // 1 vida a cada 30 minutos

// Economia de moedas
export const COINS_PER_CORRECT = 5; // moedas ganhas por resposta correta
export const LIFE_COST = 50; // moedas para comprar 1 vida

export interface LivesState {
	lives: number;
	livesUpdatedAt: Date | null;
}

/**
 * Aplica a regeneração de vidas com base no tempo decorrido desde a âncora.
 * Não persiste nada — apenas calcula o estado atual.
 *
 * `livesUpdatedAt` é a âncora a partir da qual contamos os "ticks" de
 * regeneração. `null` significa que as vidas estão cheias (sem cronômetro).
 */
export function regenerateLives(
	lives: number,
	livesUpdatedAt: Date | null,
): LivesState {
	if (lives >= MAX_LIVES) {
		return { lives: MAX_LIVES, livesUpdatedAt: null };
	}
	// Vidas abaixo do máximo, mas sem âncora: inicia o cronômetro agora.
	if (!livesUpdatedAt) {
		return { lives, livesUpdatedAt: new Date() };
	}

	const elapsed = Date.now() - livesUpdatedAt.getTime();
	const recovered = Math.floor(elapsed / LIFE_REGEN_MS);
	if (recovered <= 0) {
		return { lives, livesUpdatedAt };
	}

	const newLives = Math.min(lives + recovered, MAX_LIVES);
	if (newLives >= MAX_LIVES) {
		return { lives: MAX_LIVES, livesUpdatedAt: null };
	}
	// Avança a âncora pelos ticks já consumidos (mantém a fração restante).
	return {
		lives: newLives,
		livesUpdatedAt: new Date(
			livesUpdatedAt.getTime() + recovered * LIFE_REGEN_MS,
		),
	};
}

/**
 * Deduz vidas (ex.: erros no quiz), iniciando o cronômetro de regeneração
 * caso ainda não exista uma âncora em andamento.
 */
export function spendLives(
	lives: number,
	livesUpdatedAt: Date | null,
	amount: number,
): LivesState {
	const newLives = Math.max(lives - Math.max(amount, 0), 0);
	if (newLives >= MAX_LIVES) {
		return { lives: newLives, livesUpdatedAt: null };
	}
	// Mantém a âncora existente; se não houver, começa a contar agora.
	return { lives: newLives, livesUpdatedAt: livesUpdatedAt ?? new Date() };
}

export interface BuyResult {
	ok: boolean;
	error?: string;
	lives: number;
	livesUpdatedAt: Date | null;
	coins: number;
}

/**
 * Compra 1 vida usando moedas. Não persiste — apenas valida e calcula o
 * novo estado. Espera receber o estado JÁ regenerado.
 */
export function buyLife(
	lives: number,
	livesUpdatedAt: Date | null,
	coins: number,
): BuyResult {
	if (lives >= MAX_LIVES) {
		return {
			ok: false,
			error: "Suas vidas ja estao cheias",
			lives,
			livesUpdatedAt,
			coins,
		};
	}
	if (coins < LIFE_COST) {
		return {
			ok: false,
			error: "Moedas insuficientes",
			lives,
			livesUpdatedAt,
			coins,
		};
	}

	const newLives = Math.min(lives + 1, MAX_LIVES);
	return {
		ok: true,
		lives: newLives,
		// Se completou o máximo, zera o cronômetro; senão mantém a contagem.
		livesUpdatedAt: newLives >= MAX_LIVES ? null : livesUpdatedAt,
		coins: coins - LIFE_COST,
	};
}
