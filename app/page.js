import { getProducts } from "@/lib/api";
import { formatPrice, unitLong, getChange, banglaDate } from "@/lib/utils";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-2xl font-bold">{banglaDate()}</h1>
      <p>মোট পণ্য: {products.length}</p>
      <ul className="mt-4 space-y-1">
        {products.slice(0, 5).map((p) => (
          <li key={p.id}>
            {p.image} {p.nameBn} — {formatPrice(p.today)} ({unitLong(p.unit)}){" "}
            <span className={getChange(p.change).className}>
              {getChange(p.change).text}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
