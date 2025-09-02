import { db as prisma } from "@/lib/db";
import { Resend } from "resend";
import { v4 as uuid } from "uuid";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findVerificationTokenByEmail = async (email: string) => {
  const token = await prisma.verificationToken.findUnique({
    where: {
      email,
    },
  });
  return token;
};

export const deleteVerificationTokenById = async (id: string) => {
  const token = await prisma.verificationToken.delete({
    where: {
      id,
    },
  });
  return token;
};

export const createVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 hours

  const existingToken = await findVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }
  
  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires
    },
  });

  return verificationToken;
};

export const sendAccountVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "NextAuth <onboarding@resend.dev>",
      to: email,
      subject: "Verificação de conta",
      html: `<p>Clique <a href="${verificationUrl}">aqui</a> para verificar sua conta.</p>`,
    });

    if (error) {
      return { error };
    }

    return { success: "Verificação de E-mail enviada" };
  } catch (error) {
    return { error };
  }
};
