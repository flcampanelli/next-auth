import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserRegistered) {
    return NextResponse.json(
      { error: "Email já cadastrado." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
