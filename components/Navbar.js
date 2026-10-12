import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/utils";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const categories = await getCategories();
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl">
            🛒
          </span>
          <span className="leading-snug">
            <span className="block text-xl font-bold text-gray-900">
              বাজার দর
            </span>
            <span className="block pt-0.5 text-xs leading-5 text-gray-500">
              {banglaDate()}
            </span>
          </span>
        </Link>

        {session ? (
          <UserMenu
            user={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image ?? null,
            }}
          />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-sm border-0 bg-green-700 text-white hover:bg-green-800 sm:btn-md"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <NavLinks categories={categories} />
        </div>
      </div>
    </header>
  );
}