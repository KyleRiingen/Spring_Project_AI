import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "email", placeholder: "example@example.com" },
        password: { label: "Password:", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            const sql = neon(process.env.DATABASE_URL!);
            const db = drizzle(sql, { schema });

            const res = await db
              .select()
              .from(schema.user)
              .where(eq(schema.user.email, credentials.email));

            if (res.length > 0) {
              const current_user = res[0];
                
              const result = await db
                .select()
                .from(schema.user_permission)
                .where(eq(schema.user_permission.user_id, current_user.id));

              if (result.length === 0) return null;

              const bcrypt = require("bcrypt");
              const match = await bcrypt.compare(credentials.password, current_user.password);

              if (match) {
                return {
                  id: current_user.id.toString(),
                  email: current_user.email,
                  name: current_user.first_name, // Include user's first name
                };
              }
            }
            return null;
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Store name in token
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string; // Store name in session
      }
      return session;
    },
  },
};
