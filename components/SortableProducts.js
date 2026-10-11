"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { sortProducts, toBn } from "@/lib/utils";

export default function SortableProducts({
  products,
  id,
  title = "সব পণ্য",
}) {
  const [order, setOrder] = useState("default");
  const sorted = sortProducts(products, order);

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mb-4 mt-2 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          সাজান
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}                                                       