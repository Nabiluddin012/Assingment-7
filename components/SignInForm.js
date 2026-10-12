"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ callbackURL }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackURL);
    router.refresh();
  }

  const input =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        অথবা
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons callbackURL={callbackURL} />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}