import Link from "next/link";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন | বাজার দর" };

export default async function SignInPage({ searchParams }) {
  const { callbackURL } = await searchParams;
  // শুধু নিজের সাইটের path-এ redirect করতে দেওয়া
  const safeCallback =
    callbackURL && callbackURL.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-600">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <SignInForm callbackURL={safeCallback} />
      <p className="mt-5 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </main>
  );
}