"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ICON_FIX = { dal: "🥜" };

export default function NavLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-3">
      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const active = pathname === href;

        return (
          <Link
            key={c.id}
            href={href}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-green-600 text-white"
                : "bg-base-200 text-gray-700 hover:bg-green-100"
            }`}
          >
            {ICON_FIX[c.slug] || c.icon} {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}