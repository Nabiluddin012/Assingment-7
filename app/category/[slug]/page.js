import Link from "next/link";
import { notFound } from "next/navigation";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProducts } from "@/lib/api";

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
      title={`${category.icon} ${category.nameBn}`}
      products={products}
    />
  );
}
