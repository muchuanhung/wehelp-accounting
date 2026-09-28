import type { AccountRecord } from "@/types/record";
import { formatCurrency } from "@/utils/formatCurrency";

interface ListProps {
  records: AccountRecord[];
  total: number;
  onRemove: (id: string) => void;
}

export default function List({ records, total, onRemove }: ListProps) {
  return (
    <div>
      {records.length === 0 ? (
        <p className="py-6 text-center text-zinc-500">目前沒有紀錄，新增一筆開始記帳吧</p>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {records.map((record) => (
            <li key={record.id} className="flex items-center gap-4 py-3">
              <span
                className={`w-24 text-right font-medium ${
                  record.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {record.type === "income" ? "+" : "-"}
                {formatCurrency(record.amount)}
              </span>
              <span className="flex-1">{record.description}</span>
              <button
                type="button"
                onClick={() => onRemove(record.id)}
                className="rounded border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 border-t border-zinc-300 pt-4 text-right text-lg font-semibold">
        小計：{formatCurrency(total)}
      </p>
    </div>
  );
}
