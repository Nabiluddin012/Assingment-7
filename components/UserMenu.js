"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu({ user }) {
  const router = useRouter();
  const firstName = user.name?.split(" ")[0] || "ব্যবহারকারী";

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
            {firstName[0]}
          </span>
        )}
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
        <span className="text-xs text-gray-500">▾</span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
      >
        <p className="font-semibold text-gray-900">{user.name}</p>
        <p className="truncate text-xs text-gray-500">{user.email}</p>
        <div className="my-3 border-t border-gray-200" />
        <Link
          href="/profile"
          className="block rounded-lg px-2 py-2 text-sm hover:bg-gray-100"
        >
          আমার প্রোফাইল
        </Link>
        <button
          onClick={handleSignOut}
          className="mt-1 block w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>
    </div>
  );
}
