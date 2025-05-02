'use server'
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { user, user_permission } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema"; // Import your schema

type SuccessResponse = {
    message: string;
};
  
type ErrorResponse = {
    error: string;
};

// All functions for server actions related to the user table 
export async function getUser(email: string) { 

    try{ 
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        const response = await db.select().from(user).where(eq(user.email, email))
        if(response.length === 0) { 
            return null
        } else { 
            return response[0]
        }
    } catch(error: any) { 
        console.log(error)
        throw Error("Error getting user", error)
    }
}

export async function createUser(firstName: string, lastName: string, email: string, password: string, confirm_password: string): Promise<SuccessResponse | ErrorResponse> { 
    try { 
        const response = await getUser(email);
        // If user does not exist
        if(response === null) { 
            if(password === confirm_password) { 
                const sql = neon(process.env.DATABASE_URL!);
                const db = drizzle(sql, { schema });
                const bcrypt = require('bcrypt');
                const hashedPassword = await bcrypt.hash(password, 10);

                const user_res = await db.insert(user).values({first_name: firstName, last_name: lastName, email: email, password: hashedPassword}).returning({userId: user.id})
                const userId = user_res[0]?.userId; // Extract the userId from the first element
                        
                if (userId) {
                    await db.insert(user_permission).values({
                        user_id: userId, // Use the extracted integer value directly
                        permission_id: 2
                    });
                    return { message: 'User created successfully'};
                } else {
                    return {error: "Server Error"}
                }
                
            } else { 
                return {error: "Passwords do not match"};
            }
        } else { 
            // User already exists return error 
            return {error: "User Already Exists"};
        }
    } catch(error: any) { 
        console.error(error)
        return { error: 'An error occurred while creating the user' };
    }
}