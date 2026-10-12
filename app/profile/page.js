
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user) setName(user.name || "");
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) throw new Error(error.message);

      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "আপনি কি সত্যিই নিজের অ্যাকাউন্ট মুছে ফেলতে চান? এই কাজটি ফিরিয়ে নেওয়া যাবে না।"
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const { error } = await authClient.deleteUser();

      if (error) throw new Error(error.message);

      toast.success("অ্যাকাউন্ট মুছে ফেলা হয়েছে");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error.message || "অ্যাকাউন্ট মুছে ফেলা যায়নি"
      );
    } finally {
      setDeleting(false);
    }
  }

  if (isPending || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5ef]">
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 pb-16 pt-16">
      <div className="mx-auto w-full max-w-[394px]">
        <header className="mb-3">
          <h1 className="text-xl font-bold text-[#24352a]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            আপনার ব্যক্তিগত তথ্য আপডেট করুন
          </p>
        </header>

        {/* User information card */}
        <section className="mb-3 flex items-center gap-3 rounded-xl border border-[#e8eee7] bg-[#fbfdfb] p-3">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="h-11 w-11 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dce9df] text-lg font-bold text-[#087f43]">
              {(user.name || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-gray-800">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="shrink-0 rounded-md border border-[#dc8b8b] px-2.5 py-1.5 text-[11px] text-[#bd5353] transition hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "মুছছে..." : "অ্যাকাউন্ট মুছুন"}
          </button>
        </section>

        {/* Profile update card */}
        <section className="rounded-xl border border-[#e8eee7] bg-[#fbfdfb] p-5">
          <h2 className="mb-5 text-sm font-semibold text-[#354238]">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="profile-name"
              className="mb-1.5 block text-[11px] text-gray-600"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="mb-2 w-full rounded-md border border-[#e1e7e0] bg-transparent px-3 py-2 text-sm outline-none transition focus:border-[#078642] focus:ring-1 focus:ring-[#078642]"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-md bg-[#078642] py-2 text-xs font-medium text-white shadow-sm transition hover:bg-[#066f36] disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
