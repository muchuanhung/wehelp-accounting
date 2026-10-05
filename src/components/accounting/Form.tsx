import { useState } from "react";
import type { AccountRecord } from "@/hooks/useRecords";

export default function Form({
  onAdd,
}: {
  onAdd: (record: Omit<AccountRecord, "id">) => Promise<boolean>;
}) {
  const [type, setType] = useState<AccountRecord["type"]>("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = Number(amount);
        if (!value || value <= 0 || !description.trim() || submitting) return;

        setSubmitting(true);
        void onAdd({ type, amount: value, description: description.trim() }).then((ok) => {
          setSubmitting(false);
          if (!ok) return;
          setAmount("");
          setDescription("");
        });
      }}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <select
        value={type}
        onChange={(e) => setType(e.target.value as AccountRecord["type"])}
        className="w-28 rounded border border-zinc-400 px-3 py-2"
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
        className="w-36 rounded border border-zinc-400 px-3 py-2"
        aria-label="金額"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="說明"
        className="w-full rounded border border-zinc-400 px-3 py-2 sm:w-80"
        aria-label="說明"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200 disabled:opacity-60"
      >
        {submitting ? "新增中…" : "新增紀錄"}
      </button>
    </form>
  );
}
