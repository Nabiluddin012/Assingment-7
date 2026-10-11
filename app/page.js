import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import SortableProducts from "@/components/SortableProducts";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  // দাম বেড়েছে: সবচেয়ে বেশি % বাড়া ৬টি
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // দাম কমেছে: সবচেয়ে বেশি % কমা ৬টি
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <>
      <Hero />

      {products.length === 0 ? (
        <p className="mx-auto max-w-6xl px-4 py-16 text-center text-gray-500">
          এই মুহূর্তে দামের তথ্য আনা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>
      ) : (
        <>
          <ProductSection
            title="আজ দাম বেড়েছে"
            icon="▲"
            iconClass="text-red-600"
            products={risers}
          />
          <ProductSection
            title="আজ দাম কমেছে"
            icon="▼"
            iconClass="text-green-600"
            products={fallers}
          />
          <SortableProducts id="সব-পণ্য" products={products} />
        </>
      )}
    </>
  );
}