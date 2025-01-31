import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id },
    });

    if (!note || !note.isPublic) {
      return NextResponse.json({ message: "Note not found or private" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { content, privacy } = await req.json();

    if (!content || !privacy) {
      return NextResponse.json({ message: "Content and privacy are required" }, { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      where: { id: params.id },
      data: {
        content,           
        isPublic: privacy === "public", 
      },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const existingNote = await prisma.note.findUnique({
        where: { id: params.id },
      });
  
      if (!existingNote) {
        return NextResponse.json({ message: "Note not found" }, { status: 404 });
      }
  
      await prisma.note.delete({
        where: { id: params.id },
      });
  
      return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting note:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }