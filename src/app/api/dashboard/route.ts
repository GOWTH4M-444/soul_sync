import { NextRequest, NextResponse } from "next/server";
import { findSession, findUserById, getDashboardData } from "@/lib/backendStore";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await findSession(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dashboard = await getDashboardData(user.id);
  return NextResponse.json(dashboard);
}
