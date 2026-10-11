export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-amber-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            📈 আজকের বাজারদর
          </p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            নিত্যপ্রয়োজনীয় পণ্যের দাম, এক নজরে
          </h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম দেখুন, গতকালের
            সাথে তুলনা করুন এবং বাজারে যাওয়ার আগেই হিসাব করে নিন।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-success mt-6 text-white sm:btn-lg"
          >
            সব পণ্যের দাম দেখুন ↓
          </a>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bazar-hero.png"
          alt="তাজা বাজারের ঝুড়ি"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </section>
  );
}