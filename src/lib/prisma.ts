import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> };

function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;

  // Em produção (Vercel) usamos o Turso. Localmente caímos no arquivo SQLite.
  const adapter = tursoUrl
    ? new PrismaLibSql({
        url: tursoUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      })
    : new PrismaLibSql({
        url: `file:${path
          .join(process.cwd(), "prisma", "dev.db")
          .replace(/\\/g, "/")}`,
      });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
