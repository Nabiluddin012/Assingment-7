import Link from "next/link";
import { notFound } from "next/navigation";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  return {
    title: category
      ? `${category.nameBn} এর আজকের দাম | বাজার দর`
      : "পাতা পাওয়া যায়নি | বাজার দর",
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const products = await getProducts(category.slug);

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-5xl">{category.icon}</p>
        <h1 className="mt-4 text-2xl font-bold">
          এই ক্যাটাগরিতে এখন কোনো পণ্য নেই
        </h1>
        <Link
          href="/"
          className="btn mt-6 border-0 bg-green-700 text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <SortableProducts
      products={products}
      header={
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-3xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      }
    />
  );
}