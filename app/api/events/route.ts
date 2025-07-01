import { db as prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { eventSchema } from "@/lib/validation/event-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        banner: true,
        title: true,
        date: true,
        organization: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
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
        title: validatedData.title,
        date: validatedData.date,
        price: validatedData.price,
        description: validatedData.description,
        banner: validatedData.banner,
        user: { connect: { id: session.id } },
        organization: { connect: { id: validatedData.organizationId } },
      },
    });

    return NextResponse.json(
      {
        success: "Evento criado com sucesso",
        id: event.id,
      },
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
