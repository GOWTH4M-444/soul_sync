import { NextRequest, NextResponse } from "next/server";
import { createAssessment, findSession, findUserById } from "@/lib/backendStore";

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json();
    const summary = typeof body?.summary === "string" ? body.summary : "";
    const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};

    const record = await createAssessment(user.id, { summary, answers });
    return NextResponse.json({ assessment: record });
  } catch (error) {
    console.error("Assessment save failed", error);
    return NextResponse.json({ error: "Unable to save assessment." }, { status: 500 });
  }
}
