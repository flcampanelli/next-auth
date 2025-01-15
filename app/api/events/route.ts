import { db as prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { eventSchema } from "@/lib/validation/event-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        banner: true,
        title: true,
        date: true,
        placeName: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const validatedData = eventSchema.parse(data);

    const session = await getCurrentUser();

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        user: { connect: { id: session.id } },
      },
    });

    return NextResponse.json(
      { success: "Evento criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
