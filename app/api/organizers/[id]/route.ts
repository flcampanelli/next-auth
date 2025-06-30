import { db as prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const organizer = await prisma.organization.findUnique({
      where: { id },
      include: {
        events: {
          select: {
            title: true,
            date: true,
            banner: true,
          },
        },
      },
    });

    if (!organizer) {
      return NextResponse.json(
        { error: "Organizador não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(organizer);
  } catch (error) {
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
