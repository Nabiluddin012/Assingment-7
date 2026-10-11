import Link from "next/link";
import { formatNumber, unitLong, getChange } from "@/lib/utils";

export default function ProductCard({ product }) {
  const change = getChange(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-green-600 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitLong(product.unit)}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <p>
          <span className="text-xl font-bold text-gray-900">
            {formatNumber(product.today)}
          </span>{" "}
          <span className="text-sm text-gray-700">টাকা</span>
        </p>
        <span
          className={`rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium ${change.className}`}
        >
          {change.text}
        </span>
      </div>
    </Link>
  );
}