import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profile = await prisma.profile.findUnique({
      where: { userId: session.userId as string },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    const profile = await prisma.profile.upsert({
      where: { userId: session.userId as string },
      update: {
        age: data.age,
        gender: data.gender,
        contact: data.contact,
        location: data.location,
        goal: data.goal,
      },
      create: {
        userId: session.userId as string,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
        location: data.location,
        goal: data.goal,
      },
    });

    // Also update the User name if passed
    if (data.name) {
      await prisma.user.update({
        where: { id: session.userId as string },
        data: { name: data.name }
      });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
