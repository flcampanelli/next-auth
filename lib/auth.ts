import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jason" },
        password: { label: "Password", type: "password" },
        username: { label: "Name", type: "text", placeholder: "Jason Statham" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Dados de login necessários.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // !user.hashedPassword: user registered with another provider
        if (!user || !user.hashedPassword) {
          throw new Error("Usuário não registrado através de credenciais.");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordMatch) {
          throw new Error("Senha incorreta.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};
