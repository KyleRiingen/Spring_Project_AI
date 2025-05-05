"use client";

import React, { useState } from "react";
import { createUser } from "../actions/user";
import { useRouter } from "next/navigation";

function SignUpPage() {
   const router = useRouter();
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const response = await createUser(firstName, lastName, email, password, confirmPassword);

         if ("error" in response) {
            setErrorMessage(response.error);
         } else {
            router.push("/api/auth/signin");
         }
      } catch (error) {
         console.error("Error creating user:", error);
         setErrorMessage("An error occurred while creating your account.");
      }
   };

   return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 font-montserrat">Create Your Account</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-montserrat">
               <div>
                  <label className="block mb-1 text-gray-700">First Name</label>
                  <input type="text" placeholder="First Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
               </div>

               <div>
                  <label className="block mb-1 text-gray-700">Last Name</label>
                  <input type="text" placeholder="Last Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
               </div>

               <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={email} onChange={(e) => setEmail(e.target.value)} required />
               </div>

               <div>
                  <label className="block mb-1 text-gray-700">Password</label>
                  <input type="password" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={password} onChange={(e) => setPassword(e.target.value)} required />
               </div>

               <div>
                  <label className="block mb-1 text-gray-700">Confirm Password</label>
                  <input type="password" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
               </div>

               {errorMessage && <div className="text-red-500 text-center text-sm">{errorMessage}</div>}

               <button type="submit" className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 rounded-full shadow transition">
                  Sign Up
               </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 font-montserrat">
               Already have an account?{" "}
               <a href="/signin" className="text-blue-900 font-semibold hover:underline">
                  Log In
               </a>
            </p>
         </div>
      </main>
   );
}

export default SignUpPage;
