"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Sign out first to avoid popup issues with cached sessions
      await auth.signOut().catch(() => {});

      // Google Sign-In
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Send Google user to YOUR backend
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          image: firebaseUser.photoURL,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Backend login failed");
      }

      // Store backend JWT
      localStorage.setItem("token", data.token);

      // Store backend user
      localStorage.setItem("user", JSON.stringify(data.result));

      // Optional Firebase UID
      localStorage.setItem("firebaseUID", firebaseUser.uid);
alert("Login Successful!");

window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-[360px] rounded-xl bg-zinc-900 p-10 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Login
        </h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-3 text-lg font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}