// addUser.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { usersTable } from './schema';  // Ensure this path is correct
import { eq } from 'drizzle-orm'; // This is used to compare if something is equal ( Filter and Conditional Operators )

const db = drizzle(process.env.DATABASE_URL!);

// Add user function to export to next-auth for adding users 
export async function addUser(name: string, age: number, email: string) {
  const user: typeof usersTable.$inferInsert = {
    name: name,
    age: age,
    email: email,
  };

  try {
    await db.insert(usersTable).values(user);
    console.log('New user created!');
  
    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users);

    return users;
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Most importnat is this aysnc function which means that compared to java where a function must complete before being executed
// Javascript async functions do not wait for the completion. A async function either returns a promise or an error. 
// When you use the keyword await this will wait for that function to be completed before continuing.
export async function getUser(email: string): Promise<boolean> { 
  try{ 
    
    const user = await db 
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      if(user.length === 0) { 
        return false
      } else { 
        return true
      }
  } catch(error) { 
    return false
  }
}
