"use client";

import { FaExclamationTriangle } from "react-icons/fa";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-blue-100">
        <div className="backdrop-blur-lg bg-white/70 border border-gray-200 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full mx-4">
          <FaExclamationTriangle className="text-red-400 text-5xl mb-4 drop-shadow-lg" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            কিছু একটা ভুল হয়েছে!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            দুঃখিত, অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </body>
    </html>
  );
}
