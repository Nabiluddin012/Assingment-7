"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = form.get("email");
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  }

  const input =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium">
          নাম
          <input
            name="name"
            type="text"
            required
            placeholder="যেমন: নাবিল উদ্দিন"
            className={input}
            
          />
        </label>
        <label className="block text-sm font-medium">
          ইমেইল
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={input}
          />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={input}
          />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input
            name="confirm"
            type="password"
            required
            placeholder="আবার লিখুন"
            className={input}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        অথবা
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons callbackURL="/" />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-green-700 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}