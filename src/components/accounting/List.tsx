import { useState } from "react";
import type { AccountRecord } from "@/hooks/useRecords";

interface ListProps {
  records: AccountRecord[];
  total: number;
  onRemove: (id: string) => Promise<void>;
}

export default function List({ records, total, onRemove }: ListProps) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  return (
    <div>
      {records.length === 0 ? (
        <p className="py-6 text-center text-zinc-500">目前沒有紀錄，新增一筆開始記帳吧</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record.id} className="flex items-center gap-4 py-3 text-lg sm:gap-6">
              <span
                className={`min-w-16 shrink-0 ${
                  record.type === "income" ? "text-[#4a7c3a]" : "text-[#7b2d26]"
                }`}
              >
                {record.type === "expense" ? "-" : ""}
                {record.amount}
              </span>
              <span className="min-w-0 flex-1 break-words">{record.description}</span>
              <button
                type="button"
                disabled={pendingId === record.id}
                onClick={() => {
                  setPendingId(record.id);
                  void onRemove(record.id).finally(() => setPendingId(null));
                }}
                className="shrink-0 rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm hover:bg-zinc-200 disabled:opacity-60"
              >
                {pendingId === record.id ? "刪除中…" : "刪除"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10 text-center text-lg">
        <span className="font-semibold">小計：</span>
        {total}
      </p>
    </div>
  );
}
