import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials == null) return null;
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password);
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: { session: Session; user: User; trigger?: "signIn" | "signUp" | "update"; token: JWT }) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = (token.role as string) || "user";
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },

    async jwt({ token, user, trigger, session }: { token: JWT; user?: User; trigger?: "signIn" | "signUp" | "update"; session?: Session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      if (trigger === "signIn" || trigger === "signUp") {
        const cookiesObject = await cookies();
        const sessionCartId = cookiesObject.get("sessionCartId")?.value;

        if (sessionCartId) {
          const sessionCart = await prisma.cart.findFirst({
            where: { sessionCartId },
          });

          if (sessionCart) {
            await prisma.cart.deleteMany({
              where: { userId: user!.id },
            });

            await prisma.cart.update({
              where: { id: sessionCart.id },
              data: { userId: user!.id },
            });
          }
        }
      }

      // Handle session updates (e.g., name change)
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    authorized({ request, auth }) {
      const protectedPaths = [/\/shipping-address/, /\/payment-method/, /\/place-order/, /\/profile/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin/];
      const { pathname } = request.nextUrl;
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        const newRequestHeaders = new Headers(request.headers);
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
});
