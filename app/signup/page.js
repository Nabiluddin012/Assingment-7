import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";

export const metadata = { title: "অ্যাকাউন্ট তৈরি করুন | বাজার দর" };

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত তথ্য দেখুন।
      </p>
      <SignUpForm />
      <p className="mt-5 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </main>
  );
}