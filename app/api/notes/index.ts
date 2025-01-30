import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const notes = await prisma.note.findMany({
      where: { userId: session.user.id },
    });
  
    return NextResponse.json(notes);
  }

  export async function POST(req: Request) {
    const { title, content, isPublic, userId } = await req.json();
  
    const note = await prisma.note.create({
      data: {
        title,
        content,
        isPublic,
        user: { connect: { id: userId } },
      },
    });
  
    return NextResponse.json(note);
  }