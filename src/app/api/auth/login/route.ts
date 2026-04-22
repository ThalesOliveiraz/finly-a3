import { prisma } from "@/lib/prisma";
import { verifyPassword, createToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email e senha sao obrigatorios" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return Response.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Update streak
    const now = new Date();
    const lastActive = new Date(user.lastActiveAt);
    const diffHours =
      (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

    let newStreak = user.streak;
    if (diffHours >= 24 && diffHours < 48) {
      newStreak += 1;
    } else if (diffHours >= 48) {
      newStreak = 1;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: now, streak: newStreak },
    });

    const token = createToken(user.id);

    return Response.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: newStreak,
        lives: user.lives,
      },
    });
  } catch {
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
