"use client";

import Link from "next/link";

export default function WatchPartyPage() {
  const partyCode = "MYTUBE-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  const copyCode = () => {
    navigator.clipboard.writeText(partyCode);
    alert("Party code copied!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-[420px] text-center shadow-xl">

        <h1 className="text-3xl font-bold mb-6">
          🎉 Watch Party
        </h1>

        <p className="text-gray-400 mb-2">
          Party Code
        </p>

        <div className="bg-zinc-800 rounded-lg p-4 text-2xl font-bold tracking-widest mb-6">
          {partyCode}
        </div>

        <button
          onClick={copyCode}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg mb-4"
        >
          Copy Code
        </button>

        <div className="text-left mt-6">

          <h2 className="font-semibold mb-3">
            Participants
          </h2>

          <div className="bg-zinc-800 rounded-lg p-3">
            👤 You (Host)
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Waiting for participants...
          </p>

        </div>

        <Link href="/">
          <button className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg">
            Leave Party
          </button>
        </Link>

      </div>
    </div>
  );
}