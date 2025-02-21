import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// Configuration for OAuth
// Essentially we are creating an endpoint so when the user visits [source]/api/auth/*
// OAuth is going to handle any request to that endpoint
// To create a custom page to style OAuth we are displaying the signIn page which is the same route in the nextJS 
// The pages option is not the path to our file but what characters come after /api/auth/ 

// Callbacks are asynchronous functions you can use to control what happens when an action is performed.
// So if a user is not in the database we want to add a user to the database using Drizzle to talk to our database 
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // Secifies which provider to ues whic is set up in google cloud 
    // These variables are inside the .env file 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin' // This is a route path not a file path 
  }, 
  session: { 
    strategy: "jwt",
  },
  callbacks: { 
    // On signIn we want to verify if user has an account if so login if not create an account 
    async signIn({account, profile}){

        if(!profile?.email) { 
            throw Error("No profile")
        }

        return true;
    },
    async jwt({ token, account, profile }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        return token
      }
  },
}

export default NextAuth(authOptions)