"use client";

import { useState, type FormEvent } from "react";
import type { AccountRecord, RecordType } from "@/types/record";

interface FormProps {
  onAdd: (record: Omit<AccountRecord, "id">) => void;
}

export default function Form({ onAdd }: FormProps) {
  const [type, setType] = useState<RecordType>("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0 || !description.trim()) return;

    onAdd({ type, amount: value, description: description.trim() });
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as RecordType)}
        className="rounded border border-zinc-300 px-3 py-2"
        aria-label="收支類型"
      >
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="金額"
        className="w-28 rounded border border-zinc-300 px-3 py-2"
        aria-label="金額"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="說明"
        className="flex-1 rounded border border-zinc-300 px-3 py-2"
        aria-label="說明"
        required
      />
      <button
        type="submit"
        className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
      >
        新增紀錄
      </button>
    </form>
  );
}
