"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "@/components/accounting/Form";
import List from "@/components/accounting/List";
import { useAuth } from "@/hooks/useAuth";
import { useRecords } from "@/hooks/useRecords";

export default function AccountingPage() {
  const router = useRouter();
  const { user, loading: authLoading, logOut } = useAuth();
  const { records, loading, error, addRecord, removeRecord, total } = useRecords(
    user?.uid ?? null,
  );

  useEffect(() => {
    if (!authLoading && !user) router.replace("/");
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return <p className="py-16 text-center text-zinc-500">載入中…</p>;
  }

  return (
    <main className="w-full pb-10">
      <div className="flex items-center justify-end gap-3 px-4 pt-4 text-sm">
        <span className="min-w-0 truncate text-zinc-600">{user.email}</span>
        <button
          type="button"
          onClick={() => {
            void logOut().then(() => router.push("/"));
          }}
          className="inline-block rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200"
        >
          登出
        </button>
      </div>
      <div className="border-b border-zinc-200 px-4 py-8 sm:py-12">
        <Form onAdd={addRecord} />
        {error ? <p className="mt-4 text-center text-sm text-[#7b2d26]">{error}</p> : null}
      </div>
      <div className="mx-auto max-w-2xl px-4 pt-4">
        {loading ? (
          <p className="py-6 text-center text-zinc-500">載入中…</p>
        ) : error && records.length === 0 ? null : (
          <List records={records} total={total} onRemove={removeRecord} />
        )}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-block rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200"
        >
          返回首頁
        </Link>
      </div>
    </main>
  );
}
