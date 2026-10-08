"use client";

import Link from "next/link";
import { ArrowLeft, Construction, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl">

        <div className="flex justify-center">
          <div className="bg-red-600/20 p-5 rounded-full">
            <Construction
              size={56}
              className="text-red-500 animate-pulse"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold mt-8">
          Coming Soon
        </h1>

        <p className="text-zinc-400 mt-5 text-lg leading-relaxed">
          This feature is currently under development and will be available in a
          future MyTube update.
        </p>

        <div className="mt-8 bg-zinc-800 rounded-2xl p-5">

          <div className="flex items-center justify-center gap-2">

            <Sparkles
              size={20}
              className="text-yellow-400"
            />

            <span className="font-semibold">
              Thanks for trying MyTube!
            </span>

          </div>

          <p className="text-sm text-zinc-400 mt-3">
            We're continuously improving the platform and adding new features.
          </p>

        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

      </div>

    </div>
  );
}