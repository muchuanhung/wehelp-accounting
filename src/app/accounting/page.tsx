"use client";

import Link from "next/link";
import Form from "@/components/accounting/Form";
import List from "@/components/accounting/List";
import { useRecords } from "@/hooks/useRecords";

export default function AccountingPage() {
  const { records, addRecord, removeRecord, total } = useRecords();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">記帳</h1>
      <Form onAdd={addRecord} />
      <hr className="my-6 border-zinc-200" />
      <List records={records} total={total} onRemove={removeRecord} />
      <Link href="/" className="mt-8 inline-block text-zinc-600 underline">
        返回首頁
      </Link>
    </main>
  );
}
