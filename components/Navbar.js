import Link from "next/link";
import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/utils";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            className="h-10 w-10 object-contain"
        />
        <span className="leading-tight">
            <span className="block text-xl font-bold text-green-700 sm:text-2xl">
            বাজার দর
            </span>
            <span className="block text-xs text-gray-500">{banglaDate()}</span>
        </span>
        </Link>

          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-success btn-sm text-white sm:btn-md"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <NavLinks categories={categories} />
      </div>
    </header>
  );
}