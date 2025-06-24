import { db as prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organization: {
          select: {
            logo: true,
            name: true,
            address: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
