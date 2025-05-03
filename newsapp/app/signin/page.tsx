"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setError("Username or Password is Incorrect");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 font-montserrat">
          Welcome Back
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-4 font-montserrat">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-montserrat">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 rounded-full shadow transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 font-montserrat">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-900 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
