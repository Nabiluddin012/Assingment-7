import { getProducts } from "@/lib/api";
import { formatPrice, unitShort, toBn } from "@/lib/utils";

export default async function PriceTicker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  // duibar rakhi, jate loop-ta kono jhatka chhara chole
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden bg-gray-900 py-2 text-white">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {items.map((p, i) => {
          const dir = p.change?.dir;
          const color =
            dir === "up"
              ? "text-green-400"
              : dir === "down"
              ? "text-red-400"
              : "text-gray-400";
          const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
          const pct = toBn(Number(p.change?.pct ?? 0).toFixed(1));

          return (
            <span key={`${p.id}-${i}`} className="px-4 text-sm">
              {p.image} {p.nameBn} {formatPrice(p.today)}/{unitShort(p.unit)}{" "}
              <span className={color}>
                {symbol} {pct}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}