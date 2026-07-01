import { NextResponse } from "next/server";
import { createSession, createUser, findUserByEmail } from "@/lib/backendStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    const user = await createUser({ name, email, password });
    const session = await createSession(user.id);

    const response = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: session.token,
    });

    response.cookies.set("session_token", session.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Signup failed", error);
    return NextResponse.json({ error: "Unable to create account right now." }, { status: 500 });
  }
}
