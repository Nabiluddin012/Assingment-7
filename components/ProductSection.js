import ProductCard from "./ProductCard";

export default function ProductSection({
  id,
  title,
  icon,
  iconClass = "",
  subtitle,
  products,
  action,
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 py-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {icon && <span className={`mr-2 text-lg ${iconClass}`}>{icon}</span>}
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}