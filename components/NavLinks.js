"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



export default function NavLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto py-2">
      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const active = pathname === href;

        return (
          <Link
            key={c.id}
            href={href}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              active
              ? "bg-green-700 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}