"use client";

import Link from "next/link";
import Form from "@/components/accounting/Form";
import List from "@/components/accounting/List";
import { useRecords } from "@/hooks/useRecords";

export default function AccountingPage() {
  const { records, addRecord, removeRecord, total } = useRecords();

  return (
    <main className="w-full pb-10">
      <div className="border-b border-zinc-200 px-4 py-8 sm:py-12">
        <Form onAdd={addRecord} />
      </div>
      <div className="mx-auto max-w-2xl px-4 pt-4">
        <List records={records} total={total} onRemove={removeRecord} />
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
