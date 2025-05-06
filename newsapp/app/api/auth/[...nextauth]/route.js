/*
import NextAuth from "next-auth";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
*/
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Use a super simple config for testing
const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize() {
            // Just return a dummy user for testing
            return { id: "1", name: "Test User" };
         },
      }),
   ],
});

export { handler as GET, handler as POST };
