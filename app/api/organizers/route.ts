import { db as prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getCurrentUser();

    const organizers = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
      },
      where: {
        userId: session.id,
      },
    });

    return NextResponse.json(organizers);
  } catch (error) {
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const organizer = await request.json();

  try {
    const session = await getCurrentUser();

    const event = await prisma.organization.create({
      data: {
        ...organizer,
        user: { connect: { id: session.id } },
      },
    });

    return NextResponse.json(
      { success: "Organização criada com sucesso", id: event.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
