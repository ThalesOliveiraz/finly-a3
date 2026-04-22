import { getUserFromToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  if (!user) {
    return Response.json({ error: "Token invalido" }, { status: 401 });
  }

  return Response.json({ user });
}
