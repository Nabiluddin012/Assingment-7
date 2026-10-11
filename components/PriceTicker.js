import { getProducts } from "@/lib/api";
import { formatPrice, unitShort, getChange } from "@/lib/utils";

export default async function PriceTicker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {items.map((p, i) => {
          const change = getChange(p.change);

          return (
            <span
              key={`${p.id}-${i}`}
              className="flex items-center gap-1.5 border-r border-gray-200 px-5 py-2 text-sm"
            >
              <span>{p.image}</span>
              <span className="font-medium text-gray-900">{p.nameBn}</span>
              <span className="text-gray-500">
                {formatPrice(p.today)}/{unitShort(p.unit)}
              </span>
              <span className={`font-semibold ${change.className}`}>
                {change.text}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}