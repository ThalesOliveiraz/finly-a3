import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { regenerateLives } from "./lives";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "finlingo-secret";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function createToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      xp: true,
      level: true,
      streak: true,
      lives: true,
      livesUpdatedAt: true,
      coins: true,
      lastActiveAt: true,
    },
  });
  if (!user) return null;

  // Aplica a regeneração de vidas baseada no tempo e persiste se mudou.
  const regen = regenerateLives(user.lives, user.livesUpdatedAt);
  if (
    regen.lives !== user.lives ||
    regen.livesUpdatedAt?.getTime() !== user.livesUpdatedAt?.getTime()
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: { lives: regen.lives, livesUpdatedAt: regen.livesUpdatedAt },
    });
  }

  return { ...user, lives: regen.lives, livesUpdatedAt: regen.livesUpdatedAt };
}
