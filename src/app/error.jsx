// app/error.jsx
"use client"; // Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-500 mt-2">{error.message}</p>
      <button 
        onClick={() => reset()} 
        className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl"
      >
        Try again
      </button>
    </div>
  );
}