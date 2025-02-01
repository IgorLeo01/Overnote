import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, privacy } = await req.json();

    if (!title || !content || !privacy) {
      return NextResponse.json(
        { message: "Title, content, and privacy are required" },
        { status: 400 }
      );
    }

    await prisma.note.create({
      data: {
        title,
        content,
        isPublic: privacy === "public",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Note created" }, { status: 201 });
  } catch (err) {
    console.error("Error creating note:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const notes = await prisma.note.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
