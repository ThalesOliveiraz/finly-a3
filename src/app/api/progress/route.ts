import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { COINS_PER_CORRECT } from "@/lib/lives";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    return Response.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return Response.json({ error: "Token invalido" }, { status: 401 });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: payload.userId },
  });

  return Response.json({ progress });
}

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

  const { phaseId, lessonId, score } = await request.json();

  const progress = await prisma.progress.upsert({
    where: {
      userId_phaseId_lessonId: {
        userId: payload.userId,
        phaseId,
        lessonId,
      },
    },
    update: { completed: true, score: Math.max(score, 0) },
    create: {
      userId: payload.userId,
      phaseId,
      lessonId,
      completed: true,
      score,
    },
  });

  // Award XP and coins (vidas sao tratadas em tempo real via /api/lives).
  const xpGained = score * 10;
  const coinsGained = Math.max(score, 0) * COINS_PER_CORRECT;

  const user = await prisma.user.update({
    where: { id: payload.userId },
    data: {
      xp: { increment: xpGained },
      coins: { increment: coinsGained },
      lastActiveAt: new Date(),
    },
  });

  // Level up every 100 XP
  const newLevel = Math.floor(user.xp / 100) + 1;
  if (newLevel > user.level) {
    await prisma.user.update({
      where: { id: payload.userId },
      data: { level: newLevel },
    });
  }

  // Check badges
  const totalCompleted = await prisma.progress.count({
    where: { userId: payload.userId, completed: true },
  });

  const badgesToCheck = [
    { count: 1, name: "Primeiro Passo", icon: "star" },
    { count: 3, name: "Estudante Dedicado", icon: "book" },
    { count: 6, name: "Mestre Financeiro", icon: "trophy" },
  ];

  for (const badge of badgesToCheck) {
    if (totalCompleted >= badge.count) {
      await prisma.badge.upsert({
        where: {
          userId_name: { userId: payload.userId, name: badge.name },
        },
        update: {},
        create: {
          userId: payload.userId,
          name: badge.name,
          icon: badge.icon,
        },
      });
    }
  }

  return Response.json({
    progress,
    xpGained,
    totalXp: user.xp,
    level: newLevel,
    coinsGained,
    coins: user.coins,
  });
}
