const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

async function request(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function toArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export async function getProducts(category) {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  return toArray(await request(path));
}

export async function getProductBySlug(slug) {
  const list = toArray(
    await request(`/products?slug=${encodeURIComponent(slug)}`)
  );
  return list[0] || null;
}

export async function getCategories() {
  return toArray(await request("/categories"));
}

export async function getCategoryBySlug(slug) {
  const list = toArray(
    await request(`/categories?slug=${encodeURIComponent(slug)}`)
  );
  return list[0] || null;
}