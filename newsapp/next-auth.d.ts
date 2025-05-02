// Module Augmentation https://next-auth.js.org/getting-started/typescript

import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" { 
    interface Session { 

        // Added extra fields id and role to user and added the rest of 
        // the roles using & DefaultSession 
        user: {
            id: string, 
            email: string,
            name: string, 
        } & DefaultSession
    }

   
}

