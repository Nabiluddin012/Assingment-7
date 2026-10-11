import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="btn mt-6 border-0 bg-green-700 text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}