import { db as prisma } from "@/lib/db";
import { createVerificationToken, sendAccountVerificationEmail } from "@/services/auth/email-verification";

import bcrypt from "bcryptjs";

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

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  const verificationToken = await createVerificationToken(email);
  const { error, success } = await sendAccountVerificationEmail(email, verificationToken.token);
  
  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  return NextResponse.json({ success: success }, { status: 200 });
}
