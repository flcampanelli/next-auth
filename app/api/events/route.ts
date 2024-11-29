import { db as prisma } from "@/lib/db";

import { getCurrentUser } from "@/lib/session";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { title, logo, date, placeName, address, description, banner, price } =
    data;
  const { street, city, state, postalCode } = data.address;

  if (!title || !date || !street || !city || !state || !postalCode || !price) {
    return NextResponse.json(
      { error: "Preencha os campos obrigatórios" },
      { status: 400 }
    );
  }

  const session = await getCurrentUser();

  const event = await prisma.event.create({
    data: {
      title,
      logo,
      date,
      placeName,
      address,
      description,
      banner,
      price,
      user: { connect: { id: session.id } },
    },
  });

  return NextResponse.json(event);
}
