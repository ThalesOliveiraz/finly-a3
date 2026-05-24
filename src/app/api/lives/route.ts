import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { regenerateLives, spendLives, buyLife } from "@/lib/lives";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    return Response.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return Response.json({ error: "Token invalido" }, { status: 401 });
  }

  const { action } = await request.json();

  const current = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { lives: true, livesUpdatedAt: true, coins: true },
  });
  if (!current) {
    return Response.json({ error: "Usuario nao encontrado" }, { status: 404 });
  }

  // Sempre regenera primeiro, para refletir o tempo decorrido.
  const regen = regenerateLives(current.lives, current.livesUpdatedAt);

  if (action === "lose") {
    const spent = spendLives(regen.lives, regen.livesUpdatedAt, 1);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { lives: spent.lives, livesUpdatedAt: spent.livesUpdatedAt },
    });
    return Response.json({
      lives: spent.lives,
      livesUpdatedAt: spent.livesUpdatedAt,
      coins: current.coins,
    });
  }

  if (action === "buy") {
    const result = buyLife(regen.lives, regen.livesUpdatedAt, current.coins);
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: payload.userId },
      data: {
        lives: result.lives,
        livesUpdatedAt: result.livesUpdatedAt,
        coins: result.coins,
      },
    });
    return Response.json({
      lives: result.lives,
      livesUpdatedAt: result.livesUpdatedAt,
      coins: result.coins,
    });
  }

  return Response.json({ error: "Acao invalida" }, { status: 400 });
}
