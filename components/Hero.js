import { banglaDate } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-8 rounded-3xl border border-gray-200 bg-white/70 px-6 py-10 md:grid-cols-2 md:px-8 md:py-14">
        <div>
         <p className="inline-block whitespace-nowrap rounded-full bg-green-100 px-4 pb-1.5 pt-2.5 text-sm font-medium leading-[1.8] text-green-800">
        {banglaDate()}
        </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-base text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-0 bg-green-700 text-white shadow hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bazar-hero.png"
          alt="তাজা বাজারের ঝুড়ি"
          className="mx-auto w-full max-w-xs md:max-w-sm md:justify-self-end"
        />
      </div>
    </section>
  );
}
