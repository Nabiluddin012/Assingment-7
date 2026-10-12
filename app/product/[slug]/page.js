import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, unitLong, getChange } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product
      ? `${product.nameBn} এর আজকের দাম | বাজার দর`
      : "পাতা পাওয়া যায়নি | বাজার দর",
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const markets = product.markets ?? [];
  const hasMarkets = markets.length > 0;

  const minPrice = hasMarkets
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = hasMarkets
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const avgPrice = hasMarkets
    ? Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
          markets.length
      )
    : product.today;

  const change = getChange(product.change);

  const boxes = [
    {
      label: "সর্বনিম্ন দাম",
      value: minPrice,
      box: "bg-green-50 border-green-200",
      text: "text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: maxPrice,
      box: "bg-red-50 border-red-200",
      text: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: avgPrice,
      box: "bg-gray-50 border-gray-200",
      text: "text-gray-900",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.nameBn}</span>
      </nav>

      {/* summary */}
      <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500">
                {product.categoryNameBn} · {unitLong(product.unit)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                আজ সারাদেশে গড় দাম {formatPrice(avgPrice)}, গতকাল ছিল{" "}
                {formatPrice(product.yesterday)}।
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 px-5 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>
            <p className="text-xs text-gray-500">{unitLong(product.unit)}</p>
            <p className={`text-sm font-semibold ${change.className}`}>
              {change.text}
            </p>
          </div>
        </div>
      </section>

      {/* price summary */}
      <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {boxes.map((b) => (
            <div key={b.label} className={`rounded-xl border p-4 ${b.box}`}>
              <p className="text-sm text-gray-600">{b.label}</p>
              <p className={`mt-1 text-2xl font-bold ${b.text}`}>
                {formatPrice(b.value)}
              </p>
              <p className="text-xs text-gray-500">{unitLong(product.unit)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* market table */}
      <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {!hasMarkets ? (
          <p className="mt-3 text-gray-500">
            এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-2 font-medium">বাজার</th>
                  <th className="px-3 py-2 font-medium">বিভাগ</th>
                  <th className="px-3 py-2 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-3 py-2 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-3 py-2 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr
                    key={m.market}
                    className="odd:bg-white even:bg-green-50/60"
                  >
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{m.division}</td>
                    <td className="px-3 py-2.5 text-right text-gray-700">
                      {formatPrice(m.min)}
                    </td>
                    <td className="px-3 py-2.5 text-right text-gray-700">
                      {formatPrice(m.max)}
                    </td>
                    <td className="px-3 py-2.5 text-right font-bold text-gray-900">
                      {formatPrice(Math.round((m.min + m.max) / 2))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}