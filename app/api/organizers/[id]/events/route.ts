import { db as prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const events = await prisma.event.findMany({
      where: {
        organizationId: id
      },
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

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
