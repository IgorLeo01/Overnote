import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userNotes = await prisma.note.findMany({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
    });

    if (userNotes.length === 0) {
      return NextResponse.json({ message: "No notes found for this user" }, { status: 404 });
    }

    return NextResponse.json(userNotes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}